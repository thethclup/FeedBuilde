export default function handler(req, res) {
  return res.status(200).json({
    name: "Feedbuilde Orchestrator",
    status: "active",
    wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
    platform: "Feedbuilde",
    version: "1.0.0"
  });
}
