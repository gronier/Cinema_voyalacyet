const express = require("express");
const routes = express.Router();


const db = require("../data/database");

module.exports = routes;

routes
    .get('/Salle' , (req , res) => {
        db.all(
            "select * from Salle",
            (err, rows) => {

                res.json(rows)

            })
        }
    )
    .get('/Salle/:id' , (req , res) => {
        db.get(
            "select * from Salle where id_salle =?" , req.params.id ,
            (err, rows) => {
                res.json(rows)

            }
        )
    })
    .delete('/Salle/:id' , (req , res) => {
        db.get(
            "delete from Salle where id_salle =?" , req.params.id ,
            (err, rows) => {

                res.json(rows)

            }
        )
    })
    .post("/Salle",(req , res) =>{
        db.run("insert into Salle (nom_salle , nbPlace_salle) values (?,?)" ,
            req.body.nom_salle , req.body.nbPlace_salle,
            (err) => {
                if ( err ) {
                    console . error (" Database error ", err ) ;
                    res . sendStatus (500) ;
                } else {
                    res . sendStatus (201) ;
                }
            }
        )
    })
    .patch("/Salle/:id" , (req , res) => {
        db.run("update Salle set nom_salle =$nom_salle , nbPlace_salle =$nb where id_salle=$id_salle",
            {
                $nom_salle : req.body.nom_salle,
                $nb : req.body.nbPlace_salle,
                $id_salle : req.params.id
            },

            (err) => {
                if ( err ) {
                    console . error (" Database error ", err ) ;
                    res . sendStatus (500) ;
                } else {
                    res . sendStatus (201) ;
                }
            }
        )
    })
    









