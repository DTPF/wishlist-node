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

const corsOptions = {
  origin: ['dalist.dtpf.es', 'http://localhost:3000']
};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "https://dev-qgjlr8hrde6g23pf.us.auth0.com", "https://lh3.googleusercontent.com"],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https: 'unsafe-inline'"],
      connectSrc: ["'self'", "https://dev-qgjlr8hrde6g23pf.us.auth0.com/oauth/token"],
      "img-src": ["'self'", "https: data:"],
      upgradeInsecureRequests: [],
    },
  },
}))
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "cross-origin")
  next()
})
app.use(`/api/${config.app.API_VERSION}`, userRoutes)
app.use(`/api/${config.app.API_VERSION}`, wishlistRoutes)
app.use(errorMiddleware)

module.exports = app;