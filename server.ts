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
      name: "Feedbuilde MCP Endpoint",
      status: "active",
      description: "Active MCP server for Feedbuilde Orchestrator Agent",
      capabilities: ["feed-building", "content-curation", "intelligent-aggregation"],
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const { action, command, params } = req.body;

      let result: any = {};

      switch (action || command) {
        case "status":
        case "ping":
          result = { 
            status: "online", 
            agent: "Feedbuilde Orchestrator",
            message: "Ready to build feeds" 
          };
          break;

        case "execute":
          result = {
            success: true,
            action: command || params,
            executedAt: new Date().toISOString(),
            message: "Feed command executed successfully"
          };
          break;

        case "get_info":
          result = {
            name: "Feedbuilde Orchestrator",
            wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
            platform: "Base",
            version: "1.0.0"
          };
          break;

        default:
          result = {
            success: true,
            message: "Command received",
            data: req.body
          };
      }

      res.json({
        status: "success",
        agent: "Feedbuilde Orchestrator",
        response: result,
        receivedAt: new Date().toISOString()
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Failed to process MCP command"
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
