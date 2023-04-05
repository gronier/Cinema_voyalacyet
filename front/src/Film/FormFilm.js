import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {useState} from "react";

export default function FormFilm(props) {

    const [film, setFilm] = useState({
        nom_film: "",
        affiche: "",
        duree_film: "",
        description_film: ""
    });

    function handleTextChangeFilm(e) {
        setFilm({...film, [e.target.name]: e.target.value})
    }

    async function handleSubmitFilm(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/film", film);
            setFilm({
                nom_film: "",
                affiche: "",
                duree_film: "",
                description_film: ""
            });
            document.location.replace("http://localhost:3000/films");
        } catch (e) {
            console.error("Err", e)
            console.log("theo")
        }
    }

    return (
        <Container>
            <div className="row justify-content-md-center">
                <div className="col col-lg-3">
                    <h3 className="person-title">Créer un film</h3>
                    <Form onSubmit={handleSubmitFilm}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom du film</Form.Label>
                            <Form.Control type="text" placeholder="Nom du film"
                                          value={film.nom_film} name="nom_film" onChange={handleTextChangeFilm}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Affiche du film (url de l'image)</Form.Label>
                            <Form.Control type="text" placeholder="Affiche du film"
                                          value={film.affiche} name="affiche" onChange={handleTextChangeFilm}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Durée du film</Form.Label>
                            <Form.Control type="text" placeholder="Durée du film"
                                          value={film.duree_film} name="duree_film" onChange={handleTextChangeFilm}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Synopsis du film</Form.Label>
                            <Form.Control type="text" placeholder="Synopsis du film"
                                          value={film.description_film} name="description_film" onChange={handleTextChangeFilm}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">OK</Button>
                    </Form>
                </div>
            </div>
        </Container>
    )
}
