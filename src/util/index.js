/* will only be used until Django API is implemented */
export const parseRoomInfo = (roomSummary) => {
    // create regex to remove room location and conference phone info
    const extraWordsRegex = /(Charleston, SC-[\d]-)|(\[(Conference Phone, )?VTC])|(\([\d]+\))/i;
    const confPhoneInfoRegex = RegExp(/(\[(Conference Phone, )?VTC])/);
    const roomSizeRegex = /\([\d]+\)/i;
    const roomSize = roomSummary.match(roomSizeRegex);
    // use optional chaining to access the first match for confPhoneInfo, if it exists
    const confPhoneInfo = confPhoneInfoRegex.exec(roomSummary)?.[0];;
    const roomName = roomSummary.replace(new RegExp(extraWordsRegex, 'gi'), '')

    return {
        roomSize,
        roomName,
        confPhoneInfo
    }

}