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
        db.run("delete from Role", [req.params.id],
            (err,rows) => {
                if(err){
                    return res.json(err).status(401);
                }
                res.status(201).json(rows);
            })
    })
    .delete('/Salle/:id' , (req , res) => {
        db.run(
            "delete from Film where id_film =? returning *" , req.params.id ,
            (err, rows) => {
                if(err){
                    return res.json(err).status(401);
                }
                res.json(rows)
            }
        )
    })
    .put('/film/:id',(req,res) => {
        db.get(
            "UPDATE Film Set nom_film = 'theo test nom film' where id_film=3",
            (err, rows) => {
                if (err) {
                    return res.json(err).status(401);
                }
                res.status(201).json(rows);
            })
    })


module.exports = routes;