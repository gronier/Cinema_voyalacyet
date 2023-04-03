const express = require("express");
const routes = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = require("./auth/auth")();
const db = require("./data/items");
const cfg = require("./auth/config");

const saltRounds = 10;

module.exports = routes;

routes
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
    .post("/signup", (req, res) => {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                db.get("insert into person(per_name,per_password) values ($name,$password) returning per_id",
                    {
                        $name: req.body.name,
                        $password: hash
                    },
                    (err, row) => {
                        if (err) {
                            return res.json(err).status(401);
                        }
                        return res.json({id: row.per_id}).status(201);
                    });
            })
        }
    )
    .post("/signin", (req, res) => {
        db.get('SELECT * FROM person WHERE per_name = $name',
            {$name: req.body.name},
            async (err, row) => {
                if (err) {
                    return res.json(err);
                }
                if (!row) {
                    return res.json("bad user");
                }
                const match = await bcrypt.compare(req.body.password, row.per_password);
                if (match) {
                    const token = jwt.sign({id: row.per_id}, cfg.jwtSecret, {expiresIn: "1h"});
                    return res.json({token: token});
                }
                res.json("bad password").status(401);
            })
    })

