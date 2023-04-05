const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


const film = require("./routes/route_film")
const salle = require("./routes/route_salle");
const routes = require("./routes/routes");
const route_login = require("./routes/route_login");



const app = express();
const port = process.env.PORT || 8000;

app
    .use(morgan("combined"))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(routes)
    .use(film)
    .use(salle)
    .use(route_login)
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        })
    })
    .listen(port, () => console.log("listening on port " + port));
