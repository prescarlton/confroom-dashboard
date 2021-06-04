import { useEffect, useState } from "react";
import { handleClientLoad, initClient } from "../../util/apiUtil";

const DayView = (props) => {
    const [events, setEvents] = useState([])
    const [authed, setAuthed] = useState(false);
    const [showSignOutButton, setShowSignOutButton] = useState(false)
    const gapi = window['gapi'];
    useEffect(() => {
        gapi.load('client:auth2', fetchDayEvents(props.calendar_id));
    }, [])

    const fetchDayEvents = (calendar_id) => {
        console.log('ye')
        initClient()
    }

    const checkAuth = () => {
        setAuthed(gapi.auth2.getAuthInstance().isSignedIn.get())
    }

    const handleAuthClick = () => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
            checkAuth();
        })
    }

    const handleSignOutClick = () => {
        gapi.auth2.getAuthInstance().signOut().then(() => {
            checkAuth();
        })
    }

    return (
        <div className='page'>

            {authed ? (
                <button className="button" onClick={handleSignOutClick}>Sign Out</button>
            ) : (
                <button className="button" onClick={handleAuthClick}>Sign In</button>
            )}
        </div>
    )
}

export default DayView;