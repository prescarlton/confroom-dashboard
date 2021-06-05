type CalendarListProps = {
    calendars: Array<Object>
}

const CalendarList = ({calendars} : CalendarListProps) => {
    console.log("Calendars:", calendars)
    return (
        <div>Calendars:</div>
    )
}

export default CalendarList;