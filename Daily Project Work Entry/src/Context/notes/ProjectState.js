import React, { useState, useContext } from "react";
import globalContext from "./globalContext";
import noteContext from "./notecontext";

const ProjectState = (props) => {
  // Accessing global context
  const gContext = useContext(globalContext);
  const { showAlert } = gContext;

  // State variables
  const [projects, setProjects] = useState([]);
  const [client, setClient] = useState([]);
  const host = process.env.REACT_APP_BACKEND_HOSTING;

  // Function to capitalize first letter of a word
  const capitalized = (word) => {
    let newText = word.toLowerCase();
    return newText.charAt(0).toUpperCase() + newText.slice(1);
  }

  // Fetching projects from server
  const getProject = async () => {
    try {
      const response = await fetch(`${host}/api/project/fetchproject`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setProjects(json.project);
    } catch (error) {
      console.error('Internal Error occurred:', error);
    }
  }

  // Creating a new project
  const createProject = async (projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription) => {
    projectName = capitalized(projectName);
    try {
      const response = await fetch(`${host}/api/project/createproject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription })
      });
      await response.json();
      getProject();
      showAlert('Project Added Successfully', 'success');
    } catch (error) {
      console.error('Internal Error occurred:', error);
      showAlert('Something went wrong', 'danger');
    }
  }

  // Updating an existing project
  const updateProject = async (id, projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription) => {
    projectName = capitalized(projectName);
    try {
      const response = await fetch(`${host}/api/project/updateproject/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName, clientName, member, durationHours, durationType, limithours, technologies, projectManager, type, projectDescription })
      });
      await response.json();
      getProject();
      showAlert('Project Edited Successfully', 'success');
    } catch (error) {
      console.error('Internal Error occurred:', error);
      showAlert('Something went wrong', 'danger');
    }
  }

  // Deleting a project
  const deleteProject = async (id) => {
    try {
      const response = await fetch(`${host}/api/project/deleteproject/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      getProject();
      showAlert('Project Deleted Successfully', 'success');
    } catch (error) {
      console.error('Internal Error occurred:', error);
      showAlert('Something went wrong', 'danger');
    }
  }

  // Fetching clients from server
  const getClient = async () => {
    try {
      const response = await fetch(`${host}/api/client/fetchclient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      setClient(json.user);
    } catch (error) {
      console.error('Internal Error occurred:', error);
    }
  }

  // Creating a new client
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
      getClient();
      showAlert('Client Added Successfully', 'success');
    } catch (error) {
      console.error('Internal Error occurred:', error);
      showAlert('Something went wrong', 'danger');
    }
  }

  // Updating an existing client
  const updateClient = async (id, clientName, country, code, staus) => {
    try {
      const response = await fetch(`${host}/api/client/updateclient/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientName, country, code, staus })
      });
      await response.json();
      getClient();
      showAlert('Client Edit Successfully', 'success');
    } catch (error) {
      console.error('Internal Error occurred:', error);
      showAlert('Something went wrong', 'danger');
    }
  }

  // Deleting a client
  const deleteClient = async (id) => {
    try {
      const response = await fetch(`${host}/api/client/deleteclient/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      getClient();
      showAlert('Client Deleted Successfully', 'success');
    } catch (error) {
      console.error('Internal Error occurred:', error);
      showAlert('Something went wrong', 'danger');
    }
  }

  // Providing context values
  return (
    <noteContext.Provider value={{ projects, getProject, createProject, updateProject, deleteProject, client, createClient, getClient, updateClient, deleteClient }}>
      {props.children}
    </noteContext.Provider>
  );
}

export default ProjectState;
