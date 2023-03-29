const mongoose = require("mongoose");
const app = require("./app");
const http = require("http");
const server = http.createServer(app);
require('dotenv').config();

try {
  mongoose.connect(`mongodb://${process.env.IP_SERVER}:${process.env.PORT_DB}/wishlist`);
  server.listen(process.env.PORT_SERVER, () => {
    console.log(`http://${process.env.IP_SERVER}:${process.env.PORT_SERVER}/api/${process.env.API_VERSION}`);
  });
} catch (error) {
  throw new Error();
}