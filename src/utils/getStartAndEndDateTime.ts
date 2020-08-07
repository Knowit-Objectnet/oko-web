// Function to get start and end times/dates suitable for new events
export const getStartAndEndDateTime: () => { start: Date; end: Date } = () => {
    // Date object for creating other date objects
    const date = new Date();
    // Date object for getting time and date now
    const now = new Date();

    // Max and min of opening time range
    const min = new Date(date.setHours(7, 0));
    const max = new Date(date.setHours(20, 0));

    // Round up to the closest quarter of an hour
    const startMinutes = (Math.ceil((now.getMinutes() + 1) / 15) * 15) % 60;
    // Round to the correct hour depending on the rounding of minutes
    const startHours = (((startMinutes / 105 + 0.5) | 0) + now.getHours()) % 24;
    // Set the start and date range for new event
    let start = new Date(date.setHours(startHours, startMinutes));
    let end = new Date(date.setHours(startHours + 1, startMinutes));

    // if the time now is less than the allowed minimum then set the start to minimum
    if (now < min) {
        start = min;
        // If the time now is less than one hour behind max then set end to max
    } else if (now.getHours() === max.getHours() - 1) {
        end = max;
        // If the time now is more than the allowed maximum then set the end to maximum
    } else if (now > max) {
        start = min;
        end = max;
    }

    return { start, end };
};
