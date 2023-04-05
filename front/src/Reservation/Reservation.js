import React, {useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export default function Reservation(props) {
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
        if(token === undefined) {
            navigate('/')
        }
    },[])


    return (
        <>
            Coucou
        </>
    );
}
