const express = require("express");
const routes_login = express.Router();
const auth = require("../auth/auth")();
const db = require("../data/database");
const login = require('../services/Login_Register')
module.exports = routes_login;

routes_login
    .use(auth.initialize())
    .post("/signup", (req, res) => {
                login.register(req,res)
        }
    )
    .post("/signin", (req, res) => {
        login.login(req,res)
    })

