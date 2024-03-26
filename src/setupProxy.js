const { createProxyMiddleware } = require("http-proxy-middleware");

let targetUrl = process.env.REACT_APP_API_URL ?? "http://127.0.0.1:5000";
module.exports = function (app) {
  // app.use(
  //   createProxyMiddleware(["/api/v1", "/resources"], {
  //     target: targetUrl,
  //     changeOrigin: true,
  //   })
  // );
  app.use(
    "/api",
    createProxyMiddleware({
      target: targetUrl,
      changeOrigin: true,
    })
  );
};
