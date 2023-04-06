import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

import {Route, Router, Routes, useNavigate} from "react-router-dom";
import Home from "../Home/Home";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import Items from "../Items/Items";

import Creation_salle from "./Creation_salle";
import jwt_decode from "jwt-decode";








export default function Salle(props) {

    const [Salles, setSalle] = useState([]);


    async function getSalle() {
        try {
            const response = await axios.request({
                url: "http://localhost:8000/Salle",

          })

            setSalle(response.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function deleteSalle(id) {
        try {

           var confirm =  window.confirm("Voulez-vous confirmer l'action ?");

           if(confirm == true)
           {
               axios.delete(
                   `http://localhost:8000/Salle/${id}`
               ).then( () => {
                   alert("Salle deleted");
                   window.location.reload();
               })
           }




        } catch (error) {
            console.log("error", error);
        }
    }

    let name;
    let token;
    let role;
    const navigate = useNavigate()
    useEffect(()=>{
        if (props.cookies && props.cookies.voyalacyet) {
            name = props.cookies.voyalacyet.name;
            token = props.cookies.voyalacyet.token
            role = jwt_decode(token)
        }
        if(token === undefined || role.role !== 3) {
            navigate('/')
        }
    },[])

    useEffect(() => {

        (async () => {
            await getSalle();
        })();
    }, []);


    return (

        <div className="container">
            <div className="p-2 d-flex justify-content-between">
                <div>Gestion des salles</div>
                <a href="/createSalle" type="button" className="btn btn-success">Créer une salle</a>


            </div>

            <table className="table">
                <thead>
                <tr>

                    <th scope="col">Nom</th>
                    <th scope="col">Nombre de places</th>
                    <th scope="col">Action</th>

                </tr>
                </thead>
                <tbody>
                {Salles.map(i =>
                    <tr key={i.id_salle}>
                        <td>{i.nom_salle}</td>

                        <td>{i.nbPlace_salle}</td>
                        <td><button type="button" className="btn btn-danger" onClick={() => deleteSalle(i.id_salle)}>Suppression</button>  <a href={`/updateSalle/${i.id_salle}`}  type="button" className="btn btn-warning">Modification</a> </td>
                    </tr>
                )}

                </tbody>
            </table>

        </div>

    );
}



