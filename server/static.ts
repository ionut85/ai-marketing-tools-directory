import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { injectPage, renderPage } from "./prerender";

export function getBaseUrl(req: express.Request): string {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  return `${protocol}://${host}`;
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // `index: false` so "/" goes through the renderer below instead of being
  // served as the bare index.html shell.
  app.use(express.static(distPath, { index: false }));

  const template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  // Every page gets its own server-rendered HTML; unknown paths get a 404.
  app.use("*", (req, res) => {
    const baseUrl = getBaseUrl(req);
    const page = renderPage(new URL(req.originalUrl, "http://localhost").pathname, baseUrl);
    res
      .status(page.status)
      .set({ "Content-Type": "text/html; charset=utf-8" })
      .send(injectPage(template, page, baseUrl));
  });
}
