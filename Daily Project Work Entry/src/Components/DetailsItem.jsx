// Component to render details of an item in a table
import React from 'react';

const DetailsItem = (props) => {
    // Destructuring props to get individual details
    const { date, project, dprsDescription, workHour, managementHour } = props

    // Converting date to a readable format
    let d = new Date(date).toString().split(' ')
    const Wdate = `${d[1]} ${d[2]}, ${d[3]}`

    return (
        <>
            {/* Rendering table row with item details */}
            <tr>
                {/* Rendering date, if empty then 'N/A' */}
                <td>{date === '' ? 'N/A' : Wdate}</td>
                {/* Rendering project, if empty then 'N/A' */}
                <td>{project === '' ? 'N/A' : project}</td>
                {/* Rendering description, if empty then 'N/A'. Using <pre> tag for formatting */}
                <td>
                    {dprsDescription === '' ? 'N/A' : (
                        <pre className='w-100 m-auto border' style={{ backgroundColor: '#f5f5f5', maxWidth: "600px", justifyContent: 'end' }}>
                            {/* Rendering description content with line breaks */}
                            {('\n' + dprsDescription).replace('\n', <br />).replace('[object Object]', '')}
                        </pre>
                    )}
                </td>
                {/* Rendering work hour, if empty then 'N/A' */}
                <td>{workHour === '' ? 'N/A' : workHour}</td>
                {/* Rendering management hour, if empty then 'N/A' */}
                <td>{managementHour === '' ? 'N/A' : managementHour}</td>
            </tr>
        </>
    )
}

export default DetailsItem;
