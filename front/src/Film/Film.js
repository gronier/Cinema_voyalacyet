import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

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
        let confirm = window.confirm("Voulez-vous supprimer le film ? ")
        if(confirm === true){
            axios.delete(
                `http://localhost:8000/film/${id}`
            ).then( () => {
                alert("Film deleted");
                document.location.replace("http://localhost:3000/films");
            })
        }
    }



    return (
        <>
            <div className="container">
                <div className="p-2 d-flex justify-content-between">
                    <div>Gestion des Films</div>
                </div>

                <a href="/createFilm" className="btn btn-success">Créer un film</a>

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
                            <td><img src={i.affiche} width="100px" height="150px" alt="img_film"/></td>
                            <td>{i.duree_film}</td>
                            <td>{i.description_film}</td>
                            <td>
                                <button type="button" className="btn btn-danger" onClick={() => deleteFilm(i.id_film)}>Suppression</button>
                                <button className="btn btn-warning"><Link to={"/updateFilm/"+i.id_film} className={"text-decoration-none"}>Modification</Link></button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )

}
