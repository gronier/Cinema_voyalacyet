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

    const [Seance, setSeance] = useState([]);
    const INITIAL_EVENTS = [
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
    ]

    function handleDateSelect(selectInfo) {
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

    function handleEventClick(clickInfo){
        if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove()
        }
    }


    async function getSeance() {
        const response = await axios.request({
            url: "http://localhost:8000/Seance",
        }).then(
            setSeance(response.data)
        ).catch (error => {
            console.log("error", error);
        },[])
        const seanceEvents = Seance.map(a=>({
            title:"test",
            start: a.date_seance
        }))
    }

    useEffect(() => {
        (async () => {
            await getSeance();
        })();
    }, []);

    function createEventId() {
        return String(eventGuid++)
    }


    function renderEventContent(eventInfo) {
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
                                      events={INITIAL_EVENTS}
                                      editable={true}
                                      selectable={true}
                                      selectMirror={true}
                                      dayMaxEvents={true}
                                      droppable={true}
                                      locale={frLocale}
                                      select={handleDateSelect}
                                      eventContent={renderEventContent}
                                      eventClick={handleEventClick}
                    />
                </Container>
            </div>
        </div>
    )
}
