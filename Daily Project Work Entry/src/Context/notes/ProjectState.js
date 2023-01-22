import React, { useState } from "react";
import noteContext from "./notecontext";

const ProjectState = (props) => {

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
      console.error(error)
      console.log('Internal Error occure')
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
          // 'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription })
      });
      await response.json();
      getProject()
      // showAlert('Added Successfully', 'success')
      // console.log('Added Successfully')
    } catch (error) {
      // showAlert('Internal Error occure', 'danger')
      console.error(error)
      console.log('Internal Error occure')
    }
  }

  const updateProject = async (id, projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription) => {
    projectName = capitalized(projectName)
    try {
      const response = await fetch(`${host}/api/project/updateproject/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription })
      });
      await response.json();
      getProject()
      // showAlert('Added Successfully', 'success')
      // console.log('Edit Successfully')

    } catch (error) {
      console.error(error)
      console.log('Internal Error occure')
    }

  }
  const deleteProject = async (id) => {
    try {
      const response = await fetch(`${host}/api/project/deleteproject/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'auth-token': localStorage.getItem('token')
        },
      });
      await response.json();
      getProject()
      // showAlert('Added Successfully', 'success')
      // console.log('Deleted Successfully')

    } catch (error) {
      console.error(error)
      console.log('Internal Error occure')
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
      console.error(error)
      console.log('Internal Error occure')
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
    } catch (error) {
      console.error(error)
      console.log('Internal Error occure')
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
      // showAlert('Added Successfully', 'success')
      console.log('Edit Successfully')
    } catch (error) {
      console.error(error)
      console.log('Internal Error occure')
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
      // showAlert('Added Successfully', 'success')
      console.log('Deleted Successfully')
    } catch (error) {
      console.error(error)
      console.log('Internal Error occure')
    }
  }

  return (
    <noteContext.Provider value={{ projects, getProject, createProject, updateProject, deleteProject, client, createClient, getClient, updateClient, deleteClient }}>
      {props.children}
    </noteContext.Provider>

  )
}

export default ProjectState
