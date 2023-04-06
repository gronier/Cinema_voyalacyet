import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {Route, Routes, useNavigate, useParams} from "react-router-dom";

import {Button, Container, Form} from "react-bootstrap";
import data from "bootstrap/js/src/dom/data";
import jwt_decode from "jwt-decode";





export default function Update_seance(props) {
    let params = useParams();

    const [seance, setUpdateSeance] = useState([]);
    const [film, setFilm] = useState([]);


    async function getSeance() {
        const data = (await axios.get("http://localhost:8000/seance/"+params.id)).data;
        setUpdateSeance(data);
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
            await getSeance();
            await getFilm()
        })();
    }, []);

    function handleTextChangeSeance(e, label) {
        setUpdateSeance({...seance, [label]: e.target.value})
    }

    async function handleSubmitSeance(e) {
        e.preventDefault();
        try {

            const response = (await axios.patch("http://localhost:8000/seance/"+ params.id , seance  ) ).data;


            setUpdateSeance(response.data);
            document.location.replace("http://localhost:3000/seance");
        } catch (e) {
            console.error("ERR", e);
        }
    }
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
                    <h3 className="person-title">Modifier une Seance</h3>
                    <Form onSubmit={handleSubmitSeance}>
                        <Form.Group className="mb-3" controlId="dateDebutSeance">
                            <Form.Label>Date de début de la seance</Form.Label>
                            <Form.Control type="datetime-local" placeholder="Date de début de la séance" value={seance.date_debut_seance}
                                          onChange={e => handleTextChangeSeance(e, "date_debut_seance")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dateFinSeance">
                            <Form.Label>Date de fin de la seance</Form.Label>
                            <Form.Control type="datetime-local" placeholder="Date de fin de la séance" value={seance.date_fin_seance}
                                          onChange={e => handleTextChangeSeance(e, "date_fin_seance")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="languageSeance">
                            <Form.Label>Language de la seance</Form.Label>
                            <Form.Control type="string" placeholder="Language seance" value={seance.language_seance}
                                          onChange={e => handleTextChangeSeance(e, "language_seance")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="versionSeance">
                            <Form.Label>Version de la seance</Form.Label>
                            <Form.Control type="string" placeholder="Version de la séance" value={seance.version_seance}
                                          onChange={e => handleTextChangeSeance(e, "version_seance")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="languageSeance">
                            <Form.Label>Prix de la seance</Form.Label>
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

