import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Reservation(props) {

    const [Reservation , setReservation] = useState([]);
    const [Seance , setSeance] = useState([]);



    async function getReservation() {
        try {

            const response = await axios.request({
                url: "http://localhost:8000/mes_reservation/"+user.id ,
            })
            setReservation(response.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function getSeance() {
        try {

            const response = await axios.request({
                url: "http://localhost:8000/seance" ,
            })
            setSeance(response.data);
        } catch (error) {
            console.log("error", error);
        }
    }


    let token;
    let user;
    const navigate = useNavigate()
    useEffect(()=>{
        if (props.cookies && props.cookies.voyalacyet) {

            token = props.cookies.voyalacyet.token
            user = jwt_decode(token)

        }
        if(token === undefined) {
            navigate('/')
        }

        (async () => {
            await getReservation();
            await getSeance();
        })();
    },[])


    async function getFilm(id) {
        console.log(id);
        const data = (await axios.get("http://localhost:8000/film/"+id)).data;

        console.log(data);


    }

    async function deleteReservation(id) {
        try {
            var confirm =  window.confirm("Voulez-vous confirmer l'action ?");

            if(confirm == true)
            {
                axios.delete(
                    `http://localhost:8000/reservation/${id}`
                ).then( () => {
                    alert("reservation deleted");
                    window.location.reload();
                })
            }



        } catch (error) {
            console.log("error", error);
        }
    }




    return (



            <div className="container">

                <div className="p-2 d-flex justify-content-between">
                    <div>Mes réservations en cours</div>


                </div>

                <table className="table">
                    <thead>
                    <tr>

                        <th scope="col">Nom seance </th>
                        <th scope="col">Nombre de places</th>
                        <th scope="col">Action</th>

                    </tr>
                    </thead>
                    <tbody>
                    {Reservation.map(i =>
                        <tr key={i.id_reservation}>
                            <td>{i.id_seance}</td>

                            <td>{i.nb_place}</td>
                            <td>
                                <button onClick={() => deleteReservation(i.id_reservation)} type="button" className="btn btn-danger" >Annulé</button>

                            </td>


                        </tr>
                    )}


                    </tbody>
                </table>

                <div className="p-2 d-flex justify-content-between">
                    <div>Les seance en cours</div>
                </div>

                <table className="table">
                    <thead>
                    <tr>

                        <th scope="col">Film </th>
                        <th scope="col">Langue</th>
                        <th scope="col">Version</th>
                        <th scope="col">Prix</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Seance.map(i =>
                        <tr key={i.id_seance}>
                            <td>{i.id_film}</td>

                            <td>{i.language_seance}</td>
                            <td>{i.version_seance}</td>
                            <td>{i.prix_seance} €</td>
                            <td>
                                <button type="button" className="btn btn-danger" >Réservé</button>

                            </td>


                        </tr>
                    )}


                    </tbody>
                </table>
            </div>

    );
}
