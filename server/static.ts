import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { renderPage } from "./prerender";
import { getBaseUrl } from "./routes";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  const template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  // fall through to index.html if the file doesn't exist, with tool / category
  // pages server-rendered for crawlers (see prerender.ts)
  app.use("*", (req, res) => {
    const { status, html } = renderPage(req.originalUrl, template, getBaseUrl(req));
    res.status(status).set({ "Content-Type": "text/html" }).end(html);
  });
}
