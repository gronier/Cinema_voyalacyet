
let chai = require('chai');
let chaiHttp = require('chai-http');
const db = require("../data/database")

// let server = require('../server');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cfg = require("../auth/config");
let should = chai.should();
chai.use(chaiHttp);


describe('Salle', function() {
    it('should Post/Delete a SINGLE salle on /salle/<id> DELETE', function(done) {
        chai.request('http://localhost:8000')
            .post('/Salle')
            .send({'nom_salle': 'TESTTtttrr', 'nbPlace_salle': 30})
            .end(function(err, res){
                chai.request('http://localhost:8000')
                    .get('/Salle')
                    .end(function(err, res) {
                        const result  = res.body.length
                        const r = res.body
                        const resu = r[result-1]
                        console.log(resu)
                        chai.request('http://localhost:8000')
                            .delete('/Salle/'+resu.id_salle)
                            .end(function(err, res){
                                res.should.have.status(200);
                                chai.request('http://localhost:8000')
                                    .get('/Salle/1')
                                    .end(function(err, res) {
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
