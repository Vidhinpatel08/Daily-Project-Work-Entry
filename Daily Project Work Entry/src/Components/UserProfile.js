// Importing necessary modules and styles
import './css/style.css';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import globalContext from '../Context/notes/globalContext';

// UserProfile functional component definition
const UserProfile = () => {
    // Accessing global context
    const gContext = useContext(globalContext);
    const { showAlert } = gContext;

    // State variables initialization
    const [userProfile, setUserProfile] = useState({ _id: '', firstName: '', lastName: '', email: '', userRole: '', joindate: '', phone: '', userDesignation: '', alterPhone: '', alterEmail: '', department: '', LeaveStartDate: '', LeaveEndDate: '', password: '', isActive: '' });
    const [image, setImage] = useState('');
    
    // Navigation hook
    const navigate = useNavigate();
    
    // Host and image URL declaration
    const Host = process.env.REACT_APP_BACKEND_HOSTING;
    const imageURL = `${Host}/uploads/`;

    // Fetching user data from the server
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
            setUserProfile(json.user);
            setImage(json.user.profile);
        } catch (error) {
            showAlert('Internal Error occurred', 'danger');
        }
    };

    // Function to update user details
    const updateMember = async (id, firstName, lastName, phone) => {
        try {
            const response = await fetch(`${Host}/api/member/updatemember/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, phone })
            });
            await response.json();
            showAlert('User Details Edited Successfully', 'success');
        } catch (error) {
            showAlert('Internal Error occurred', 'danger');
        }
    };

    // Effect hook to fetch user data on component mount
    useEffect(() => {
        if (localStorage.getItem('token')) {
            userdata();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    // Handling form submission for updating user details
    const handleAddSubmit = (e) => {
        e.preventDefault();
        updateMember(userProfile._id, userProfile.firstName, userProfile.lastName, userProfile.phone);
        userdata();
    };

    // Handling input change
    const onchange = (e) => {
        setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
    };

    // Formatting joining date
    let d = new Date(userProfile.joindate).toString().split(' ');
    const joiningDate = `${d[2]}-${d[1]}-${d[3]}`;

    // Rendering JSX
    return (
        <div>
            <div className="topbar fs-5 p-2 m-2 mt-1" style={{ backgroundColor: 'white', color: '#a40df1', fontFamily: 'emoji', borderBottom: '0.5px solid #c1bebe' }}>
                USER PROFILE
            </div>
            <div className="container-fulid p-2 m-2" style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }}>
                <div className=" row p-2 mt-4">
                    <h4 className='px-3 fs-3 fw-bold my-2' style={{ color: '#a40df1', fontFamily: 'emoji' }} >{userProfile.firstName} {userProfile.lastName}</h4>
                    <div className=" row col-lg-9" >
                        <form onSubmit={handleAddSubmit} encType="multipart/form-data">
                            <div className="row  row-cols-3">
                                <div className="col-md-4 py-3 profile-box-item  border border-dark" style={{ marginLeft: '15px' }}>
                                    <div className="d-flex flex-column">
                                        <label><strong>Email</strong></label>
                                        <label>{userProfile.email}</label>
                                    </div>
                                </div>
                                <div className="col-md-4 py-3 profile-box-item  border border-dark">
                                    <div className="d-flex flex-column">
                                        <label><strong>Joining Date</strong></label>
                                        <label>{joiningDate ? joiningDate === "undefined-Date-undefined" ? "N/A" : joiningDate : userProfile.joindate  === "undefined-Date-undefined" ? "N/A" : userProfile.joindate}</label>
                                    </div>
                                </div>
                                <div className="col-md-4 py-3 profile-box-item  border border-dark">
                                    <div className="d-flex flex-column">
                                        <label><strong>Role</strong></label>
                                        <label>{userProfile.userRole}</label>
                                    </div>
                                </div>
                                <div className="col mt-2 px-3 AddMember-mobile-style">
                                    <div className='fs-6 fw-light'>First Name *</div>
                                    <input type="text " className='bottom-border ' placeholder="First Name *" name="firstName" onChange={onchange} value={userProfile.firstName} minLength={2} />
                                </div>
                                <div className="col mt-2 px-3 AddMember-mobile-style">
                                    <div className='fs-6 fw-light'>Last Name *</div>
                                    <input type="text " className='bottom-border' placeholder="Last Name *" name="lastName" onChange={onchange} value={userProfile.lastName} minLength={2} />
                                </div>
                                <div className="col mt-2 px-3 AddMember-mobile-style">
                                    <div className='fs-6 fw-light'>Phone *</div>
                                    <input type="text " className='bottom-border' placeholder="Phone Number *" onChange={onchange} value={userProfile.phone} name="phone" minLength={10} />
                                </div>
                                <div className="container my-5 mx-2 AddMember-mobile-style">
                                    <button type="submit" className="btn btn-primary  fw-bold border border-dark" >Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-3 p-0  mt-0 text-center" >
                        <img src={typeof (image) === 'string' ? ((userProfile.profile === null || userProfile.profile === undefined) ? `${imageURL}img/online-learning.jpg` : `${imageURL}${userProfile.profile}`) : URL.createObjectURL(image)} className='Addmember-Profile' style={{ border: '10px solid #c6c6c6', borderRadius: '50%' }} alt="ProfilePicture" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Exporting UserProfile component
export default UserProfile;
