import React, { useState } from 'react'
import globalContext from './globalContext'

const GlobalState = (props) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
    const [user, setUser] = useState()
    const host = 'http://localhost:5000'

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
            // setUserProfile(json.user)
        } catch (error) {
            console.log('Internal Error occure')
        }
    }
    return (
        <globalContext.Provider value={{ sidebarIsOpen, setSidebarIsOpen, user, userdata }}>
            {props.children}
        </globalContext.Provider>

    )
}

export default GlobalState
