import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock database for SSE events
  const events: any[] = [];
  const clients: any[] = [];

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "operational",
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      queues: {
        active: Math.floor(Math.random() * 10),
        waiting: Math.floor(Math.random() * 50),
        failed: 0
      }
    });
  });

  // SSE Endpoint
  app.get("/api/events/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const clientId = Date.now();
    const newClient = { id: clientId, res };
    clients.push(newClient);

    req.on("close", () => {
      const index = clients.findIndex(c => c.id === clientId);
      if (index !== -1) clients.splice(index, 1);
    });

    // Send initial connection message
    res.write(`data: ${JSON.stringify({ type: "connected", message: "SSE Stream Established" })}\n\n`);
  });

  // Helper to broadcast events
  const broadcast = (event: any) => {
    clients.forEach(client => {
      client.res.write(`data: ${JSON.stringify(event)}\n\n`);
    });
  };

  // Simulate bot events
  setInterval(() => {
    const eventTypes = ["MESSAGE_CREATE", "MEMBER_JOIN", "COMMAND_EXECUTE", "ECONOMY_UPDATE"];
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const event = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      timestamp: new Date().toISOString(),
      data: {
        user: "Comrade_" + Math.floor(Math.random() * 1000),
        content: type === "COMMAND_EXECUTE" ? "/rank" : "Glory to the bot!",
      }
    };
    broadcast(event);
  }, 5000);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[KRASNAYA_CONTROL] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
