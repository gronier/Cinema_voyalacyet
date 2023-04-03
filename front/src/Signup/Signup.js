import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";


export default function Signup(){
    const [person, setPerson] = useState({name: "", password: ""});

    function handleTextChange(e, label) {
        setPerson({...person, [label]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = (await axios.post("http://localhost:8000/signup", person)).data;
            if (response.id === undefined) {
                alert("échec de connexion");
            } else {
                alert(response.id);
                // props.setCookie("td05", {name: person.name, token: response.token}, "/");
            }
            setPerson({name: "", password: ""});
        } catch (e) {
            console.error("ERR", e);
        }
    }

    return (
        <Container>
            <div className="row justify-content-md-center">
                <div className="col col-lg-3">
                    <h1 className="person-title">Créer un compte</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="personName">
                            <Form.Label>nom</Form.Label>
                            <Form.Control type="text" placeholder="nom" value={person.name}
                                          onChange={e => handleTextChange(e, "name")}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="personPassword">
                            <Form.Label>mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="" value={person.password}
                                          onChange={e => handleTextChange(e, "password")}/>
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
