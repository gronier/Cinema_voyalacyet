import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";





export default function Film(props) {

    const [Film, setFilm] = useState([]);
    let params = useParams();

    async function getFilm() {
        const data = (await axios.get("http://localhost:8000/film/"+params.id)).data;
        console.log("get auteur", data);
        setFilm(data);
    }





    useEffect(() => {
        (async () => {
            await getFilm();
        })();
    }, []);





    return (

        <div className="container">
            <div className="p-2 d-flex justify-content-between">
                <h2>Detail du film {Film.nom_film}</h2>






            </div>

            <img width="100px" height="150px" alt="img_film" src={Film.affiche}/>

            <h3 className="p-2">Description :</h3>
            <p>{Film.description_film}</p>


        </div>








    );
}


