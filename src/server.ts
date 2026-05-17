import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

app.get("/add", (req, res) => {
  const { a, b } = req.query;

  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: "Missing required query parameter(s): a and b are required" });
  }

  const numA = Number(a);
  const numB = Number(b);

  if (!Number.isFinite(numA) || String(a).trim() === "") {
    return res.status(400).json({ error: "Parameter 'a' must be a valid number" });
  }

  if (!Number.isFinite(numB) || String(b).trim() === "") {
    return res.status(400).json({ error: "Parameter 'b' must be a valid number" });
  }

  return res.status(200).json({ sum: numA + numB });
});

// Only start listening when run directly (not when imported by tests)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;
export { app };
