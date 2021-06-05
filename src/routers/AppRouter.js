import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from '../components/molecules/Navbar';
import HomePage from "../components/pages/HomePage";
import { useEffect, useState } from 'react';
import ApiCalendar from '../util/ApiCalendar';
import CalendarPage from "../components/pages/CalendarPage";
const AppRouter = () => {

    const [auth, setAuth] = useState(ApiCalendar.sign)
    const [calendars, setCalendars] = useState([])
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)

    const signUpdate = (sign) => {
        console.log('sign', sign)
        setAuth(sign)
    }

    const showCalendars = () => {
        ApiCalendar.listCalendars().then(({ result }) => {
            console.log(result.items)
        })
    }

    const handleAuth = () => {
        ApiCalendar.handleAuthClick()
            .then(() => {
                console.log(ApiCalendar.sign)
                setAuth(ApiCalendar.sign);
                ApiCalendar.listCalendars().then(({ result }) => {
                    setCalendars(result.items)
                })
            })
    }

    const handleSignOut = () => {
        ApiCalendar.handleSignoutClick();
        setAuth(ApiCalendar.sign);
    }

    return (
        <Router>
            <Navbar authed={auth} handleAuthClick={handleAuth} handleSignOutClick={handleSignOut} />
            <Switch>
                <Route path='/' exact>
                    <HomePage loading={loading} calendars={calendars} />
                </Route>
                <Route path='/cal/:id'>
                    <CalendarPage />
                </Route>
            </Switch>
        </Router>
    )
};

export default AppRouter;