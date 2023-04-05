import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function Signup(){
    const [person, setPerson] = useState({nom: "",prenom:"",email:"", password: "",role:"",});
    const navigate = useNavigate()

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
                alert("Utilisateur Crée");
                navigate('/signin')

                // props.setCookie("td05", {name: person.name, token: response.token}, "/");
            }
            setPerson({nom: "",prenom:"",email:"", password: "",role:"",});
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
                            <Form.Control type="text" placeholder="Nom" value={person.nom}
                                          onChange={e => handleTextChange(e, "nom")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="personPrenom">
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control type="text" placeholder="Prenom" value={person.prenom}
                                          onChange={e => handleTextChange(e, "prenom")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="personEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={person.email}
                                          onChange={e => handleTextChange(e, "email")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="personPassword">
                            <Form.Label>mot de passe</Form.Label>
                            <Form.Control type="password" placeholder="" value={person.password}
                                          onChange={e => handleTextChange(e, "password")}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="personRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Select  onChange={e => handleTextChange(e, "role")} defaultValue={'1'}>
                                <option> - Selectionne ton role - </option>
                                <option value={"1"}>Client</option>
                                <option value={"2"}>Etudiant</option>
                                <option value={"3"}>Employée</option>

                            </Form.Select>
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
