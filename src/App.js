import { useEffect, useState } from 'react';
import './App.css';

import EventList from './components/molecules/EventList';
import Navbar from './components/molecules/Navbar';
import ApiCalendar from './util/ApiCalendar';



const App = () => {
  const [auth, setAuth] = useState(ApiCalendar.sign)
  const [calendars, setCalendars] = useState([])

  const handleAuth = () => {
    ApiCalendar.handleAuthClick();
    setAuth(ApiCalendar.sign);
    if (ApiCalendar.sign)
      ApiCalendar.listCalendars().then(({ result }) => {
        console.log(result.items)
      })
  }

  const handleSignOut = () => {
    ApiCalendar.handleSignoutClick();
    setAuth(ApiCalendar.sign);
  }

  return (
    <div className="App">
      <Navbar authed={ApiCalendar.sign} handleAuthClick={handleAuth} handleSignOutClick={handleSignOut} />
      <p>
        TIAG Conference Room Dashboard
          <EventList events={calendars} />
      </p>
    </div>
  );
}

export default App;
