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

describe("GET /add", () => {
  it("happy path: returns 200 with correct sum", async () => {
    const res = await request(app).get("/add?a=2&b=3");
    expect(res.status).toBe(200);
    expect(res.body.sum).toBe(5);
  });

  it("missing b param: returns 400 with error", async () => {
    const res = await request(app).get("/add?a=2");
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe("string");
    expect(res.body.error.length).toBeGreaterThan(0);
  });

  it("missing a param: returns 400 with error", async () => {
    const res = await request(app).get("/add?b=3");
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe("string");
    expect(res.body.error.length).toBeGreaterThan(0);
  });

  it("non-numeric a param: returns 400 with error", async () => {
    const res = await request(app).get("/add?a=foo&b=3");
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe("string");
    expect(res.body.error.length).toBeGreaterThan(0);
  });

  it("non-numeric b param (e.g. 5x): returns 400 with error", async () => {
    const res = await request(app).get("/add?a=2&b=5x");
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe("string");
    expect(res.body.error.length).toBeGreaterThan(0);
  });

  it("large integers: a=2147483647&b=2147483647 -> sum=4294967294", async () => {
    const res = await request(app).get("/add?a=2147483647&b=2147483647");
    expect(res.status).toBe(200);
    expect(res.body.sum).toBe(4294967294);
  });

  it("negative numbers: a=-5&b=10 -> sum=5", async () => {
    const res = await request(app).get("/add?a=-5&b=10");
    expect(res.status).toBe(200);
    expect(res.body.sum).toBe(5);
  });

  it("zero values: a=0&b=0 -> sum=0", async () => {
    const res = await request(app).get("/add?a=0&b=0");
    expect(res.status).toBe(200);
    expect(res.body.sum).toBe(0);
  });
});

describe("GET /multiply", () => {
  it("happy path: a=6&b=7 -> 200 with product=42", async () => {
    const res = await request(app).get("/multiply?a=6&b=7");
    expect(res.status).toBe(200);
    expect(res.body.product).toBe(42);
  });

  it("decimals: a=2.5&b=4 -> 200 with product=10", async () => {
    const res = await request(app).get("/multiply?a=2.5&b=4");
    expect(res.status).toBe(200);
    expect(res.body.product).toBe(10);
  });

  it("negative numbers: a=-3&b=4 -> 200 with product=-12", async () => {
    const res = await request(app).get("/multiply?a=-3&b=4");
    expect(res.status).toBe(200);
    expect(res.body.product).toBe(-12);
  });

  it("zero: a=0&b=99 -> 200 with product=0", async () => {
    const res = await request(app).get("/multiply?a=0&b=99");
    expect(res.status).toBe(200);
    expect(res.body.product).toBe(0);
  });

  it("missing b param: returns 400 with error", async () => {
    const res = await request(app).get("/multiply?a=3");
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe("string");
    expect(res.body.error.length).toBeGreaterThan(0);
  });

  it("missing a param: returns 400 with error", async () => {
    const res = await request(app).get("/multiply?b=3");
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe("string");
    expect(res.body.error.length).toBeGreaterThan(0);
  });

  it("non-numeric a param (foo): returns 400 with error", async () => {
    const res = await request(app).get("/multiply?a=foo&b=3");
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe("string");
    expect(res.body.error.length).toBeGreaterThan(0);
  });

  it("non-numeric b param (5x): returns 400 with error", async () => {
    const res = await request(app).get("/multiply?a=2&b=5x");
    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe("string");
    expect(res.body.error.length).toBeGreaterThan(0);
  });
});
