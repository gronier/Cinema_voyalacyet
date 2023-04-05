
let chai = require('chai');
let chaiHttp = require('chai-http');
const db = require("../data/database")

// let server = require('../server');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cfg = require("../auth/config");
let should = chai.should();
chai.use(chaiHttp);


describe('Users', function() {
    before(function (done) {
        saltRounds =10
        bcrypt.hash('popo', saltRounds, (err, hash) => {
            db.run("insert into User(nom_user,prenom_user,email_user,password_user,id_role) values ('popo','popo','popo@popo.com',$password,1);",{
                $password: hash,
            }, (error, results) => {
                if (error) {
                    throw error
                }
                done();
            })
        })
        db.get('SELECT * FROM User WHERE email_user = "popo@popo.com"',
            async (err, row) => {
                const match = await bcrypt.compare('popo', row.password_user);
                if (match) {
                    const token = jwt.sign({id: row.id_user, role: row.id_role}, cfg.jwtSecret, {expiresIn: "12h"});
                }
            })
    })

    it('should add a SINGLE salle on /Salle POST', function (done) {
        chai.request('http://localhost:8000')
            .post('/Salle')
            .send({'nom_salle': 'TESTTtttrr', 'nbPlace_salle': 30})
            .end(function (err, res) {
                res.should.have.status(201);
                done();
            });
    });

    it('should delete a SINGLE salle on /salle/<id> DELETE', function(done) {
        chai.request('http://localhost:8000')
            .post('/Salle')
            .send({'nom_salle': 'TESTTtttrr', 'nbPlace_salle': 30})
            .end(function(err, res){
                chai.request('http://localhost:8000')
                    .get('/Salle/1')
                    .end(function(err, res) {
                        chai.request('http://localhost:8000')
                            .delete('/Salle/1')
                            .end(function(err, res){
                                res.should.have.status(200);
                                chai.request('http://localhost:8000')
                                    .get('/Salle/1')
                                    .end(function(err, res) {
                                        res.body.length.should.equal(0)
                                        done();
                                    });
                            });
                    });
            });
    });

    it('should add a SINGLE salle on /Salle get', function (done) {
        chai.request('http://localhost:8000')
            .get('/Salle')
            .send()
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });
});
