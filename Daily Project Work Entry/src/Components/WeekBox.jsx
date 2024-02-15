// Importing necessary modules and dependencies
import React, { useContext } from 'react'; // Importing React and useContext hook from 'react' library
import globalContext from '../Context/notes/globalContext'; // Importing globalContext from its file location

// WeekBox functional component
const WeekBox = (props) => {
  // Using useContext hook to access global context
  const gContext = useContext(globalContext); // Initializing gContext with the global context
  const { sidebarIsOpen } = gContext; // Destructuring sidebarIsOpen from gContext
  const { StartDate, lastDate, workHour, managementHour } = props; // Destructuring props

  // Function to format dates
  const dates = (date) => {
    let d = new Date(date).toString().split(' '); // Converting date string to Date object and splitting
    return `${d[2]}-${d[1]}`; // Formatting date
  };

  // Function to convert minutes to time format (HH:MM)
  const minutesToTime = (minutes) => {
    let h = Math.floor(minutes / 60); // Calculating hours
    let m = minutes % 60; // Calculating remaining minutes
    h = h < 10 ? '0' + h : h; // Adding leading zero if hours < 10
    m = m < 10 ? '0' + m : m; // Adding leading zero if minutes < 10
    return h + ':' + m; // Returning formatted time string
  };

  let styleColor; // Declaring variable to hold background color

  // Determining background color based on workHour
  if (workHour === 0) {
    styleColor = 'white'; // Setting background color to white if workHour is 0
  } else if (workHour <= 2000) {
    styleColor = 'rgb(239 239 239)'; // Setting background color based on workHour range
  } else if (workHour <= 5000) {
    styleColor = 'rgb(237 237 237)';
  } else if (workHour <= 8000) {
    styleColor = 'rgb(234 234 234)';
  } else {
    styleColor = 'rgb(225 225 225)';
  }

  // Rendering WeekBox component
  return (
    <>
      {/* WeekBox container with dynamic styles */}
      <div className='border text-center px-1 py-3 my-1 rounded' style={{ width: sidebarIsOpen ? '154px' : '170px', fontFamily: "sans-serif", backgroundColor: styleColor }}>
        {/* Displaying StartDate and lastDate */}
        <div className='fw-bold pb-1'>{dates(StartDate)} ~ {dates(lastDate)}</div>
        {/* Displaying workHour in time format */}
        <div>WH - {minutesToTime(workHour)}</div>
        {/* Displaying managementHour in time format */}
        <div>MH - {minutesToTime(managementHour)}</div>
      </div>
    </>
  );
}

// Exporting WeekBox component
export default WeekBox;
