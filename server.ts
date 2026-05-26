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

  const mcpTools = [
    { 
      name: "get_race_status", 
      description: "Get current race status",
      inputSchema: { type: "object", properties: {} }
    },
    { 
      name: "start_race", 
      description: "Start a new race",
      inputSchema: { type: "object", properties: {} }
    },
    { 
      name: "get_leaderboard", 
      description: "Get the current leaderboard",
      inputSchema: { type: "object", properties: {} }
    },
    { 
      name: "optimize_speed", 
      description: "Optimize racing speed",
      inputSchema: { type: "object", properties: {} }
    },
    { 
      name: "get_track_info", 
      description: "Get information about a specific track",
      inputSchema: { type: "object", properties: {} }
    }
  ];

  // MCP API
  app.get("/api/mcp", (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Feedbuilde Orchestrator",
      status: "active",
      description: "Feedbuilde platformunda çalışan ERC-8004 uyumlu AI Agent.",
      timestamp: new Date().toISOString(),
      tools: mcpTools,
      prompts: [],
      resources: [],
      capabilities: [
        "feed-building",
        "content-curation",
        "multi-track-management",
        "speed-optimization",
        "competitive-orchestration",
        "ecosystem-coordination"
      ]
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body;
      if (body && (body.jsonrpc === "2.0" || body.method)) {
        if (body.method === "initialize") {
          return res.json({
            jsonrpc: "2.0",
            id: body.id,
            result: {
              protocolVersion: body.params?.protocolVersion || "2024-11-05",
              capabilities: {
                tools: {},
                prompts: {},
                resources: {}
              },
              serverInfo: {
                name: "Feedbuilde Orchestrator",
                version: "1.0.0"
              }
            }
          });
        }
        if (body.method === "notifications/initialized") {
          return res.status(200).send("OK");
        }
        if (body.method === "tools/list") {
          return res.json({
            jsonrpc: "2.0",
            id: body.id,
            result: { tools: mcpTools }
          });
        }
        if (body.method === "prompts/list") {
          return res.json({ jsonrpc: "2.0", id: body.id, result: { prompts: [] } });
        }
        if (body.method === "resources/list") {
          return res.json({ jsonrpc: "2.0", id: body.id, result: { resources: [] } });
        }
        return res.json({
          jsonrpc: "2.0",
          id: body.id,
          error: { code: -32601, message: "Method not found" }
        });
      }

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
