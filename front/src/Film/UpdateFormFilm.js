import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";

export default function UpdateFormFilm(props) {
    let params = useParams();

    const [film, setUpdateFilm] = useState(
        {
            nom_film: "",
            affiche: "",
            duree_film: "",
            description_film: ""
        }
    );

    useEffect(() => {
        (async () => {
            await getFilm();
        })();
    }, []);

    async function getFilm() {
        const data = (await axios.get("http://localhost:8000/film/"+params.id)).data;
        setUpdateFilm(data);
    }
    function handleTextChangeSalle(e, label) {
        console.log(film)
        setUpdateFilm({...film, [label]: e.target.value})
    }

    async function handleSubmitFilm(e) {
        e.preventDefault();
        try {
            let confirm =  window.confirm("Voulez-vous confirmer l'action ?");

            if(confirm === true) {
                const response = (await axios.put("http://localhost:8000/film/" + params.id, film)).data;
            }

            setUpdateFilm({
                nom_film: "",
                affiche: "",
                duree_film: "",
                description_film: ""
            });
            document.location.replace("http://localhost:3000/films");
        } catch (e) {
            console.error("ERR", e);
        }
    }

    console.log("film : ",film)
    return (
        <Container>
            <div className="row justify-content-lg-center">
                <div className="p-2 col col-6">
                    <h3 className="person-title">Modification du film : {film.nom_film}</h3>
                    <Form onSubmit={handleSubmitFilm}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom du film</Form.Label>
                            <Form.Control type="text" placeholder="Nom de la salle" value={film.nom_film}
                                          onChange={e => handleTextChangeSalle(e, "nom_film")}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Affiche du film</Form.Label>
                            <Form.Control type="text" placeholder="Affiche du film" value={film.affiche}
                                          onChange={e => handleTextChangeSalle(e, "affiche")}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Durée du film</Form.Label>
                            <Form.Control type="text" placeholder="Durée du film" value={film.duree_film}
                                          onChange={e => handleTextChangeSalle(e, "duree_film")}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Synopsis du film</Form.Label>
                            <Form.Control type="text" placeholder="Synopsis du film" value={film.description_film}
                                          onChange={e => handleTextChangeSalle(e, "description_film")}/>
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
