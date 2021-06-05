import CalendarListItem from "../atoms/CalendarListItem"

// type CalendarListProps = {
//     calendars: Array<Object>
// }
const CalendarList = ({ calendars }) => {

    const makeCalendarList = () => {
        return calendars.map((cal) => {
            if (cal.summary.includes('Charleston, SC'))
                return (
                    <CalendarListItem
                        key={cal.id}
                        {...cal}
                    />
                )
        })
    }

    return (
        <div className='calendarList__wrapper'>
            <h1>select a conference room.</h1>
            <div className={`calendarList__list${calendars.length == 0 ? '--noCalendars' : ''}`}>
                {calendars && makeCalendarList()}

            </div>

        </div>

    )
}

export default CalendarList;