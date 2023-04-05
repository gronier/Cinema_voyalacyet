const express = require('express');
const app = express();
const routes = express.Router();

const db = require("../data/database")
const e = require("express");



routes
    .post('/seance', (req, res) => {

        db.run("insert into Seance(language_seance, version_seance, date_debut_seance, date_fin_seance, prix_seance, id_film) values ($language_seance,$version_seance,$date_debut_seance, $date_fin_seance,$prix_seance, $film)",
            {
                $language_seance: req.body.language_seance,
                $version_seance: req.body.version_seance,
                $date_debut_seance: req.body.date_debut_seance,
                $date_fin_seance: req.body.date_fin_seance,
                $prix_seance: req.body.prix_seance,
                $film: req.body.id_film
            },
            (err) => {

                if(err){
                    return res.json(err).status(401);
                }
                res.status(201).json();
            }
        );
    })

    .get('/seance',(req,res) => {
        db.all("select * from Seance",
            (err,rows) => {
                if(err){
                    return res.json(err).status(401);
                }
                res.status(201).json(rows);
            })
    })
    .get('/seance/:id' , (req , res) => {
        db.get(
            "select * from Seance where id_seance =?" , req.params.id ,
            (err, rows) => {
                res.json(rows)

            }
        )
    })
    .delete('/seance/:id',(req,res) => {
        console.log(req.params.id)

        db.run("delete from Seance where id_seance=?", [req.params.id],

            (err,rows) => {
                if(err){
                    return res.json(err).status(401);
                }
                res.status(201).json(rows);
            })
    })



module.exports = routes;

