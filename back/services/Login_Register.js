const db = require("../data/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cfg = require("../auth/config");
const saltRounds = 10;
module.exports = {login,register};
function login(req,res){
    db.get('SELECT * FROM User WHERE email_user = $email',
        {$email: req.body.email},
        async (err, row) => {
            if (err) {
                return res.json(err);
            }
            if (!row) {
                return res.json("bad user");
            }
            const match = await bcrypt.compare(req.body.password, row.password_user);
            if (match) {
                const token = jwt.sign({id: row.id_user,role :row.id_role}, cfg.jwtSecret, {expiresIn: "12h"});
                return res.json({token: token});
            }
            res.json("bad password").status(401);
        })
}

function register(req,res){
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        db.get("insert into User(nom_user,prenom_user,email_user,password_user,id_role) values ($nom,$prenom,$email,$password,$role) returning id_user",
            {
                $nom: req.body.nom,
                $prenom: req.body.prenom,
                $email: req.body.email,
                $password: hash,
                $role: req.body.role
            },
            (err, row) => {
                if (err) {
                    return res.json(err).status(401);
                }
                return res.json({id: row.id_user}).status(201);
            });
    })
}
