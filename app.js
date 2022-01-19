const express = require("express");
const app = express();
const { auth, requiresAuth } = require("express-openid-connect");
require("dotenv").config();
require("dotenv").config({ path: __dirname + "./.env" });
// console.log(process.env.ISSUER_BASE);
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);
app.get("/", (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? "you are logged in via sso" : "logged out"
  );
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running up!");
});
