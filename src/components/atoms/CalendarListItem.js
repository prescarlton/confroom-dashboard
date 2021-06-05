const CalendarListItem = (props) => {
    console.log(props)
    // create regex to remove room location and conference phone info
    const extraWordsRegex = /(Charleston, SC-[\d]-)|(\[(Conference Phone, )?VTC])|(\([\d]+\))/i;
    const confPhoneInfoRegex = RegExp(/(\[(Conference Phone, )?VTC])/);
    const roomSizeRegex = /\([\d]+\)/i;
    const roomSize = props.summary.match(roomSizeRegex);
    const confPhoneInfo = confPhoneInfoRegex.exec(props.summary);
    let roomName = props.summary.replace(new RegExp(extraWordsRegex, 'gi'), '')
    const conferencePhoneOptions = () => {
        // use optional chaining to access the first match for confPhoneInfo, if it exists
        return confPhoneInfo?.[0];
    }
    return (
        <div className='calendarList__item'>
            <p className='roomName'>{roomName}</p>
            <p className='roomSize'>{roomSize} people</p>
            <p className='phoneInfo'>{conferencePhoneOptions()}</p>
        </div>
    )
}

export default CalendarListItem;