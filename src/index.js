const mongoose = require("mongoose");
const app = require("./app");
const config = require('./config/config');
const http = require("http");
const server = http.createServer(app);

try {
  mongoose.connect(config.db.MONGO_URL);
  server.listen(config.app.PORT, () => {
    console.log(`Running on ${config.db.URL}...`);
  });
} catch (error) {
  throw new Error();
}