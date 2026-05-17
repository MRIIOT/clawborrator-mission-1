import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "./server";

describe("server", () => {
  it("exports an Express app", () => {
    expect(app).toBeDefined();
  });

  it("has a GET / route", () => {
    expect(app).toHaveProperty("get");
  });
});

describe("GET /health", () => {
  it("responds with status 200", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
  });

  it("responds with ok === true", async () => {
    const res = await request(app).get("/health");
    expect(res.body.ok).toBe(true);
  });

  it("responds with a string ts field", async () => {
    const res = await request(app).get("/health");
    expect(typeof res.body.ts).toBe("string");
  });

  it("ts parses as a valid ISO-8601 date", async () => {
    const res = await request(app).get("/health");
    expect(!Number.isNaN(Date.parse(res.body.ts))).toBe(true);
  });

  it("Content-Type includes application/json", async () => {
    const res = await request(app).get("/health");
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});
