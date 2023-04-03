const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const salle = require("./routes/route_salle");

const app = express();
const port = process.env.PORT || 8000;

app
    .use(morgan("combined"))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(routes)
    .use(salle)
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        })
    })
    .listen(port, () => console.log("listening on port " + port));
