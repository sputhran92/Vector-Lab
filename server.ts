import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", upload.array("files"), async (req, res) => {
    const { name, email, message, projectType } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP configuration missing");
      return res.status(500).json({ error: "Email service not configured" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const attachments = files.map(file => ({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype
    }));

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: "info@vectortracelab.com",
        subject: `New Contact Request from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nMessage: ${message}`,
        attachments
      });
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
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
