import React, { useState, useContext } from 'react'; // Importing necessary modules from React
import globalContext from './globalContext'; // Importing globalContext
import noteContext from "./notecontext"; // Importing noteContext

const DPRSState = (props) => { // Defining functional component DPRSState with props
    const gContext = useContext(globalContext); // Using globalContext with useContext hook
    const { showAlert } = gContext; // Destructuring showAlert from globalContext
    const [members, setMembers] = useState([]); // Using useState hook for members state
    const [projects, setProjects] = useState([]); // Using useState hook for projects state
    const [user, setUser] = useState(); // Using useState hook for user state
    const [DPRS, setDPRS] = useState(); // Using useState hook for DPRS state

    const host = 'http://localhost:5000'; // Setting host variable

    // Function to fetch members
    const getMember = async () => {
        try {
            const response = await fetch(`${host}/api/member/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setMembers(json.user);
        } catch (error) {
            console.error('Internal Error occure :', error);
        }
    };

    // Function to fetch projects
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
            console.error('Internal Error occure :', error);
        }
    };

    // Function to fetch user data
    const userdata = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });
            let json = await response.json();
            setUser(`${json.user.firstName} ${json.user.lastName}`);
        } catch (error) {
            console.error('Internal Error occure :', error);
        }
    };

    // Function to fetch DPRS
    const getdprs = async () => {
        try {
            const response = await fetch(`${host}/api/dprs/fetchdprs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setDPRS(json.dprs);
        } catch (error) {
            console.error('Internal Error occure :', error);
        }
    };

    // Function to create DPRS
    const createDPRS = async (member, project, date, workHour, managementHour, inTime, outTime, dprsDescription) => {
        try {
            const response = await fetch(`${host}/api/dprs/createdprs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ member, project, date, workHour, managementHour, inTime, outTime, dprsDescription }),
            });
            await response.json();
            getdprs();
            showAlert('DPRS Added Successfully', 'success');
        } catch (error) {
            console.error('Internal Error occure :', error);
            showAlert('Something when to wrong', 'danger');
        }
    };

    // Function to update DPRS
    const updateDPRS = async (id, member, project, date, workHour, managementHour, inTime, outTime, dprsDescription) => {
        try {
            const response = await fetch(`${host}/api/dprs/updatedprs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ member, project, date, workHour, managementHour, inTime, outTime, dprsDescription }),
            });
            await response.json();
            getdprs();
            showAlert('DPRS Edited Successfully', 'success');
        } catch (error) {
            console.error('Internal Error occure :', error);
            showAlert('Something when to wrong', 'danger');
        }
    };

    // Function to update verified DPRS
    const updateVerifyDPRS = async (id, isVarify) => {
        try {
            const response = await fetch(`${host}/api/dprs/updatedprsverify/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isVarify }),
            });
            await response.json();
            getdprs();
            showAlert('DPRS Verify Edited Successfully', 'success');
        } catch (error) {
            console.error('Internal Error occure :', error);
            showAlert('Something when to wrong', 'danger');
        }
    };

    // Function to delete DPRS
    const deleteDPRS = async (id) => {
        try {
            const response = await fetch(`${host}/api/dprs/deletedprs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await response.json();
            getdprs();
            showAlert('DPRS Deleted Successfully', 'success');
        } catch (error) {
            console.error('Internal Error occure :', error);
            showAlert('Something when to wrong', 'danger');
        }
    };

    // Providing values to noteContext.Provider
    return (
        <noteContext.Provider value={{ userdata, getMember, getProject, members, projects, user, DPRS, getdprs, createDPRS, setDPRS, updateDPRS, updateVerifyDPRS, deleteDPRS }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default DPRSState; // Exporting DPRSState component
