const express = require('express');
const app = express();
const routes = express.Router();

const db = require("../data/database")
const e = require("express");



routes
    .post('/film', (req, res) => {
        db.get("insert into Film(nom_film, affiche, duree_film, description_film) values ($nom_film,$affiche,$duree_film,$desc)",
            {
                $nom_film: req.body.nom_film,
                $affiche: req.body.affiche,
                $duree_film: req.body.duree_film,
                $desc: req.body.desc
            },
            (err,row) => {
                if(err){
                    return res.json(err).status(401);
                }
                res.status(201).json();
                }
            );
    })
    .get('/film',(req,res) => {
        db.all("select * from Film",
            (err,rows) => {
            if(err){
                return res.json(err).status(401);
            }
            res.status(201).json(rows);
            })
    })
    .delete('/film/:id',(req,res) => {
        console.log(req.params.id)
        db.get("delete from Salle ", [req.params.id],
            (err,rows) => {
                if(err){
                    return res.json(err).status(401);
                }
                res.status(201).json(rows);
            })
    })


module.exports = routes;
