import React, { useState, useContext } from "react";
import globalContext from "./globalContext";
import noteContext from "./notecontext";

const NoteState = (props) => {
  const gContext = useContext(globalContext)
  const { showAlert } = gContext;
  const [members, setMembers] = useState([])
  const host = 'http://localhost:5000'

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
      console.error('Internal Error occure :', error)
    }
  }

  // Add member
  const addmemberFun = async (formData) => {
    try {
      const response = await fetch(`${host}/api/member/createmember`, {
        method: 'POST',
        body: formData
        
      });
      await response.json();
      getMember()
      showAlert('Member Added Successfully', 'success')
    } catch (error) {
      console.error('Internal Error occure :', error)
      showAlert('Something when to wrong', 'danger')
    }
  }

  // Edit a Note : ID required
  const updateMember = async (id,formData) => {
    try {
      const response = await fetch(`${host}/api/member/updatemember/${id}`, {
        method: 'PUT',
        body: formData
      });
      await response.json();
      getMember()
      showAlert('Member Edited Successfully', 'success')
    } catch (error) {
      console.error('Internal Error occure :', error)
      showAlert('Something when to wrong', 'danger')
    }
  }

  // Delete a Note
  const deleteMember = async (id) => {
    try {
      const response = await fetch(`${host}/api/member/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify()
      });
      await response.json();
      getMember()
      showAlert('Member Deleted Successfully', 'success')
    } catch (error) {
      console.error('Internal Error occure :', error)
      showAlert('Something when to wrong', 'danger')
    }
  }

  return (
    <noteContext.Provider value={{ members, setMembers, addmemberFun, getMember, updateMember, deleteMember }}>
      {props.children}
    </noteContext.Provider>
  )
}


export default NoteState