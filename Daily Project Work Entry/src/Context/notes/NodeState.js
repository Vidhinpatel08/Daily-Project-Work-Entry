import React, { useState, useContext } from "react";
import globalContext from "./globalContext"; // Importing globalContext
import noteContext from "./notecontext"; // Importing noteContext

const NoteState = (props) => {
  const gContext = useContext(globalContext); // Using useContext hook to get global context
  const { showAlert } = gContext; // Destructuring showAlert from global context
  const [members, setMembers] = useState([]); // Initializing state for members
  const host = process.env.REACT_APP_BACKEND_HOSTING; // Setting host URL

  // Fetch all members
  const getMember = async () => {
    try {
      const response = await fetch(`${host}/api/member/getuser`, { // Fetching user data from the server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json(); // Parsing JSON response
      setMembers(json.user); // Updating members state with fetched data
    } catch (error) {
      console.error('Internal Error occure :', error); // Logging error if any
    }
  }

  // Add member
  const addmemberFun = async (formData) => {
    try {
      const response = await fetch(`${host}/api/member/createmember`, { // Sending POST request to create a new member
        method: 'POST',
        body: formData // Passing form data in the request body
      });
      await response.json(); // Parsing JSON response
      getMember(); // Refreshing members after addition
      showAlert('Member Added Successfully', 'success'); // Showing success alert
    } catch (error) {
      console.error('Internal Error occure :', error); // Logging error if any
      showAlert('Something when to wrong', 'danger'); // Showing danger alert
    }
  }

  // Edit a member: ID required
  const updateMember = async (id,formData) => {
    try {
      const response = await fetch(`${host}/api/member/updatemember/${id}`, { // Sending PUT request to update a member
        method: 'PUT',
        body: formData // Passing form data in the request body
      });
      await response.json(); // Parsing JSON response
      getMember(); // Refreshing members after update
      showAlert('Member Edited Successfully', 'success'); // Showing success alert
    } catch (error) {
      console.error('Internal Error occure :', error); // Logging error if any
      showAlert('Something when to wrong', 'danger'); // Showing danger alert
    }
  }

  // Delete a member
  const deleteMember = async (id) => {
    try {
      const response = await fetch(`${host}/api/member/deletemember/${id}`, { // Sending DELETE request to delete a member
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify() // Passing empty JSON object in the request body
      });
      await response.json(); // Parsing JSON response
      getMember(); // Refreshing members after deletion
      showAlert('Member Deleted Successfully', 'success'); // Showing success alert
    } catch (error) {
      console.error('Internal Error occure :', error); // Logging error if any
      showAlert('Something when to wrong', 'danger'); // Showing danger alert
    }
  }

  return (
    <noteContext.Provider value={{ members, setMembers, addmemberFun, getMember, updateMember, deleteMember }}>
      {props.children} {/* Rendering children components */}
    </noteContext.Provider>
  )
}

export default NoteState; // Exporting NoteState component
