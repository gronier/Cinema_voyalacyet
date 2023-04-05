import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";


export default function Signup(){
    const [person, setPerson] = useState({nom: "",prenom:"",email:"", password: "",role:"",});

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
                        <Form.Group className="mb-3" controlId="personNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control id="name" type="text" placeholder="Nom" value={person.nom}
                                          onChange={e => handleTextChange(e, "nom")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="personPrenom">
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control id="firstname" type="text" placeholder="Prenom" value={person.prenom}
                                          onChange={e => handleTextChange(e, "prenom")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="personEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control id="email" type="text" placeholder="Email" value={person.email}
                                          onChange={e => handleTextChange(e, "email")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="personPassword">
                            <Form.Label>mot de passe</Form.Label>
                            <Form.Control id="psw" type="password" placeholder="" value={person.password}
                                          onChange={e => handleTextChange(e, "password")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="personRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Select  onChange={e => handleTextChange(e, "role")}>
                                <option value={"1"}>Client</option>
                                <option value={"2"}>Etudiant</option>
                            </Form.Select>
                        </Form.Group>
                        <Button id="ok" variant="primary" type="submit">
                            OK
                        </Button>
                    </Form>
                </div>
            </div>
        </Container>
    );
}
