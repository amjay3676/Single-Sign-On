const express = require("express");
const app = express();
const { auth, requiresAuth } = require("express-openid-connect");
require("dotenv").config();
// require("dotenv").config({ path: __dirname + "./.env" });
// console.log(process.env.ISSUER_BASE);
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: "https://dev-amjay3606.us.auth0.com",
    baseURL: "http://localhost:3000",
    clientID: "to2SzRN97wKxaGEgLSmhKwrF8lNGV4H0",
    secret: "SRjqCNPh6Le9i2xqNELZilfmCla32bP8ZzNXjso0cnNogTq0-JqFs2_HpYgjRFvZ",
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
