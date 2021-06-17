import { useEffect, useRef, useState } from "react";
import { useParams, withRouter } from 'react-router-dom';
import { parseRoomInfo } from "../../util";
import ApiCalendar from "../../util/ApiCalendar";
import PageTitle from "../atoms/PageTitle";
import LoadingPage from "./LoadingPage";
import moment from 'moment';
import EventSummary from "../atoms/EventSummary";
const CalendarPage = (props) => {
    let { id } = useParams();
    const [loading, setloading] = useState(true);
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [roomStatus, setRoomStatus] = useState(0);
    const [roomStatusLength, setRoomStatusLength] = useState('');
    const isFirstRender = useRef(true);

    const calculateRoomStatusInfo = () => {
        // check room status based on current time vs next (or current) event
        const curr = moment();
        const nextEvent = events[0];
        const nextEventStart = moment(nextEvent.start.dateTime);
        const nextEventEnd = moment(nextEvent.end.dateTime);
        curr.isBetween(nextEventStart, nextEventEnd) ? setRoomStatus(0) : setRoomStatus(1);
    }
    useEffect(() => {
        if (!isFirstRender.current) {
            calculateRoomStatusInfo();
        }
    }, [events])

    useEffect(() => {
        isFirstRender.current = false;
        try {
            if (ApiCalendar.sign) {
                ApiCalendar.setCalendar(id);
                ApiCalendar.listEvents().then(({ result }) => {
                    const { roomName } = parseRoomInfo(result.summary);
                    // grab only the first few items from the list
                    const firstItems = result.items.slice(0, 3);
                    setloading(false)
                    setTitle(roomName);
                    setEvents(firstItems)
                })
            }
        } catch (e) {
            console.log(e)
            props.history.push('/')
        }

    }, [])

    return (
        <>
            {
                loading ? (
                    <LoadingPage />
                ) : (
                    <div className='calendarPage'>
                        <div className='calendarPage__content'>
                            <div className='calendarPage__left'>
                                <PageTitle title={title} />
                                <h2>{roomStatus == 1 ? 'Available' : 'Booked'}</h2>
                            </div>
                            <div className={`calendarPage__right ${roomStatus == 1 ? 'open' : 'closed'}`}>
                                <div className='calendarPage__time'>
                                    {moment().format('dddd, MMM DD')}
                                </div>
                                <div className='calendarPage__schedule'>
                                {events.map(event => {
                                    console.log(event)
                                    return (
                                        <EventSummary
                                            title={event.summary}
                                            start={moment(event.start.dateTime)}
                                            end={moment(event.end.dateTime)} />
                                    )
                                })}
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
        </>
    )
}

export default withRouter(CalendarPage);