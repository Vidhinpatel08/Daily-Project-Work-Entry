import React, { useEffect, useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import globalContext from '../Context/notes/globalContext';

const Navbar = (props) => {
    const gContext = useContext(globalContext)
    const { showAlert } = gContext;
    const [userProfile, setUserProfile] = useState({ _id: '', firstName: '', lastName: '', email: '', userRole: '', joindate: '', phone: '', userDesignation: '', alterPhone: '', alterEmail: '', department: '', LeaveStartDate: '', LeaveEndDate: '', password: '', isActive: '' })
    const [image, setImage] = useState('')
    const Host = 'http://localhost:5000'
    const imageURL = 'http://localhost:5000/uploads/'

    const userdata = async () => {
        try {
            const response = await fetch(`${Host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            let json = await response.json()
            setUserProfile(json.user)
            setImage(json.user.profile)
        } catch (error) {
            showAlert('Internal Error occure','danger')
        }
    }
    const [islogin, setIsLogin] = useState(true)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            userdata()
            setIsLogin(true)
        }
        else {
            setIsLogin(false)
        }
        // eslint-disable-next-line
    }, [])


    const handlelogout = () => {
        localStorage.removeItem('token')
        setUserProfile('')
        showAlert("Logout Successfully", 'success')
    }
    return (
        <>
            <nav className="navbar bg-primary sticky-top  d-flex " id='nav-container' data-bs-theme="dark" style={{ color: 'white' }}>

                <div className="d-flex m-1 w-100">
                    <div className="px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-grid-3x3-gap-fill align-items-center" viewBox="0 0 16 16">
                            <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" />
                        </svg>
                    </div>
                    <div className="px-2">
                        <label className='fw-bold fs-5' style={{ fontFamily: 'emoji' }} > Daily Project Work Entry</label>
                    </div>
                    {islogin &&
                        <div className="ms-auto px-2 d-flex">
                            <div className="dropdown px-4 mx-2">
                                <Link to="/userprofile" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={typeof (image) === 'string' ? ((userProfile.profile === null || userProfile.profile === undefined) ? `${imageURL}img/online-learning.jpg` : `${imageURL}${userProfile.profile}`) : URL.createObjectURL(image)} width="32" height="32" className="rounded-circle mx-2 border border-dark" alt="ProfilePicture" />
                                    <strong style={{ color: 'white', fontFamily:'sans-serif', fontSize:'18px' }}>{userProfile.firstName} {userProfile.lastName} </strong>
                                </Link>
                                <ul className="dropdown-menu text-small shadow " aria-labelledby="dropdownUser2">
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
                                        <Link className="dropdown-item" to='/login' onClick={(handlelogout)}>Sign out</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>}
                </div>
            </nav>


        </>
    )
}

export default Navbar

