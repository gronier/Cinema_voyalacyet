import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Film(props){
    const [films,setFilms] = useState([])

    async function getFilms(){
        try {
            const response = await axios.request(
                {
                    url: "http://localhost:8000/film"
                })
            setFilms(response.data)
        }
        catch (error) {
            console.log("Error : " + error)
        }
    }

    useEffect( () => {
        (async () => {
            await getFilms();
        })();
    },[]);


    function deleteFilm(id){
        axios.delete(
            `http://localhost:8000/film/${id}`
        ).then( () => {
            alert("Film deleted");
            document.location.replace("http://localhost:3000/films");
        })
    }



    return (
        <>
            <div className="container">
                <div className="p-2 d-flex justify-content-between">
                    <div>Gestion des Films</div>
                </div>

                <a href="/createFilm">Créer un film</a>

                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Nom du film</th>
                        <th scope="col">Affiche du film</th>
                        <th scope="col">Durée du film</th>
                        <th scope="col">Synopsis</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {films.map((i,index) =>
                        <tr>
                            <td>{i.nom_film}</td>
                            <td>{i.affiche}</td>
                            <td>{i.duree_film}</td>
                            <td>{i.description_film}</td>
                            <td><button type="button" className="btn btn-danger" onClick={() => deleteFilm(i.id_film)}>Suppression</button>  <a href={`/updateFilm/${i.id_film}`}  type="button" className="btn btn-warning">Modification</a> </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
}