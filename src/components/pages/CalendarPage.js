import { useEffect, useState } from "react";
import { useParams, withRouter } from 'react-router-dom';
import ApiCalendar from "../../util/ApiCalendar";
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
                console.log(result)
                setloading(false)
                setTitle(result.summary);
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
                    <h1>viewing: {title}</h1>
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