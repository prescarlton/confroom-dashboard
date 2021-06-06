import { useEffect, useState } from "react";
import { useParams, withRouter } from 'react-router-dom';
import { parseRoomInfo } from "../../util";
import ApiCalendar from "../../util/ApiCalendar";
import PageTitle from "../atoms/PageTitle";
import LoadingPage from "./LoadingPage";

const CalendarPage = (props) => {
    let { id } = useParams();
    const [loading, setloading] = useState(true);
    const [events, setEvents] = useState([])
    const [title, setTitle] = useState('');
    useEffect(() => {
        try {
            ApiCalendar.setCalendar(id)
            ApiCalendar.listEvents().then(({ result }) => {
                const {roomName} = parseRoomInfo(result.summary);
                setloading(false)
                setTitle(roomName);
                setEvents(result.items)
            })
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
                    <PageTitle title={title}/>
                        <div className='calendarPage__content'>
                            <div className='calendarPage__left'>
                                <h1>OPEN</h1>
                                <h2>For 15 min</h2>
                            </div>
                            <div className='calendarPage__right'>

                            </div>
                        </div>

                    </div>
                )
            }
        </>
    )
}

export default withRouter(CalendarPage);