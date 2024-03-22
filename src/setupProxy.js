const { createProxyMiddleware } = require("http-proxy-middleware");

let targetUrl = process.env.REACT_APP_API_URL ?? "http://localhost:8080";

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/api/v1", "/resources"], {
      target: targetUrl,
      changeOrigin: true,
    })
  );
};
