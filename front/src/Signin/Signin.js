import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Signin(props) {
    const [person, setPerson] = useState({email: "", password: ""});
    const navigate = useNavigate();

    function handleTextChange(e, label) {
        setPerson({...person, [label]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.post("http://localhost:8000/signin", person)).data;
            if (response.token === undefined) {
                alert("échec de connexion");
            } else {
                props.setCookie("voyalacyet", {name: person.email, token: response.token}, "/");
                navigate('/')
            }
            setPerson({name: "", password: ""});
        } catch (e) {
            console.error("ERR", e);
        }
    }

    return (
        <Container style={{marginBottom:160,marginTop:20}}>
            <div className="row justify-content-md-center">
                <div className="col col-lg-3">
                    <h1 className="person-title">Se connecter</h1>
                    <Form style={{marginTop:30}} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="personEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control id="email" type="text" placeholder="Email" value={person.email}
                                          onChange={e => handleTextChange(e, "email")}/>
                        </Form.Group>


                        <Form.Group style={{marginTop:30}} className="mb-3" controlId="personPassword">
                            <Form.Label>Mot de Passe</Form.Label>
                            <Form.Control id="psw" type="password" placeholder="" value={person.password}
                                          onChange={e => handleTextChange(e, "password")}/>
                        </Form.Group>

                        <Button id="ok" style={{marginTop:20}} variant="primary" type="submit">

                            OK
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
}
