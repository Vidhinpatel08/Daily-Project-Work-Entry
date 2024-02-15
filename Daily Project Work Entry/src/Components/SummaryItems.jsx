import React from 'react';

// Component to render summary items
const SummaryItems = (props) => {
    // Destructuring props to get project, workHour, and managementHour
    const { project, workHour, managementHour } = props;

    // Function to convert minutes to time format (hh:mm)
    const minutesToTime = (minutes) => {
        let h = Math.floor(minutes / 60); // Calculate hours
        let m = minutes % 60; // Calculate remaining minutes
        h = h < 10 ? '0' + h : h; // Add leading zero if hour is less than 10
        m = m < 10 ? '0' + m : m; // Add leading zero if minutes are less than 10
        return h + ':' + m; // Return formatted time string
    };

    // JSX to render summary item
    return (
        <>
            {/* Conditional class assignment based on project name */}
            <tr className={`${project}` === 'Total' ? 'fw-bold' : ''}>
                {/* Render project name, display 'N/A' if project is empty */}
                <td className='w-50'>{project === '' ? 'N/A' : project}</td>
                {/* Render work hour converted to time format */}
                <td>{minutesToTime(workHour)}</td>
                {/* Render management hour converted to time format */}
                <td>{minutesToTime(managementHour)}</td>
            </tr>
        </>
    );
};

export default SummaryItems;
