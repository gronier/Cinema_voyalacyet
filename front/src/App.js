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
import Creation_salle from "./Salle/Creation_salle";
import Update_salle from "./Salle/Update_salle";



function MyNavBar(props) {
    const navigate = useNavigate();

    let name;
    if (props.cookies && props.cookies.voyalacyet) {
        name = props.cookies.voyalacyet.name;
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>

                {/*<Nav.Item><Link to="/items">Items</Link></Nav.Item>*/}
                <Nav.Item><Link to="/reservation">Reservation</Link></Nav.Item>
                <Nav.Item><Link to="/seance">Seance</Link></Nav.Item>
                <Nav.Item><Link to="/Salle">Salle</Link></Nav.Item>
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
                <Route exact={true} path="/reservation" element={<Reservation/>}/>
                <Route exact={true} path="/seance" element={<Seance/>}/>
                <Route exact={true} path="/signin" element={<Signin setCookie={setCookie}/>}/>
                <Route exact={true} path="/signup" element={<Signup/>}/>
                <Route exact={true} path="/Salle" element={<Salle cookies={cookies}/>}/>
                <Route exact={true} path="/createSalle" element={<Creation_salle/>}/>
                <Route exact={true} path="/updateSalle/:id" element={<Update_salle/>}/>

            </Routes>
        </>
    );
}
