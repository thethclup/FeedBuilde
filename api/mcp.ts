export default function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Feedbuilde Orchestrator",
      status: "active",
      description: "Feedbuilde platformunda çalışan ERC-8004 uyumlu AI Agent.",
      timestamp: new Date().toISOString(),
      tools: [
        { name: "get_race_status", description: "Get current race status" },
        { name: "start_race", description: "Start a new race" },
        { name: "get_leaderboard", description: "Get the current leaderboard" },
        { name: "optimize_speed", description: "Optimize racing speed" },
        { name: "get_track_info", description: "Get information about a specific track" }
      ],
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
  }

  if (req.method === 'POST') {
    try {
      return res.status(200).json({
        status: "success",
        message: "Command received",
        receivedAt: new Date().toISOString()
      });
    } catch (error) {
      return res.status(400).json({ status: "error", message: "Invalid request" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
