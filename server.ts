import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // SIWE Verification mock endpoint
  app.post("/api/siwe/verify", async (req, res) => {
    try {
      const { message, signature } = req.body;
      // In a real app we would use siwe.SiweMessage to verify here
      res.json({ success: true, message: "SIWE Signature verified" });
    } catch (e) {
      res.status(400).json({ success: false, error: "Verification failed" });
    }
  });

  // Agent API
  app.get("/api/agent", (req, res) => {
    res.json({
      name: "Feedbuilde Orchestrator",
      status: "active",
      wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      platform: "Feedbuilde",
      version: "1.0.0"
    });
  });

  // MCP API
  app.get("/api/mcp", (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Feedbuilde MCP Server",
      status: "active",
      description: "Active MCP Endpoint for Feedbuilde Orchestrator",
      timestamp: new Date().toISOString(),
      tools: [
        { "name": "get_status", "description": "Get current agent status" },
        { "name": "fetch_feed", "description": "Fetch and process feeds" },
        { "name": "analyze_content", "description": "Analyze feed content" }
      ],
      capabilities: [
        "feed-management",
        "content-curation",
        "real-time-aggregation"
      ]
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      res.json({
        status: "success",
        message: "Command received",
        receivedAt: new Date().toISOString()
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Invalid request"
      });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
