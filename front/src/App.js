// eslint-disable-next-line
import React from "react";
import {Button, Container, Navbar, Nav} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home/Home";
import Reservation from "./Reservation/Reservation"
import Seance from "./Seance/Seance"
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";
import Salle from "./Salle/Salle";
import {useCookies} from "react-cookie";
import Film from "./Film/Film";
import FormFilm from "./Film/FormFilm";
import UpdateFormFilm from "./Film/UpdateFormFilm";
import Creation_salle from "./Salle/Creation_salle";
import Update_salle from "./Salle/Update_salle";
import jwt_decode from "jwt-decode";
import Create_seance from "./Seance/Create_seance";
import Film2 from "./Reservation/film";
import CreateReservation from "./Reservation/CreateReservation";
import Update_seance from "./Seance/Update_seance"





function MyNavBar(props) {
    const navigate = useNavigate();

    let name;
    let token;
    if (props.cookies && props.cookies.voyalacyet) {
        name = props.cookies.voyalacyet.name;
        token = props.cookies.voyalacyet.token
        var role = jwt_decode(token)
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>

                <Navbar.Brand>
                    <Link to="/"><img src={"http://localhost:8000/img/logo2.png"} style={{width: 50}}/></Link>

                </Navbar.Brand>
                {token === undefined ?< >
                    <Button variant="btn btn-primary" onClick={() => navigate("/")}>Accueil</Button>

                < />: <>
                    <Button variant="btn btn-primary" onClick={() => navigate("/")}>Accueil</Button>
                    <Button variant="btn btn-primary" onClick={() => navigate("/reservation")}>Réservation</Button>
                < />}
                {token !== undefined && role.role ===3 ? < >
                    <Button variant="btn btn-primary" onClick={() => navigate("/seance")}>Séance</Button>
                    <Button variant="btn btn-primary" onClick={() => navigate("/Salle")}>Salle</Button>
                    <Button variant="btn btn-primary" onClick={() => navigate("/films")}>Films</Button>
                < /> : <></>

                }


                {name !== undefined &&
                    <Nav.Item>Hello {name}</Nav.Item>
                }
                {name === undefined ?< >

                    <Button variant="outline-success" onClick={() => navigate("/signin")}>Connexion</Button>
                    <Button variant="outline-success" onClick={() => navigate("/signup")}>Inscription</Button> < /> :

                    <Button variant="outline-danger" onClick={() => props.removeCookie("voyalacyet")}>déconnexion</Button>
                }


            </Container>
        </Navbar>
    )
}

export default function App() {
    const [cookies, setCookie, removeCookie] = useCookies(["voyalacyet"]);
    return (
        <>
            <MyNavBar cookies={cookies} removeCookie={removeCookie}/>
            <Routes>
                <Route exact={true} path="/" element={<Home/>}/>
                <Route exact={true} path="/reservation" element={<Reservation cookies={cookies}/>}/>
                <Route exact={true} path="/reservation/create/:id/:id_film" element={<CreateReservation cookies={cookies}/>}/>
                <Route exact={true} path="/seance" element={<Seance cookies={cookies}/>}/>
                <Route exact={true} path="/createSeance" element={<Create_seance cookies={cookies}/>}/>
                <Route exact={true} path="/updateSeance/:id" element={<Update_seance cookies={cookies}/>}/>
                <Route exact={true} path="/signin" element={<Signin setCookie={setCookie}/>}/>
                <Route exact={true} path="/signup" element={<Signup/>}/>
                <Route exact={true} path="/films" element={<Film/>}/>
                <Route exact={true} path="/createFilm" element={<FormFilm/>}/>
                <Route exact={true} path="/updateFilm/:id" element={<UpdateFormFilm/>}/>
                <Route exact={true} path="/Salle" element={<Salle cookies={cookies}/>}/>
                <Route exact={true} path="/film/:id" element={<Film2/>}/>
                <Route exact={true} path="/createSalle" element={<Creation_salle cookies={cookies}/>}/>
                <Route exact={true} path="/updateSalle/:id" element={<Update_salle cookies={cookies}/>}/>


            </Routes>
        </>
    );
}
