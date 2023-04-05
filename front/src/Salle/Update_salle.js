import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import Home from "../Home/Home";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";

import Items from "../Items/Items";

import {Button, Container, Form} from "react-bootstrap";
import data from "bootstrap/js/src/dom/data";
import jwt_decode from "jwt-decode";





export default function Update_salle(props) {
    let params = useParams();

    const [salle, setUpdateSalle] = useState({nom_salle: "",nbPlace_salle:""});


    async function getSalle() {
        const data = (await axios.get("http://localhost:8000/Salle/"+params.id)).data;
        console.log("get auteur", data);
        setUpdateSalle(data);
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

    useEffect(() => {
        (async () => {
            await getSalle();
        })();
    }, []);

    function handleTextChangeSalle(e, label) {
        setUpdateSalle({...salle, [label]: e.target.value})
    }

    async function handleSubmitSalle(e) {
        e.preventDefault();
        try {
            var confirm =  window.confirm("Voulez-vous confirmer l'action ?");

            if(confirm == true) {
                const response = (await axios.patch("http://localhost:8000/Salle/" + params.id, salle)).data;
            }

            setUpdateSalle({nom_salle: "", nbPlace_salle: ""});
            document.location.replace("http://localhost:3000/Salle");
        } catch (e) {
            console.error("ERR", e);
        }
    }





    return (
        <Container>
            <div className="row justify-content-lg-center">
                <div className="p-2 col col-6">
                    <h3 className="person-title">Modification de la Salle {salle.nom_salle}</h3>
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

