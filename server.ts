import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import { blogs as initialBlogs } from "./src/data/blogsData";

dotenv.config();

interface StoreData {
  adminPassword: string;
  blogs: any[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");
const DEFAULT_PASSWORD = "vectorlab2026";

// Ensure data directory and store file exist
function initStore(): StoreData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORE_PATH)) {
    const initialData: StoreData = {
      adminPassword: DEFAULT_PASSWORD,
      blogs: initialBlogs,
    };
    fs.writeFileSync(STORE_PATH, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (!parsed.adminPassword) parsed.adminPassword = DEFAULT_PASSWORD;
    if (!Array.isArray(parsed.blogs)) parsed.blogs = initialBlogs;
    return parsed;
  } catch (err) {
    console.error("Error reading store.json, re-initializing with defaults", err);
    const initialData: StoreData = {
      adminPassword: DEFAULT_PASSWORD,
      blogs: initialBlogs,
    };
    fs.writeFileSync(STORE_PATH, JSON.stringify(initialData, null, 2), "utf-8");
    return initialData;
  }
}

function saveStore(data: StoreData) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  // ==========================================
  // AUTH & BLOG API ROUTES (GLOBAL SYNC)
  // ==========================================

  // Admin Auth: Login
  app.post("/api/auth/login", (req, res) => {
    const { password } = req.body;
    const store = initStore();

    if (!password) {
      return res.status(400).json({ success: false, error: "Password is required" });
    }

    if (password === store.adminPassword) {
      const sessionToken = Buffer.from(`admin_${Date.now()}_${store.adminPassword}`).toString("base64");
      return res.json({
        success: true,
        token: sessionToken,
        user: { name: "Vector Lab Administrator", role: "admin" }
      });
    }

    return res.status(401).json({ success: false, error: "Invalid admin passcode." });
  });

  // Admin Auth: Change Master Passcode
  app.post("/api/auth/change-password", (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const store = initStore();

    if (oldPassword !== store.adminPassword) {
      return res.status(400).json({ success: false, error: "Current passcode is incorrect." });
    }

    if (!newPassword || newPassword.trim().length < 6) {
      return res.status(400).json({ success: false, error: "New passcode must be at least 6 characters." });
    }

    store.adminPassword = newPassword.trim();
    saveStore(store);

    const newSessionToken = Buffer.from(`admin_${Date.now()}_${store.adminPassword}`).toString("base64");

    return res.json({
      success: true,
      message: "Passcode updated successfully across all browsers and devices!",
      token: newSessionToken
    });
  });

  // Blog Posts: Get All
  app.get("/api/blogs", (req, res) => {
    const includeDrafts = req.query.all === "true";
    const store = initStore();
    const result = includeDrafts
      ? store.blogs
      : store.blogs.filter((b: any) => b.status !== "draft");
    res.json(result);
  });

  // Blog Posts: Get Single
  app.get("/api/blogs/:id", (req, res) => {
    const { id } = req.params;
    const store = initStore();
    const blog = store.blogs.find((b: any) => b.id.toLowerCase() === id.toLowerCase());
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blog);
  });

  // Blog Posts: Create / Save / Update
  app.post("/api/blogs", (req, res) => {
    const blog = req.body;
    if (!blog || !blog.id || !blog.title) {
      return res.status(400).json({ success: false, error: "Blog ID and Title are required" });
    }

    const store = initStore();
    const existingIndex = store.blogs.findIndex(
      (b: any) => b.id.toLowerCase() === blog.id.toLowerCase()
    );

    const enrichedBlog = {
      ...blog,
      updatedAt: new Date().toISOString(),
      createdAt: blog.createdAt || new Date().toISOString(),
      status: blog.status || "published",
    };

    if (existingIndex >= 0) {
      store.blogs[existingIndex] = enrichedBlog;
    } else {
      store.blogs.unshift(enrichedBlog);
    }

    saveStore(store);
    res.json({ success: true, blog: enrichedBlog });
  });

  // Blog Posts: Delete
  app.delete("/api/blogs/:id", (req, res) => {
    const { id } = req.params;
    const store = initStore();
    store.blogs = store.blogs.filter((b: any) => b.id.toLowerCase() !== id.toLowerCase());
    saveStore(store);
    res.json({ success: true });
  });

  // Blog Posts: Reset to seed defaults
  app.post("/api/blogs/reset", (req, res) => {
    const store = initStore();
    store.blogs = initialBlogs;
    saveStore(store);
    res.json({ success: true, count: initialBlogs.length });
  });

  // Blog Posts: Bulk Import
  app.post("/api/blogs/import", (req, res) => {
    const { blogs: importedBlogs } = req.body;
    if (!Array.isArray(importedBlogs)) {
      return res.status(400).json({ success: false, error: "Import data must be an array of blogs" });
    }
    const store = initStore();
    store.blogs = importedBlogs;
    saveStore(store);
    res.json({ success: true, count: importedBlogs.length });
  });

  // ==========================================
  // CONTACT & DIAGNOSTICS ROUTES
  // ==========================================

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

  // Contact quote API
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
        rejectUnauthorized: false
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
        replyTo: email,
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

  // Enable CORS & preflight
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Vite middleware for development vs static build for production
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
