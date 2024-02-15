import React, { useContext } from 'react'; // Importing React and useContext hook from react library
import globalContext from '../Context/notes/globalContext'; // Importing globalContext from the specified path

const WorkSummaryBox = (props) => { // Creating a functional component named WorkSummaryBox which takes props as input
    const gContext = useContext(globalContext); // Assigning the value of globalContext to gContext using useContext hook
    const { sidebarIsOpen } = gContext; // Destructuring sidebarIsOpen from gContext
    const { date, entry, workHour, managementHour } = props; // Destructuring date, entry, workHour, and managementHour from props

    const day = (date) => { // Defining a function named day which takes date as input
        let dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Creating an array named dayList with days of the week
        let d = new Date(date).getDay(); // Getting the day of the week from the given date
        if (date === 'Week') { return 'Week Days'; } // Returning 'Week Days' if the date is 'Week'
        return dayList[d]; // Returning the day of the week based on the index obtained from the date
    };

    const formateDate = (date) => { // Defining a function named formateDate which takes date as input
        if (date === 'Week') { return date; } // Returning the date if it is 'Week'
        let d = new Date(date).toString().split(' '); // Converting the date to a string and splitting it
        return `${d[2]}-${d[1]}`; // Returning the formatted date in 'dd-MMM' format
    };

    const minutesToTime = (minutes) => { // Defining a function named minutesToTime which takes minutes as input
        let h = Math.floor(minutes / 60); // Calculating hours from minutes
        let m = minutes % 60; // Calculating remaining minutes
        h = h < 10 ? '0' + h : h; // Adding leading zero if hours is less than 10
        m = m < 10 ? '0' + m : m; // Adding leading zero if minutes is less than 10
        return h + ':' + m; // Returning the time in 'hh:mm' format
    };

    let styleColor; // Declaring a variable named styleColor

    if (workHour === 0) { // Checking if workHour is equal to 0
        styleColor = 'white'; // Assigning 'white' to styleColor
    } else if (workHour <= 6000) { // Checking if workHour is less than or equal to 6000
        styleColor = 'rgb(239 239 239)'; // Assigning 'rgb(239 239 239)' to styleColor
    } else if (workHour <= 12000) { // Checking if workHour is less than or equal to 12000
        styleColor = '#ededed'; // Assigning '#ededed' to styleColor
    } else if (workHour <= 18000) { // Checking if workHour is less than or equal to 18000
        styleColor = 'rgb(234 234 234)'; // Assigning 'rgb(234 234 234)' to styleColor
    } else { // Executed if none of the above conditions are met
        styleColor = 'rgb(225 225 225)'; // Assigning 'rgb(225 225 225)' to styleColor
    }

    let wpd = 480; // Assigning 480 to variable wpd
    let defaultMH = date === 'Week' ? minutesToTime(managementHour) : '27:00'; // Assigning '27:00' to defaultMH if date is 'Week', otherwise assigning formatted managementHour

    return ( // Returning JSX elements
        <>
            <div className='border text-center px-4 py-2 my-1 rounded' style={{ width: sidebarIsOpen ? '150px' : '170px', fontFamily: "sans-serif", backgroundColor: styleColor }}>
                <div className='fw-bold '>{formateDate(date)} ({entry})</div>
                <div className='py-1'>({day(date)})</div>
                <div>{minutesToTime(workHour)}/{minutesToTime(wpd * entry)}</div>
                <div>{minutesToTime(managementHour)}/{defaultMH}</div>
            </div>
        </>
    );
};

export default WorkSummaryBox; // Exporting the WorkSummaryBox component as default
