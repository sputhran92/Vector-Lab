import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Diagnostic API route for verifying SMTP setup
  app.get("/api/debug-smtp", async (req, res) => {
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const isSecure = smtpPort === 465;

    const diagnostics = {
      smtp_host: smtpHost,
      smtp_port: smtpPort,
      smtp_user_exists: !!process.env.SMTP_USER,
      smtp_user_length: process.env.SMTP_USER ? process.env.SMTP_USER.length : 0,
      smtp_pass_exists: !!process.env.SMTP_PASS,
      smtp_pass_length: process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0,
      smtp_from: process.env.SMTP_FROM || "(using user)",
      contact_receiver_email: process.env.CONTACT_RECEIVER_EMAIL || "(using default)",
      node_env: process.env.NODE_ENV || "unknown"
    };

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({
        status: "failed",
        message: "SMTP_USER or SMTP_PASS is missing in this container environment.",
        diagnostics
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: isSecure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      await transporter.verify();
      return res.json({
        status: "success",
        message: "SMTP connection verified successfully!",
        diagnostics
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "failed",
        error_message: error.message || "Unknown SMTP verify error",
        error_code: error.code || "unknown",
        diagnostics
      });
    }
  });

  // API routes
  app.post("/api/contact", upload.array("files"), async (req, res) => {
    const { name, email, message, projectType } = req.body;
    const files = req.files as Express.Multer.File[] || [];

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "info@vectortracelab.com";

    // Log the contact request details on the server so they are visible even if SMTP fails
    console.log("=== NEW CONTACT REQUEST ===");
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Project Type: ${projectType}`);
    console.log(`Message: ${message}`);
    console.log(`Attached Files: ${files.map(f => `${f.originalname} (${f.size} bytes)`).join(", ") || "None"}`);
    console.log("===========================");

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP configuration missing");
      return res.status(500).json({ error: "Email service not configured" });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT) || 587;
    const isSecure = smtpPort === 465;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: isSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false // bypass SSL verification issues common with custom SMTP servers
      }
    });

    const attachments = files.map(file => ({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype
    }));

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: receiverEmail,
        replyTo: email, // ensures clicking "Reply" in the client goes to the submitter
        subject: `[VTL Quote Request] ${projectType} - from ${name}`,
        text: `You have received a new vector trace quote request.\n\n` +
              `--- Contact Details ---\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Service Category: ${projectType}\n\n` +
              `--- Message/Instructions ---\n` +
              `${message || "No instructions provided."}\n\n` +
              `-----------------------\n` +
              `This email was generated from the Vector Trace Lab contact form.`,
        attachments
      });
      console.log(`Email successfully sent to ${receiverEmail}`);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error: any) {
      console.error("Error sending email via SMTP:", error);
      res.status(500).json({ error: `Failed to send email: ${error.message || "Unknown SMTP error"}` });
    }
  });

  // Vite middleware for development (fallback to serving dist if it exists)
  const distPath = path.join(process.cwd(), 'dist');
  const hasDist = fs.existsSync(distPath);
  const isProduction = process.env.NODE_ENV === "production" || hasDist;

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
