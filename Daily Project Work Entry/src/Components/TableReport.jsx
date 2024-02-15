import React from 'react';
// Importing SummaryItems component to display summary items
import SummaryItems from './SummaryItems';

// TableReport component receives props: memberProject, fStartDate, flastDate, totalWorkHour, totalManagementHour
const TableReport = ({ memberProject, fStartDate, flastDate, totalWorkHour, totalManagementHour }) => {
    // Function to convert date format from "YYYY-MM-DD" to "MMM DD, YYYY"
    const converter = (date) => {
        // Creating a new Date object from the given date and splitting it to an array of strings
        let d = new Date(date).toString().split(' ');
        // Returning the formatted date string
        return `${d[1]} ${d[2]}, ${d[3]}`;
    };

    // Rendering the TableReport component
    return (
        <>
            {/* Container div with border and responsive design */}
            <div className='border table-responsive p-1 mx-2 mb-5 border'>
                {/* Title displaying the activity report period */}
                <div className="mt-2 text-center fw-bold" style={{ color: '#a40df1', fontSize: "18px" }}>
                    {/* Calling the converter function to format start and end dates */}
                    {converter(fStartDate)} to {converter(flastDate)} Activity Report
                </div>
                {/* Table to display project details */}
                <table className="mt-1 table table-striped table-hover text-center w-100 align-middle p-5">
                    <thead>
                        {/* Table header */}
                        <tr className='py-2' style={{ backgroundColor: '#d9d9d9' }}>
                            <th className='w-50'>Project Name</th>
                            <th>Worked Hours</th>
                            <th>Manager Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapping through memberProject object to display project details */}
                        {Object.entries(memberProject).map(([project, hours]) => {
                            // Rendering SummaryItems component for each project
                            return <SummaryItems key={project} project={project} workHour={hours.workHour} managementHour={hours.managementHour} />;
                        })}
                        {/* Rendering total summary */}
                        <SummaryItems key={'total'} project={"Total"} workHour={totalWorkHour} managementHour={totalManagementHour} />
                    </tbody>
                </table>
            </div>
        </>
    );
};

// Exporting the TableReport component
export default TableReport;
