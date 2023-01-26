import React, { useState, useContext } from "react";
import globalContext from "./globalContext";
import noteContext from "./notecontext";

const ProjectState = (props) => {
  const gContext = useContext(globalContext)
  const { showAlert } = gContext;
  const [projects, setProjects] = useState([])
  const [client, setClient] = useState([])
  const host = 'http://localhost:5000'
  const capitalized = (word) => {
    let newText = word.toLowerCase()
    return newText.charAt(0).toUpperCase() + newText.slice(1)
  }

  const getProject = async () => {
    try {
      const response = await fetch(`${host}/api/project/fetchproject`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setProjects(json.project)
    } catch (error) {
      console.error('Internal Error occure :', error)
    }
  }

  // create Project
  const createProject = async (projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription) => {
    projectName = capitalized(projectName)
    try {
      const response = await fetch(`${host}/api/project/createproject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription })
      });
      await response.json();
      getProject()
      showAlert('Project Added Successfully', 'success')
    } catch (error) {
      console.error('Internal Error occure :', error)
      showAlert('Something when to wrong', 'danger')
    }
  }

  const updateProject = async (id, projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription) => {
    projectName = capitalized(projectName)
    try {
      const response = await fetch(`${host}/api/project/updateproject/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription })
      });
      await response.json();
      getProject()
      showAlert('Project Edited Successfully', 'success')
    } catch (error) {
      console.error('Internal Error occure :', error)
      showAlert('Something when to wrong', 'danger')
    }

  }
  const deleteProject = async (id) => {
    try {
      const response = await fetch(`${host}/api/project/deleteproject/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      getProject()
      showAlert('Peoject Deleted Successfully', 'success')
    } catch (error) {
      console.error('Internal Error occure :', error)
      showAlert('Something when to wrong', 'danger')
    }
  }


  const getClient = async () => {
    try {
      const response = await fetch(`${host}/api/client/fetchclient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setClient(json.user)
    } catch (error) {
      console.error('Internal Error occure :', error)
    }
  }


  const createClient = async (clientName, country, code, staus) => {
    try {
      const response = await fetch(`${host}/api/client/createclient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientName, country, code, staus })
      });
      await response.json();
      getClient()
      showAlert('Client Added Successfully', 'success')
    } catch (error) {
      console.error('Internal Error occure :', error)
      showAlert('Something when to wrong', 'danger')
    }
  }


  const updateClient = async (id,clientName, country, code, staus) => {
    try {
      const response = await fetch(`${host}/api/client/updateclient/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientName, country, code, staus })
      });
      await response.json();
      getClient()
      showAlert('Client Edit Successfully', 'success')
    } catch (error) {
      console.error('Internal Error occure :', error)
      showAlert('Something when to wrong', 'danger')
    }
  }


  const deleteClient = async (id) => {
    try {
      const response = await fetch(`${host}/api/client/deleteclient/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      getClient()
      showAlert('Client Deleted Successfully', 'success')
    } catch (error) {
      console.error('Internal Error occure :', error)
      showAlert('Something when to wrong', 'danger')
    }
  }

  return (
    <noteContext.Provider value={{ projects, getProject, createProject, updateProject, deleteProject, client, createClient, getClient, updateClient, deleteClient }}>
      {props.children}
    </noteContext.Provider>

  )
}

export default ProjectState
