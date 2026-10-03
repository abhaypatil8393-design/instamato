const app = require("../back/src/app.js");
const connectDB = require("../back/src/config/db.js");

module.exports = async function handler(req, res) {
  try {
    await connectDB();

    const requestUrl = new URL(req.url, "http://localhost");
    requestUrl.pathname = requestUrl.pathname.replace(/^\/api(?=\/|$)/, "") || "/";
    req.url = `${requestUrl.pathname}${requestUrl.search}`;

    return app(req, res);
  } catch (error) {
    console.error("API request failed:", error);
    return res.status(503).json({ message: "Service temporarily unavailable" });
  }
};
