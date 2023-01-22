import React, { useState } from "react";
import noteContext from "./notecontext";

const NoteState = (props) => {
  // const { showAlert } = props;
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
      console.log('Internal Error occure')
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
      // showAlert('Added Successfully', 'success')
      // console.log('Added Successfully')
    } catch (error) {
      // showAlert('Internal Error occure', 'danger')
      console.log('Internal Error occure')
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
      // showAlert('Edited Successfully', 'success')
      console.log('Edited Successfully')
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
          // change hardcode token 
        },
        body: JSON.stringify()
      });
      await response.json();
      getMember()
    } catch (error) {
      // showAlert('Internal Error occure', 'danger')
      console.log('Internal Error occure')
    }
  }

  return (
    <noteContext.Provider value={{ members, setMembers, addmemberFun, getMember, updateMember, deleteMember }}>
      {props.children}
    </noteContext.Provider>
  )
}


export default NoteState