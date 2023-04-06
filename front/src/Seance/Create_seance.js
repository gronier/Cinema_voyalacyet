import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import Items from "../Items/Items";
import {Button, Container, Form} from "react-bootstrap";
import data from "bootstrap/js/src/dom/data";
import {formatDate} from "@fullcalendar/core";




export default function Create_seance(props) {

    const [seance, setSeance] = useState([]);
    const [film, setFilm] = useState([]);

    function handleTextChangeSeance(e, label) {
        setSeance({...seance, [label]: e.target.value})
    }

    async function handleSubmitSeance(e) {
        e.preventDefault();
        try {

            const response = (await axios.post("http://localhost:8000/seance" , seance  ) ).data;


            setSeance(response.data);
            document.location.replace("http://localhost:3000/seance");
        } catch (e) {
            console.error("ERR", e);
        }
    }
    useEffect(()=>{
        (async () => {
            await getFilm()
        })();
    }, []);
    async function getFilm(){
        await axios
            .get("http://localhost:8000/film")
            .then((response) => {
                setFilm(response.data);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }
    return (
        <Container>
            <div className="row justify-content-md-center">
                <div className="col col-lg-3">
                    <h3 className="person-title">Créer une Séance</h3>
                    <Form onSubmit={handleSubmitSeance}>
                        <Form.Group className="mb-3" controlId="dateDebutSeance">
                            <Form.Label>Date de début de la séance</Form.Label>
                            <Form.Control type="datetime-local" placeholder="Date de début de la séance" value={seance.date_debut_seance}
                                          onChange={e => handleTextChangeSeance(e, "date_debut_seance")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dateFinSeance">
                            <Form.Label>Date de fin de la séance</Form.Label>
                            <Form.Control type="datetime-local" placeholder="Date de fin de la séance" value={seance.date_fin_seance}
                                          onChange={e => handleTextChangeSeance(e, "date_fin_seance")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="languageSeance">
                            <Form.Label>Language de la séance</Form.Label>
                            <Form.Control type="string" placeholder="Language seance" value={seance.language_seance}
                                          onChange={e => handleTextChangeSeance(e, "language_seance")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="versionSeance">
                            <Form.Label>Version de la séance</Form.Label>
                            <Form.Control type="string" placeholder="Version de la séance" value={seance.version_seance}
                                          onChange={e => handleTextChangeSeance(e, "version_seance")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="languageSeance">
                            <Form.Label>Prix de la séance</Form.Label>
                            <Form.Control type="number" placeholder="Prix seance" value={seance.prix_seance}
                                          onChange={e => handleTextChangeSeance(e, "prix_seance")}/>
                        </Form.Group>
                        <Form.Group  style={{marginTop:20}} className="mb-3" >
                            <Form.Label>Film</Form.Label>

                            <Form.Select  onChange={e => handleTextChangeSeance(e, "id_film")}>

                                <option> - Selectionne le film  </option>

                                {film.map(i=>

                                    <option value={i.id_film}>{i.nom_film}</option>


                                )}

                            </Form.Select>
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
