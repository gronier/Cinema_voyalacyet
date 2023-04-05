import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Button, Container, Form} from "react-bootstrap";

export default function CreateReservation(props) {
    let params = useParams();

    const [Seance , setSeance] = useState();
    const [User , setUser] = useState();
    const [Film , setFilm] = useState();
    const [Reservation , setReservation] = useState({nb_place:''});

    function handleTextChangeSalle(e, label) {
        setReservation({...Reservation, [label]: e.target.value})
    }

    async function handleSubmitReservation(e) {
        e.preventDefault();
        try {
            console.log(User.id , +Reservation.nb_place , +params.id);

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
        if(token === undefined || user.role !== 3) {
            navigate('/')
        }
    },[])


    useEffect(() => {
        (async () => {
            await getSeance();
            await getFilm();

        })();
    }, []);


    console.log(Film);
    return (
        <Container>
            <div className="row justify-content-md-center">
                <div className="col col-lg-7">
                    <h3 className="person-title">Réserver une séance pour le film  </h3>
                    <Form onSubmit={handleSubmitReservation}>
                        <Form.Group className="mb-3" controlId="personNom">
                            <Form.Label>Nombre de places</Form.Label>
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