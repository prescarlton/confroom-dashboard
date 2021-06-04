type EventListProps = {
    events: Array<Object>
}

const EventList = ({events} : EventListProps) => {
    console.log("events:", events)
    return (
        <div>Events:</div>
    )
}

export default EventList;