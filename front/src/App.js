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



function MyNavBar(props) {
    const navigate = useNavigate();

    let name;
    if (props.cookies && props.cookies.td05) {
        name = props.cookies.td05.name;
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>

                {/*<Nav.Item><Link to="/items">Items</Link></Nav.Item>*/}
                <Nav.Item><Link to="/reservation">Reservation</Link></Nav.Item>
                <Nav.Item><Link to="/seance">Seance</Link></Nav.Item>
                <Nav.Item><Link to="/Salle">Salle</Link></Nav.Item>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Button variant="outline-success" onClick={() => navigate("/signin")}>
                        Sign In
                    </Button>
                    <Button variant="outline-primary" style={{ marginLeft: "10px" }} onClick={() => navigate("/signup")}>
                        Sign Up
                    </Button>
                </div>


            </Container>
        </Navbar>
    )
}

export default function App() {
    const [cookies, setCookie, removeCookie] = useCookies(["td05"]);
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

            </Routes>
        </>
    );
}
