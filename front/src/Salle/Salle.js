import React, {useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import {Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import Signin from "../Signin/Signin";
import Signup from "../Signup/Signup";
import Items from "../Items/Items";
import Creation_salle from "./Creation_salle";




export default function Salle(props) {

    const [Salles, setSalle] = useState([]);


    async function getSalle() {
        try {
            const response = await axios.request({
                url: "http://localhost:8000/Salle",
          })
            setSalle(response.data);
            if (props.cookies && props.cookies.td05) {
                const response = await axios.request({
                    url: "http://localhost:8000/Salle",
                    headers: {Authorization: "Bearer " + props.cookies.td05.token}
                })
                setSalle(response.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        (async () => {
            await getSalle();
        })();
    }, []);




    return (

        <div className="container">
            <div className="p-2 d-flex justify-content-between">
                <div>Gestion des salles</div>
                <a href="/createSalle" type="button" className="btn btn-success">Crée une salle</a>


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
                        <td><a href="#">delete</a>  <a href="#">Update</a> </td>
                        

                    </tr>
                )}


                </tbody>
            </table>

        </div>






    );
}


