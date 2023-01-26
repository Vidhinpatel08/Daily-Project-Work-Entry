import React, { useState, useContext } from 'react'
import globalContext from './globalContext';
import noteContext from "./notecontext";
const DPRSState = (props) => {
    const gContext = useContext(globalContext)
    const { showAlert } = gContext;
    const [members, setMembers] = useState([])
    const [projects, setProjects] = useState([])
    const [user, setUser] = useState()
    const [DPRS, setDPRS] = useState()

    const host = 'http://localhost:5000'


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
    const userdata = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            let json = await response.json()
            setUser(`${json.user.firstName} ${json.user.lastName}`)
        } catch (error) {
            console.error('Internal Error occure :', error)
        }
    }

    // Fetch DPRS Apis

    const getdprs = async () => {
        try {
            const response = await fetch(`${host}/api/dprs/fetchdprs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            setDPRS(json.dprs)
        } catch (error) {
            console.error('Internal Error occure :', error)
        }
    }
    const createDPRS = async (member, project, date, workHour, managementHour, inTime, outTime, dprsDescription) => {
        try {
            const response = await fetch(`${host}/api/dprs/createdprs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ member, project, date, workHour, managementHour, inTime, outTime, dprsDescription })
            });
            await response.json();
            getdprs()
            showAlert('DPRS Added Successfully', 'success')
        } catch (error) {
            console.error('Internal Error occure :', error)
            showAlert('Something when to wrong', 'danger')
        }
    }


    const updateDPRS = async (id, member, project, date, workHour, managementHour, inTime, outTime, dprsDescription) => {
        try {
            const response = await fetch(`${host}/api/dprs/updatedprs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ member, project, date, workHour, managementHour, inTime, outTime, dprsDescription })
            });
            await response.json();
            getdprs()
            showAlert('DPRS Edited Successfully', 'success')
        } catch (error) {
            console.error('Internal Error occure :', error)
            showAlert('Something when to wrong', 'danger')
        }
    }

    const updateVerifyDPRS = async (id, isVarify) => {
        try {
            const response = await fetch(`${host}/api/dprs/updatedprsverify/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isVarify })
            });
            await response.json();
            getdprs()
            showAlert('DPRS Verify Edited Successfully', 'success')
        } catch (error) {
            console.error('Internal Error occure :', error)
            showAlert('Something when to wrong', 'danger')
        }
    }


    const deleteDPRS = async (id) => {
        try {
            const response = await fetch(`${host}/api/dprs/deletedprs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await response.json();
            getdprs()
            showAlert('DPRS Deleted Successfully', 'success')
        } catch (error) {
            console.error('Internal Error occure :', error)
            showAlert('Something when to wrong', 'danger')
        }
    }


    return (
        <noteContext.Provider value={{ userdata, getMember, getProject, members, projects, user, DPRS, getdprs, createDPRS, setDPRS, updateDPRS, updateVerifyDPRS, deleteDPRS }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default DPRSState
