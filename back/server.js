const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


const salle = require("./routes/route_salle");
const routes = require("./routes/routes");
const route_login = require("./routes/route_login");
const seance = require("./routes/route_seance")


const app = express();
const port = process.env.PORT || 8000;

app
    .use(morgan("combined"))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(routes)
    .use(salle)
    .use(seance)
    .use(route_login)
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        })
    })
    .listen(port, () => console.log("listening on port " + port));
