import React from 'react';

const Days = ({ sevenDays, entries }) => {
    console.log("ENTRIES FROM DAYS::", entries)

    return (
        sevenDays ?
            <h1>7 Days</h1>
            :
            <h1>30 Days</h1>
    );
};

export default Days;