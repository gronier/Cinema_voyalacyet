express = require("express");
const routes = express.Router();


const db = require("../data/database");

module.exports = routes;

routes
    .get('/mes_reservation/:id' , (req , res) => {
            db.all(
                "select * from Reservation where id_user =?" , req.params.id,
                (err, rows) => {

                    res.json(rows)

                })
        }
    )

    .get('/reservation' , (req , res) => {
        db.get(
            "select * from Seance" ,
            (err, rows) => {
                res.json(rows)

            }
        )
    })
    .delete('/reservation/:id' , (req , res) => {
        db.get(
            "delete from Reservation where id_reservation =?", req.params.id ,
            (err, rows) => {

                res.json(rows)

            }
        )
    })
    .post("/reservation",(req , res) => {
        console.log(req.body);
        db.run("insert into Reservation (id_user , nb_place , id_seance) values (?,?,?)",
            req.body.id_user, req.body.nb_place, req.body.id_seance,
            (err) => {
                if (err) {
                    console.error(" Database error ", err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            }
        )
    })











