const express = require("express");
const cors = require("cors");
const morgan = require("morgan");



const film = require("./routes/route_film")
const salle = require("./routes/route_salle");
const routes = require("./routes/routes");
const seance = require("./routes/route_seance")
const route_login = require("./routes/route_login");
const route_reservation = require("./routes/route_reservation");
const route_seance = require("./routes/route_seance");
const route_film = require("./routes/route_film");




const app = express();
const port = process.env.PORT || 8000;

app
    .use(morgan("combined"))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use("/img", express.static("img")) // la route "img" rend des fichiers stockés dans "back/img"
    .use(routes)
    .use(seance)
    .use(film)
    .use(salle)
    .use(route_login)
    .use(route_reservation)
    .use(route_seance)
    .use(route_film)
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        })
    })
    .listen(port, () => console.log("listening on port " + port));
