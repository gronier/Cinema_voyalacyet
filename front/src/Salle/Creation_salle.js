import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "../Home/Home";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";

import {Button, Container, Form} from "react-bootstrap";
import data from "bootstrap/js/src/dom/data";

import { redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";




export default function Creation_salle(props) {

    const [salle, setSalle] = useState({nom_salle: "",nbPlace_salle:""});

    function handleTextChangeSalle(e, label) {
        setSalle({...salle, [label]: e.target.value})
    }

    async function handleSubmitSalle(e) {
        e.preventDefault();
        try {

            const response = (await axios.post("http://localhost:8000/Salle" , salle  ) ).data;


            setSalle({nom_salle: "", nbPlace_salle: ""});
            document.location.replace("http://localhost:3000/Salle");
        } catch (e) {
            console.error("ERR", e);
        }
    }


    let name;
    let token;
    let role;
    const navigate = useNavigate()
    useEffect(()=>{
        if (props.cookies && props.cookies.voyalacyet) {
            name = props.cookies.voyalacyet.name;
            token = props.cookies.voyalacyet.token
            role = jwt_decode(token)
        }
        if(token === undefined || role.role !== 3) {
            navigate('/')
        }
    },[])


    return (
        <Container>
            <div className="row justify-content-md-center">
                <div className="col col-lg-3">
                    <h3 className="person-title">Créer une Salle</h3>
                    <Form onSubmit={handleSubmitSalle}>
                        <Form.Group className="mb-3" controlId="personNom">
                            <Form.Label>Nom salle</Form.Label>
                            <Form.Control type="text" placeholder="Nom de la salle" value={salle.nom_salle}
                                          onChange={e => handleTextChangeSalle(e, "nom_salle")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="personPrenom">
                            <Form.Label>Nombre de places</Form.Label>
                            <Form.Control type="number" placeholder="Nombre de place" value={salle.nbPlace_salle}
                                          onChange={e => handleTextChangeSalle(e, "nbPlace_salle")}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            OK
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>








    );
}

