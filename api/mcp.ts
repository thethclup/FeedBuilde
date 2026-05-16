export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
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
  }

  if (req.method === 'POST') {
    return res.status(200).json({
      status: "success",
      message: "Command received",
      receivedAt: new Date().toISOString()
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
