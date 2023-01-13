import React, { useState } from "react";
import noteContext from "./notecontext";

const NoteState = (props) => {
  const [members, setMembers] = useState([])
  // const { showAlert } = props;
  const host = 'http://localhost:5000'

  const capitalized = (word) => {
    let newText = word.toLowerCase()
    return newText.charAt(0).toUpperCase() + newText.slice(1)
  }

  // fetch all Note 
  const getMember = async () => {
    try {
      const response = await fetch(`${host}/api/member/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setMembers(json.user)
    } catch (error) {
      console.log('Internal Error occure')
    }
  }

  // Add member
  const addmemberFun = async (firstName, lastName, email, userRole, phone, userDesignation, alterPhone, alterEmail, department, password, isActive, joindate, LeaveStartDate, LeaveEndDate, profile,) => {
    firstName = capitalized(firstName)
    lastName = capitalized(lastName)
    try {
      const response = await fetch(`${host}/api/member/createmember`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ firstName, lastName, email, userRole, phone, userDesignation, alterPhone, alterEmail, department, password, isActive, joindate, LeaveStartDate, LeaveEndDate, profile })
      });
      await response.json();
      getMember()
      // showAlert('Added Successfully', 'success')
      // console.log('Added Successfully')
    } catch (error) {
      // showAlert('Internal Error occure', 'danger')
      console.log('Internal Error occure')
    }
  }

  // Edit a Note : ID required
  const updateMember = async (id, firstName, lastName, email, userRole, joindate, phone, userDesignation, alterPhone, alterEmail, department, LeaveStartDate, LeaveEndDate, password, profile, isActive) => {
    firstName = capitalized(firstName)
    lastName = capitalized(lastName)
    try {
      const response = await fetch(`${host}/api/member/updatemember/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'auth-token': localStorage.getItem('token')
          // change hardcode token 
        },
        body: JSON.stringify({ firstName, lastName, email, userRole, joindate, phone, userDesignation, alterPhone, alterEmail, department, LeaveStartDate, LeaveEndDate, password, profile, isActive })
      });
      await response.json();
      getMember()
      // showAlert('Edited Successfully', 'success')
      // console.log('Edited Successfully')
    } catch (error) {
      // showAlert('Internal Error occure', 'danger')
      console.log('Internal Error occure')
    }
  }

  // Delete a Note
  const deleteMember = async (id) => {
    try {
      const response = await fetch(`${host}/api/member/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'auth-token': localStorage.getItem('token')
          // change hardcode token 
        },
        body: JSON.stringify()
      });
      await response.json();
      getMember()
      // showAlert('Deleted Successfully', 'success')
      // console.log('Deleted Successfully')
    } catch (error) {
      // showAlert('Internal Error occure', 'danger')
      console.log('Internal Error occure')
    }
  }

  return (
    <noteContext.Provider value={{ members, setMembers, addmemberFun, getMember, updateMember, deleteMember }}>
      {props.children};
    </noteContext.Provider>
  )
}


export default NoteState



