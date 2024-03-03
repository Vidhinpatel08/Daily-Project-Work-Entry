// Import necessary modules from React
import React, { useEffect, useState, useContext } from 'react';
// Import Link component from react-router-dom
import { Link } from 'react-router-dom';
// Import globalContext from '../Context/notes/globalContext'
import globalContext from '../Context/notes/globalContext';

// Define the functional component Navbar
const Navbar = (props) => {
    // Extract showAlert function from globalContext
    const gContext = useContext(globalContext);
    const { showAlert } = gContext;
    // Initialize state variables for user profile data and image
    const [userProfile, setUserProfile] = useState({ _id: '', firstName: '', lastName: '', email: '', userRole: '', joindate: '', phone: '', userDesignation: '', alterPhone: '', alterEmail: '', department: '', LeaveStartDate: '', LeaveEndDate: '', password: '', isActive: '' });
    const [image, setImage] = useState('');
    // Define constants for host URL and image URL
    const Host = process.env.REACT_APP_BACKEND_HOSTING;
    const imageURL = `${Host}/uploads/`;

    // Define an asynchronous function to fetch user data
    const userdata = async () => {
        try {
            const response = await fetch(`${Host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            let json = await response.json();
            // Set user profile data and image in state variables
            setUserProfile(json.user);
            setImage(json.user.profile);
        } catch (error) {
            // Show alert in case of internal error
            showAlert('Internal Error occured', 'danger');
        }
    };

    // Initialize state variable for login status
    const [islogin, setIsLogin] = useState(true);
    useEffect(() => {
        // Check if token exists in localStorage
        if (localStorage.getItem('token')) {
            // Call userdata function if token exists
            userdata();
            // Set isLogin to true
            setIsLogin(true);
        } else {
            // Set isLogin to false if token doesn't exist
            setIsLogin(false);
        }
        // eslint-disable-next-line
    }, []);

    // Define function to handle user logout
    const handlelogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        // Clear user profile data
        setUserProfile('');
        // Show logout success alert
        showAlert("Logout Successfully", 'success');
    };

    // Return JSX for the Navbar component
    return (
        <>
            <nav className="navbar bg-primary sticky-top d-flex" id='nav-container' data-bs-theme="dark" style={{ color: 'white' }}>
                <div className="d-flex m-1 w-100">
                    <div className="px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-grid-3x3-gap-fill align-items-center" viewBox="0 0 16 16">
                            <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" />
                        </svg>
                    </div>
                    <div className="px-2">
                        <label className='fw-bold fs-5' style={{ fontFamily: 'emoji' }} > Daily Project Work Entry</label>
                    </div>
                    {islogin && (
                        <div className="ms-auto px-2 d-flex">
                            <div className="dropdown px-4 mx-2">
                                <Link to="/userprofile" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={typeof (image) === 'string' ? ((userProfile.profile === null || userProfile.profile === undefined) ? `${imageURL}img/online-learning.jpg` : `${imageURL}${userProfile.profile}`) : URL.createObjectURL(image)} width="32" height="32" className="rounded-circle mx-2 border border-dark" alt="ProfilePicture" />
                                    <strong style={{ color: 'white', fontFamily:'sans-serif', fontSize:'18px' }}>{userProfile.firstName} {userProfile.lastName}</strong>
                                </Link>
                                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                                    <li className='d-flex align-items-center px-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-key-fill" viewBox="0 0 16 16">
                                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                        </svg>
                                        <Link className="dropdown-item" to="/forgetpassword">Change Password</Link>
                                    </li>
                                    <li className='d-flex align-items-center px-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        </svg>
                                        <Link className="dropdown-item" to="/userprofile">Profile</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className='d-flex align-items-center px-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-power " viewBox="0 0 16 16">
                                            <path d="M7.5 1v7h1V1h-1z" />
                                            <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                                        </svg>
                                        <Link className="dropdown-item" to='/login' onClick={handlelogout}>Sign out</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

// Export the Navbar component as default
export default Navbar;
