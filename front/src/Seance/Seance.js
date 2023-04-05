import {useEffect, useState} from "react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import {Container} from "react-bootstrap";

export default function Seance(props){
    let eventGuid = 0
    let todayStr = new Date().toISOString().replace(/T.*$/, '')

    const [Seance, setSeance] = useState([
        {
            id: createEventId(),
            title: 'All-day event',
            start: todayStr
        },
        {
            id: createEventId(),
            title: 'Timed event',
            duree: '300min',
            start: todayStr + 'T25:00:00'
        },
        {
            id: createEventId(),
            title: 'Timed event 300min',
            start: todayStr + 'T12:00:00'
        }
    ]);

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


    async function getSeance() {
        try {
            const response = await axios.request({
                url: "http://localhost:8000/Seance",
            })
            setSeance(response.data);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function handleSubmitSalle(e) {
        e.preventDefault();
        try {

            const response = (await axios.post("http://localhost:8000/Seance" , Seance  ) ).data;


            setSeance({date_seance: ""});
            document.location.replace("http://localhost:3000/Seance");
        } catch (e) {
            console.error("ERR", e);
        }
    }

    const deleteEvent = (id) => {
        axios
            .delete(`http://localhost:8000/Seance/${id}`)
            .then((response) => {
                console.log(response.data);
                const updatedEvents = Seance.filter((event) => event.id !== id);
                setSeance(updatedEvents);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        (async () => {
            await getSeance();
        })();
    }, []);

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
            <div className='demo-app-main'>
                <Container className="mt-5">
                    <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                                      initialView="timeGridWeek"
                                      events={Seance}
                                      editable={true}
                                      selectable={true}
                                      selectMirror={true}
                                      dayMaxEvents={true}
                                      droppable={true}
                                      locale={frLocale}
                                      select={handleDateSelect}
                                      eventContent={renderEventContent}
                                      eventClick={handleEventDelete}
                                      eventAdd={handleSubmitSalle}
                    />
                </Container>
            </div>
        </div>
    )
}
