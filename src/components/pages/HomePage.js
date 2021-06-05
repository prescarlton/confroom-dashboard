
import CalendarList from '../molecules/CalendarList';


const HomePage = ({loading, calendars}) => {
    return (
        <div className='homepage'>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <CalendarList calendars={calendars} />
                </>
            )}
        </div>
    )
}

export default HomePage;