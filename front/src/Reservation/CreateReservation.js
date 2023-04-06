import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Button, Container, Form} from "react-bootstrap";

export default function CreateReservation(props) {
    let params = useParams();

    const [Seance , setSeance] = useState([]);
    const [User , setUser] = useState();
    const [Film , setFilm] = useState([]);
    const [Reservation , setReservation] = useState({nb_place:''});

    function handleTextChangeSalle(e, label) {
        setReservation({...Reservation, [label]: e.target.value})
    }

    async function handleSubmitReservation(e) {
        e.preventDefault();
        try {


            await axios.post("http://localhost:8000/reservation" , {
                id_user: User.id,
                nb_place: +Reservation.nb_place,
                id_seance: +params.id
            });


            setReservation({nb_place:''});
            document.location.replace("http://localhost:3000/reservation");
        } catch (e) {
            console.error("ERR", e);
        }
    }

    async function getSeance() {
        const data = (await axios.get("http://localhost:8000/seance/"+params.id)).data;

        setSeance(data);
    }

    async function getFilm() {

        const data = (await axios.get("http://localhost:8000/film/"+params.id_film)).data;

        setFilm(data);
    }


    let token;
    let user;
    const navigate = useNavigate()
    useEffect(()=>{
        if (props.cookies && props.cookies.voyalacyet) {

            token = props.cookies.voyalacyet.token
            user = jwt_decode(token)
            setUser(user)
        }
        if(token === undefined ) {
            navigate('/')
        }
    },[])


    useEffect(() => {
        (async () => {

            await getFilm();
            await getSeance();


        })();
    }, []);



    return (
        <Container>
            <div className="row justify-content-md-center">
                <div className="col col-lg-7">
                    <h3 className="person-title">Réserver une séance pour le film {Film.nom_film}   </h3>

                    Détails de la séance :
                    <div className="row">
                        <div className="col-6">
                            <ul>
                                <li>Language : {Seance.language_seance}</li>
                                <li>Version : {Seance.version_seance}</li>
                                <li>Date début : {Seance.date_debut_seance}</li>
                                <li>Durée : {Film.duree_film} minutes</li>
                                <li> Description : {Film.description_film}</li>
                            </ul>

                        </div>
                        <div className="col-6">
                            <img width="100px" height="150px" alt="img_film" src={Film.affiche} />

                        </div>

                    </div>


                    <Form onSubmit={handleSubmitReservation}>
                        <Form.Group className="mb-3" controlId="personNom">
                            <Form.Label>Nombre de places prévues</Form.Label>
                            <Form.Control type="number" placeholder="Nombre de place" value={Reservation.nb_place}
                                          onChange={e => handleTextChangeSalle(e, "nb_place")}/>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            OK
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>

    )

}