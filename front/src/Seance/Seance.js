import React, {useEffect, useState} from "react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import {Container} from "react-bootstrap";
import Create_seance from "./Create_seance";
import {formatDate} from "@fullcalendar/core";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Seance(props){
    let eventGuid = 0
    let todayStr = new Date().toISOString().replace(/T.*$/, '')

    const [seance, setSeance] = useState([]);

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
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
        console.log(token)
        if(token === undefined || role.role !== 3) {
            navigate('/')
        }
    },[])

    useEffect(() => {
        axios
            .get("http://localhost:8000/seance")
            .then((response) => {
                setSeance(response.data);
            })
            .catch ((error) => {
                console.log("error", error);
            });
    }, []);

    const seanceEvent = seance.map(seance => ({
        title: 'Film' + seance.id_film,
        start: seance.date_debut_seance,
        end: seance.date_fin_seance,
        id: seance.id_seance
    }))

    const deleteEvent = (id) => {
        axios
            .delete(`http://localhost:8000/seance/${id}`)
            .then((response) => {
                console.log(response.data);
                const updatedEvents = seanceEvent.filter((event) => event.id !== id);
                setSeance(updatedEvents);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleEventDelete = (clickInfo) => {
        const eventId = clickInfo.event.id;
        const eventStart = clickInfo.event.start;
        const eventEnd = clickInfo.event.end;
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer le créneau du "${eventStart}" au "${eventEnd}" ?`)) {
            console.log(eventId);
            deleteEvent(eventId);
            clickInfo.event.remove();
            window.location.reload();
        }
    }

    function createEventId() {
        return String(eventGuid++)
    }


    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    return (
        <div className='demo-app'>
            <div className="container">
                <table className="table">
                    <thead>
                    <tr>

                        <th scope="col">Date de debut de seance</th>
                        <th scope="col">Date de fin de seance</th>
                        <th scope="col">Langage de la seance</th>
                        <th scope="col">Version de la seance</th>
                        <th scope="col">Prix de la seance</th>
                        <th scope="col">ID du film</th>

                        <th scope="col">Action</th>

                    </tr>
                    </thead>

                    <tbody>
                    {seance.map(i =>
                        <tr key={i.id_seance}>
                            <td>{i.date_debut_seance}</td>
                            <td>{i.date_fin_seance}</td>
                            <td>{i.language_seance}</td>
                            <td>{i.version_seance}</td>
                            <td>{i.prix_seance}</td>
                            <td>{i.id_film}</td>

                            <td><a href={`/updateSeance/${i.id_seance}`}  type="button" className="btn btn-warning">Modification</a></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <div className='demo-app-main'>
                <a href="/createSeance" type="button" className="btn btn-success">Créer une séance</a>

                <Container className="mt-5">
                    <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                                      initialView="timeGridWeek"
                                      events={seanceEvent}
                                      editable={true}
                                      selectable={true}
                                      selectMirror={true}
                                      dayMaxEvents={true}
                                      droppable={true}
                                      locale={frLocale}
                                      select={handleDateSelect}
                                      eventContent={renderEventContent}
                                      eventClick={handleEventDelete}
                    />
                </Container>
            </div>
        </div>
    )
}
