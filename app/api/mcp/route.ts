// @ts-nocheck
import { NextResponse } from 'next/server';

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

export async function GET() {
  return NextResponse.json({
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
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    let body;
    try {
      body = JSON.parse(bodyText);
    } catch {
      body = {};
    }

    if (body && (body.jsonrpc === "2.0" || body.method)) {
      if (body.method === "initialize") {
        return NextResponse.json({
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
        }, { headers: getCorsHeaders() });
      }

      if (body.method === "notifications/initialized") {
        return new NextResponse(null, { status: 200, headers: getCorsHeaders() });
      }

      if (body.method === "tools/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: body.id,
          result: { tools: mcpTools }
        }, { headers: getCorsHeaders() });
      }

      if (body.method === "prompts/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: body.id,
          result: { prompts: [] }
        }, { headers: getCorsHeaders() });
      }

      if (body.method === "resources/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: body.id,
          result: { resources: [] }
        }, { headers: getCorsHeaders() });
      }

      return NextResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        error: { code: -32601, message: "Method not found" }
      }, { headers: getCorsHeaders() });
    }

    return NextResponse.json({
      status: "success",
      message: "Command received",
      receivedAt: new Date().toISOString()
    }, { headers: getCorsHeaders() });

  } catch (error) {
    return NextResponse.json({ status: "error", message: "Invalid request" }, { status: 400, headers: getCorsHeaders() });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders()
  });
}

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}
