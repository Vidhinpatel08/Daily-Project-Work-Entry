import React, { useState } from 'react'
import globalContext from './globalContext'

const GlobalState = (props) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
    const [user, setUser] = useState()
    const host = 'http://localhost:5000'
    const [alert, setAlert] = useState(null)

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 2000);
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
            setUser(json.user)
        } catch (error) {
            console.error('Internal Error occure :', error)
            showAlert('Something when to wrong', 'danger')
        }
    }
    return (
        <globalContext.Provider value={{ sidebarIsOpen, setSidebarIsOpen, user, userdata, alert, showAlert }}>
            {props.children}
        </globalContext.Provider>

    )
}

export default GlobalState
