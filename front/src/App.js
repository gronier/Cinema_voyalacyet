// eslint-disable-next-line
import React from "react";
import {Button, Container, Navbar, Nav} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home/Home";
import Signin from "./Signin/Signin";
import Signup from "./Signup/Signup";
import Items from "./Items/Items";
import Salle from "./Salle/Salle";
import {useCookies} from "react-cookie";



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
                <Nav.Item><Link to="/items">Items</Link></Nav.Item>
                <Nav.Item><Link to="/Salle">Salle</Link></Nav.Item>
                {name !== undefined &&
                    <Nav.Item>Hello {name}</Nav.Item>
                }
                {name === undefined ?
                    <Button variant="outline-success" onClick={() => navigate("/signin")}>connexion</Button> :
                    <Button variant="outline-danger" onClick={() => props.removeCookie("td05")}>déconnexion</Button>
                }

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
                <Route exact={true} path="/signin" element={<Signin setCookie={setCookie}/>}/>
                <Route exact={true} path="/signup" element={<Signup/>}/>
                <Route exact={true} path="/items" element={<Items cookies={cookies}/>}/>
                <Route exact={true} path="/Salle" element={<Salle cookies={cookies}/>}/>
            </Routes>
        </>
    );
}
