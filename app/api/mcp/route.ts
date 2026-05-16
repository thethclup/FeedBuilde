// @ts-nocheck
// app/api/mcp/route.ts
// Note: Next.js types are ignored here because this project primarily uses Vite + Express locally. 
// This file is strictly for your external Vercel Next.js deployment.

import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "success",
      message: "Command received",
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Invalid request" }, { status: 400 });
  }
}
