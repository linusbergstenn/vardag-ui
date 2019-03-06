import React from 'react';

const DayView = (props) => {
    let day = props.date;
    console.log('date dayview sliced:', day.toLocaleString().slice(0, 10));
    let weekdayString = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];
    let navigation = weekdayString.map()
    return(
        <div className={'day-container'}>
            <h1>{}</h1>
        </div>
    );
};
export default DayView;