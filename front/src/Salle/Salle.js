import React, {useEffect, useState} from "react";
import axios from "axios";



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
            <div className="p-2">Gestion des salles</div>

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
                    <tr>
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
