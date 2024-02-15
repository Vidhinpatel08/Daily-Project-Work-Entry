// Importing necessary modules and components from React and the note context
import React, { useContext } from 'react';
import noteContext from '../Context/notes/notecontext';

// Defining the MemberItem component which takes props as input
const MemberItem = (props) => {

    // Destructuring props to extract individual properties
    const { firstName, lastName, email, userRole, phone, department, isActive, joindate, updateNote, member } = props;
    
    // Setting username to the value of email
    let username = email;
    
    // Accessing the deleteMember function from the note context
    const context = useContext(noteContext);
    const { deleteMember } = context;
    
    // Converting the join date to a more readable format
    let d = new Date(joindate).toString().split(' ');
    const joiningDate = `${d[1]} ${d[2]}, ${d[3]}`;
    
    // Rendering the JSX elements for displaying member information
    return (
        <>
            <tr>
                {/* Displaying first name and last name, or 'N/A' if either is empty */}
                <td>{firstName === '' ? 'N/A' : `${firstName} ${lastName}`}</td>
                {/* Displaying the username, or 'N/A' if empty */}
                <td>{username === '' ? 'N/A' : username}</td>
                {/* Displaying the email, or 'N/A' if empty */}
                <td>{email === '' ? 'N/A' : email}</td>
                {/* Displaying the phone number, or 'N/A' if empty */}
                <td>{phone === '' ? 'N/A' : phone}</td>
                {/* Displaying the department, or 'N/A' if empty */}
                <td>{department === '' ? 'N/A' : department}</td>
                {/* Displaying the join date, or 'N/A' if empty */}
                <td>{joindate === '' ? 'N/A' : joiningDate}</td>
                {/* Displaying whether the member is active with a checkmark or 'X' */}
                <td>{isActive === true ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>}</td>
                {/* Displaying the user's role */}
                <td>{userRole}</td>
                {/* Editing and deleting buttons with corresponding SVG icons */}
                <td>
                    {/* Editing button with pencil icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { updateNote(member) }} width="16" height="16" fill="currentColor" className="bi bi-pencil-fill mx-2" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                    {/* Deleting button with trash icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer', color: 'red' }} onClick={() => { deleteMember(member._id) }} width="16" height="16" fill="currentColor" className="bi bi-trash3-fill mx-2" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                </td>
            </tr>
        </>
    )
}

// Exporting the MemberItem component as default
export default MemberItem;
