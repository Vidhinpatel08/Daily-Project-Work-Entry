// Importing necessary libraries and dependencies from React
import React, { useState, useContext } from 'react'
// Importing the noteContext from the specified directory
import noteContext from '../Context/notes/notecontext'

// Defining a functional component called ListItems that takes props as input
const ListItems = (props) => {
    // Destructuring props to extract required data
    const { id, project, workHour, managementHour, member, dprsDescription, inTime, outTime, date, isVarify, dprs, updatedprs } = props
    // Splitting the date to format it accordingly
    let d = new Date(date).toString().split(' ')
    // Formatting the date to the desired format
    const Wdate = `${d[1]} ${d[2]}, ${d[3]}`
    // Using useContext hook to access the context
    const context = useContext(noteContext);
    // Destructuring necessary functions from the context
    const { updateVerifyDPRS, deleteDPRS } = context;
    // Using useState hook to manage the mode state, which indicates if the item is verified
    const [mode, setMode] = useState(isVarify)

    // Function to toggle the mode state
    const toggleMode = () => {
        // Calling the updateVerifyDPRS function from the context to update the verification status
        updateVerifyDPRS(id, !mode)
        // Updating the mode state
        setMode(!mode)
    }

    // Rendering the JSX elements
    return (
        <>
            {/* Rendering table row with data */}
            <tr>
                <td>{project === '' ? 'N/A' : project}</td>
                <td>{workHour === '' ? 'N/A' : workHour}</td>
                <td>{managementHour === '' ? 'N/A' : managementHour}</td>
                <td>{member === '' ? 'N/A' : member}</td>
                <td>{dprsDescription === '' ? 'N/A' : <pre className='w-100 m-auto  border ' style={{ backgroundColor: '#f5f5f5', maxWidth: "600px", maxHeight: '300px', justifyContent: 'end' }}>{('\n' + dprsDescription).replace('\n', <br />).replace('[object Object]', '')}</pre>}</td>
                <td>{inTime === '' ? '-' : inTime}</td>
                <td>{outTime === '' ? '-' : outTime}</td>
                <td>{date === '' ? 'N/A' : Wdate}</td>
                <td>
                    {/* Rendering a switch for verifying the item */}
                    <div className="form-check form-switch d-flex justify-content-center">
                        {/* Checkbox to toggle the verification status */}
                        <input className="form-check-input border border-dark " checked={mode === true ? true : false} type="checkbox" role="switch" onChange={toggleMode} name="isActive" />
                    </div>
                </td>
                <td>
                    {/* Icons for editing and deleting the item */}
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { updatedprs(dprs) }} width="16" height="16" fill="currentColor" className="bi bi-pencil-fill mx-2" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', color: 'red' }} onClick={() => { deleteDPRS(id) }} width="16" height="16" fill="currentColor" className="bi bi-trash3-fill mx-2" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                </td>
            </tr>
        </>
    )
}

// Exporting the ListItems component as default
export default ListItems
