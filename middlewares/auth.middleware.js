const { auth0 } = require('../config/config')
const { auth } = require('express-oauth2-jwt-bearer');

// exports.checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `${auth0.issuer}.well-known/jwks.json`
//   }),

//   audience: auth0.audience,
//   issuer: auth0.issuer,
//   algorithms: ['RS256']
// })

exports.checkJwt = auth({
  audience: auth0.audience,
  issuerBaseURL: auth0.issuer,
  algorithms: 'RS256'
});