import React, { useState } from 'react'
import noteContext from "./notecontext";
const DPRSState = (props) => {
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
            console.log('Internal Error occure')
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
            console.error(error)
            console.log('Internal Error occure')
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
            // setUserProfile(json.user)
        } catch (error) {
            console.log('Internal Error occure')
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
            console.error(error)
            console.log('Internal Error occure')
        }
    }
    const createDPRS = async (member, project, date, workHour, managementHour, inTime, outTime, dprsDescription) => {
        try {
            const response = await fetch(`${host}/api/dprs/createdprs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ member, project, date, workHour, managementHour, inTime, outTime, dprsDescription })
            });
            await response.json();
            getdprs()
            // showAlert('Added Successfully', 'success')
            console.log('Added Successfully')
        } catch (error) {
            // showAlert('Internal Error occure', 'danger')
            console.error(error)
            console.log('Internal Error occure')
        }
    }

    return (
        <noteContext.Provider value={{ userdata, getMember, getProject, members, projects, user, DPRS, getdprs, createDPRS, setDPRS }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default DPRSState
