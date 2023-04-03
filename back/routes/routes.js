const express = require("express");
const routes = express.Router();
const auth = require("../auth/auth")();
const db = require("../data/database");
module.exports = routes;

routes
    .get("/", (req, res) => {
        res.json({message:"Hello!!"});
    })
    .use(auth.initialize())
    .get("/home", (req, res) => {
        res.json({message:"Hello!!"});
    })
    .get("/items", auth.authenticate(),(req, res) => {
            db.all(
                "select item_id as id,item_name as name from item",
                (err, rows) => {
                    if (err) {
                        res.sendStatus(200);
                    } else {
                        res.json(rows)
                    }
                })
        }
    )
