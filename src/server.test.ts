import { describe, it, expect } from "vitest";
import app from "./server";

describe("server", () => {
  it("exports an Express app", () => {
    expect(app).toBeDefined();
  });

  it("has a GET / route", () => {
    expect(app).toHaveProperty("get");
  });
});
