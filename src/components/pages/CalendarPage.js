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
    const [roomSize, setroomSize] = useState('');
    const [confPhoneInfo, setConfPhoneInfo] = useState('');
    const [roomStatus, setRoomStatus] = useState(0);
    const [roomStatusLength, setRoomStatusLength] = useState('');
    const [areEventsToday, setAreEventsToday] = useState(true);
    const [sideBarClass, setsideBarClass] = useState('');
    const isFirstRender = useRef(true);

    // const calculateRoomStatusInfo = () => {
    //     // check room status based on current time vs next (or current) event
    //     const curr = moment();
    //     const nextEvent = events[0];
    //     const nextEventStart = moment(nextEvent.start.dateTime);
    //     const nextEventEnd = moment(nextEvent.end.dateTime);
    //     curr.isBetween(nextEventStart, nextEventEnd) ? setRoomStatus(0) : setRoomStatus(1);
    // }
    useEffect(() => {
        if (!isFirstRender.current) {
            // calculateRoomStatusInfo();
        }
    }, [events])

    useEffect(() => {
        isFirstRender.current = false;
        try {
            if (ApiCalendar.sign) {
                ApiCalendar.setCalendar(id);
                ApiCalendar.listEvents().then(({ result }) => {
                    const { roomName, roomSize, confPhoneInfo } = parseRoomInfo(result.summary);
                    // grab only the first few items from the list
                    const firstItems = result.items.slice(0, 2);
                    setloading(false)
                    setTitle(roomName);
                    setEvents(firstItems)
                    setroomSize(roomSize);
                    setConfPhoneInfo(confPhoneInfo);
                    // find out if there are any events today
                    let nextEvent = firstItems[0];
                    if (moment(nextEvent?.start.dateTime).isSame(moment(), 'day')) {
                    } else {
                        setAreEventsToday(false)
                    }
                    // calc 5/15 min before nextEvent
                    const fifteenBefore = moment(nextEvent?.start.dateTime).subtract(15, 'minute');
                    const fiveBefore = moment(nextEvent?.start.dateTime).subtract(5, 'minute');
                    // calculate what sidebar color should be
                    if (moment().isBetween(fiveBefore, moment(nextEvent?.end.dateTime))) {
                        // 5 min before nextEvent starts; the sidebar should be red
                        setsideBarClass('red');
                    } else if (moment().isBetween(fifteenBefore, moment(nextEvent?.start.dateTime))) {
                        // 15 min before nextEvent starts; the sidebar should be yellow
                        setsideBarClass('yellow');
                    } else {
                        setsideBarClass('green');
                    }
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
                                <div className='calendarPage__left__titleWrapper'>
                                    <PageTitle title={title} />

                                </div>
                                <h2>{sideBarClass == 'red' ? 'Booked' : 'Available'}</h2>
                                <h3>{sideBarClass == 'yellow' && 'Booked Soon'}</h3>
                            </div>
                            <div className={`calendarPage__right ${sideBarClass}`}>
                                <div className='calendarPage__right__upper'>
                                    {/* <h3>{`${roomSize} People`} &middot; {`${confPhoneInfo}`}</h3> */}
                                    <h2 className='hint-color'>{moment().format('dddd, MMM DD')}</h2>
                                    <h1>{moment().format('hh:mma')}</h1>
                                </div>
                                <div className='calendarPage__right__schedule'>
                                    <p className='calendarPage__right__schedule__header hint-color'>Coming Up Next {areEventsToday ? '' : '(No More Today)'}</p>
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