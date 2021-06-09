import moment, { Moment } from "moment";

type EventSummaryProps = {
    title: String,
    start: Moment,
    end: Moment
}

const EventSummary = ({title, start, end} : EventSummaryProps) => {

    const formatStart = moment(start).format('h:mm')
    const formatEnd = moment(end).format('h:mm')

    return (
        <div className='eventSummary'>
            <p className='eventSummary__title'>{title}</p>
            <p className='eventSummary__time'>{formatStart} to {formatEnd}</p>
        </div>
    )
}

export default EventSummary;