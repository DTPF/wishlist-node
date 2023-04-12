const express = require("express")
const config = require('./config/config')
const helmet = require('helmet')
const bodyParser = require("body-parser")
const app = express()
const cors = require('cors')
// Routes
const userRoutes = require("./routers/user.router")
const wishlistRoutes = require("./routers/wishlist.router")
const errorMiddleware = require('./middlewares/error.middleware')

let corsOptions = {
  origin: ['wishlist.dtpf.es', 'http://localhost:3000']
};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(helmet({ contentSecurityPolicy: false }))
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "cross-origin")
  next()
})
app.use(`/api/${config.app.API_VERSION}`, userRoutes)
app.use(`/api/${config.app.API_VERSION}`, wishlistRoutes)
app.use(errorMiddleware)

module.exports = app;