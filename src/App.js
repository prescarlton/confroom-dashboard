import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import './style/styles.scss'
import CalendarList from './components/molecules/CalendarList';

import Navbar from './components/molecules/Navbar';
import ApiCalendar from './util/ApiCalendar';
import store from './util/store';

const App = () => {

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
    <Provider store={store}>
      <div className="App">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <Navbar authed={auth} handleAuthClick={handleAuth} handleSignOutClick={handleSignOut} />
            <CalendarList calendars={calendars} />
          </>
        )}

      </div>
    </Provider>
  );
}

export default App;
