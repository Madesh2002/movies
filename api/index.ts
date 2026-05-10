import express from "express";

const app = express();

// Verify URL availability
app.get("/api/verify-url", async (req, res) => {
  const videoUrl = req.query.url as string;
  if (!videoUrl) return res.status(400).json({ ok: false, error: "URL required" });

  try {
    const response = await fetch(videoUrl, { method: "HEAD" });
    
    if (response.ok) {
      return res.json({ ok: true });
    }

    const getResponse = await fetch(videoUrl, { method: "GET" });
    return res.json({ ok: getResponse.ok });
  } catch (error) {
    return res.json({ ok: false, error: "Network error" });
  }
});

// Download Proxy to bypass CORS
app.get("/api/proxy-download", async (req, res) => {
  const videoUrl = req.query.url as string;
  const fileName = req.query.filename as string || "video.mp4";

  if (!videoUrl) {
    return res.status(400).send("URL is required");
  }

  try {
    const response = await fetch(videoUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }

    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", response.headers.get("Content-Type") || "video/mp4");
    
    const contentLength = response.headers.get("Content-Length");
    if (contentLength) {
      res.setHeader("Content-Length", contentLength);
    }

    if (response.body) {
      const reader = response.body.getReader();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        // value is a Uint8Array
        res.write(Buffer.from(value));
      }
      res.end();
    } else {
      res.status(500).send("No response body");
    }
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).send("Error proxying download");
  }
});

export default app;
