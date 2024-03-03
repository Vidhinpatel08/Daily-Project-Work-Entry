import React, { useState } from 'react'; // Import React and useState hook
import globalContext from './globalContext'; // Import globalContext

// Define GlobalState component
const GlobalState = (props) => {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false); // Define state for sidebarIsOpen and its setter
    const [user, setUser] = useState(); // Define state for user data
    const host = process.env.REACT_APP_BACKEND_HOSTING; // Define host URL
    const [alert, setAlert] = useState(null); // Define state for alert message

    // Function to show alert message
    const showAlert = (message, type) => {
        setAlert({ // Set alert object with message and type
            msg: message,
            type: type
        });
        setTimeout(() => { // Set timeout to clear alert after 5 seconds
            setAlert(null);
        }, 5000);
    };

    // Function to fetch user data
    const userdata = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, { // Fetch user data from server
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token') // Send token in headers
                },
            });
            let json = await response.json(); // Parse response JSON
            setUser(json.user); // Set user state with fetched data
        } catch (error) {
            console.error('Internal Error occure :', error); // Log error to console
            showAlert('Something when to wrong', 'danger'); // Show alert for error
        }
    };

    // Render the global context provider with its value
    return (
        <globalContext.Provider value={{ sidebarIsOpen, setSidebarIsOpen, user, userdata, alert, showAlert }}>
            {props.children} {/* Render children components */}
        </globalContext.Provider>
    );
};

export default GlobalState; // Export GlobalState component
