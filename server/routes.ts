import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import path from "path";
import fs from "fs";
import { sendContactNotification } from "./email";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      // Store the contact message
      const contact = await storage.createContact(validatedData);
      
      // Send email notification
      const emailSent = await sendContactNotification(validatedData);
      
      console.log("New contact submission:", contact);
      console.log("Email notification sent:", emailSent);
      
      res.json({ 
        success: true, 
        message: emailSent ? "Message sent successfully! I'll get back to you soon." : "Message saved successfully!" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message" 
        });
      }
    }
  });

  // Resume download endpoint
  app.get("/api/download-resume", (req, res) => {
    // Use process.cwd() as the base since that's where the server is running from
    const resumePath = path.join(process.cwd(), "dist", "public", "Nithin_resume2_1754226416623.pdf");
    
    if (fs.existsSync(resumePath)) {
      res.download(resumePath, "Nithin_Resume.pdf", (err) => {
        if (err) {
          console.error("Resume download error:", err);
          res.status(500).json({ error: "Failed to download resume" });
        }
      });
    } else {
      console.error("Resume not found at:", resumePath);
      res.status(404).json({ error: "Resume not found" });
    }
  });

  // Get contact messages (optional admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
