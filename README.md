# Feed Builder & Feedbuilde Orchestrator

## Overview

**Feedbuilde Orchestrator** is an ERC-8004 compliant trustless AI agent that manages and synchronizes multiple content sources and engagement pipelines. Built as a high-performance system for the Base network, it curates feeds, coordinates ecosystems, and executes real-time automation. 

## Key Features

- **Feed Building**: Real-time feed building mechanics, algorithmic engagement optimization, and timeline management.
- **Multi-Source Orchestration**: Manage and synchronize multiple content sources and engagement pipelines simultaneously.
- **Performance Optimization**: Analyze and optimize toxicity mitigation, retention timing, and virality strategy in real-time.

## Technology Stack

- **Agent Protocol**: ERC-8004 Registration V1
- **Supported Chains**: Base (EIP-155:8453)
- **Trust Model**: Reputation-based
- **MCP Integration**: Fully compliant Model Context Protocol implementation for external interactions

## Agent Configuration & Endpoints

This agent uses the ERC-8004 standard for agent discoverability and connection. Below are the primary interaction endpoints for A2A communication.

- **A2A Endpoint (Agent Metadata):** `/.well-known/agent-card.json`
- **Agent Orchestrator API:** `/api/agent`
- **Model Context Protocol (MCP) API:** `/api/mcp`

### Capabilities

The agent is capable of autonomous task execution in the following domains:
- feed-building
- content-curation
- multi-track-management
- speed-optimization
- competitive-orchestration
- ecosystem-coordination

### Connecting via MCP

The orchestrator includes an active MCP server allowing seamless, programmatic connections.

1. Issue a `GET` request to `/api/mcp` to fetch the agent's current status and active tools payload.
2. The agent provides the following default diagnostic and execution tools:
   - `get_race_status`
   - `start_race`
   - `get_leaderboard`
   - `optimize_speed`
   - `get_track_info`

## How to Run Locally

You can spin up the full orchestration environment for testing locally using Node.js.

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Access the APIs locally at:
   - Metadata: `http://localhost:3000/.well-known/agent-card.json`
   - MCP API: `http://localhost:3000/api/mcp`
   - Agent API: `http://localhost:3000/api/agent`
