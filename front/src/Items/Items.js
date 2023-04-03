import React, {useEffect, useState} from "react";
import axios from "axios";


export default function Items(props) {
    const [items, setItems] = useState([]);

    async function getItems() {
        try {
            if (props.cookies && props.cookies.td05) {
                const response = await axios.request({
                    url: "http://localhost:8000/items",
                    headers: {Authorization: "Bearer " + props.cookies.td05.token}
                })
                setItems(response.data);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        (async () => {
            await getItems();
        })();
    }, []);

    return (
        <ul>
            {items.map(i => <li key={i.id}>{i.name}</li>)}
        </ul>
    );
}
