import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.json({ status: "ok" });
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
