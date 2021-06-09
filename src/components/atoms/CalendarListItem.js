import { Link } from 'react-router-dom';
import { parseRoomInfo } from '../../util';

const CalendarListItem = (props) => {
    console.log(props)
    const { roomName, roomSize, confPhoneInfo } = parseRoomInfo(props.summary);

    return (
        <Link to={`/cal/${props.id}`} className='calendarList__item'>
            <p className='roomName'>{roomName}</p>
            <p className='roomSize'>{roomSize} people</p>
            <p className='phoneInfo'>{confPhoneInfo}</p>
        </Link>

    )
}

export default CalendarListItem;