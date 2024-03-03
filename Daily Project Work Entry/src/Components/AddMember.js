// Importing necessary dependencies and styles
import React, { useContext, useRef, useState } from 'react';
import noteContext from '../Context/notes/notecontext'; // Importing context for notes
import './css/style.css'; // Importing general styles
import './css/memberStyle.css'; // Importing member-specific styles

// Functional component for adding a member
const AddMember = () => {
  // Define base URL for profile image
  const host = 'http://localhost:5000'
  const imageURL = `${host}/uploads/`;

  // State variables for mode (active/inactive), image, and member details
  const [mode, setMode] = useState(false);
  const [image, setImage] = useState('');
  const [member, setMember] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userRole: '',
    phone: '',
    userDesignation: '',
    alterPhone: '',
    alterEmail: '',
    department: '',
    password: '',
    joindate: '',
    LeaveStartDate: '',
    LeaveEndDate: '',
    profile: ''
  });

  // Context for managing notes
  const context = useContext(noteContext);
  const { addmemberFun } = context;

  // Ref for closing modal
  const refclose = useRef(null);

  // Function to capitalize the first letter of a word
  const capitalized = (word) => {
    let newText = word.toLowerCase();
    return newText.charAt(0).toUpperCase() + newText.slice(1);
  };

  // Function to handle form submission for adding a member
  const handleAddSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    // Appending member details to formData
    formData.append('profile', image);
    formData.append('firstName', capitalized(member.firstName));
    formData.append('lastName', capitalized(member.lastName));
    formData.append('email', member.email.toLowerCase());
    formData.append('userRole', member.userRole);
    formData.append('phone', member.phone);
    formData.append('userDesignation', member.userDesignation);
    formData.append('alterPhone', member.alterPhone);
    formData.append('alterEmail', member.alterEmail);
    formData.append('department', member.department);
    formData.append('password', member.password);
    formData.append('joindate', member.joindate);
    formData.append('LeaveStartDate', member.LeaveStartDate);
    formData.append('LeaveEndDate', member.LeaveEndDate);
    formData.append('isActive', mode);

    // Calling addmemberFun with formData
    addmemberFun(formData);
    // Resetting member state and mode
    setMember({
      firstName: '',
      lastName: '',
      email: '',
      userRole: '',
      phone: '',
      userDesignation: '',
      alterPhone: '',
      alterEmail: '',
      department: '',
      password: '',
      joindate: '',
      LeaveStartDate: '',
      LeaveEndDate: '',
      profile: ''
    });
    setMode(false);
    // Closing modal
    refclose.current.click();
  };

  // Function to handle input changes
  const onchange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  // Function to handle image upload
  const imageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  // Function to toggle mode (active/inactive)
  const toggleMode = () => {
    setMode(!mode);
  };

  return (
    <>

      {/* <!-- Modal --> */}
      <div className="modal fade" ref={refclose} id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add member</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <>
                <div className="mx-2 p-3" >
                  <div className=" row ">
                    <div className=" row col-lg-10" >
                      <form onSubmit={handleAddSubmit} encType="multipart/form-data">
                        <div className="row row-cols-3">
                          <div className="mt-4 AddMember-mobile-style">
                            <input type="text " className='bottom-border ' placeholder="First Name *" name="firstName" value={member.firstName.toLowerCase()} onChange={onchange} minLength={2} required />
                          </div>
                          <div className="mt-4 AddMember-mobile-style">
                            <input type="text " className='bottom-border' placeholder="Last Name *" name="lastName" value={member.lastName.toLowerCase()} onChange={onchange} minLength={2} required />
                          </div>
                          <div className="mt-4 AddMember-mobile-style">
                            <input type="email " className='bottom-border' placeholder="Email *" name="email" value={member.email.toLowerCase()} onChange={onchange} required />
                          </div>
                          <div className="mt-4 pt-2 AddMember-mobile-style">
                            <select className="bottom-border" placeholder="User Role *" aria-label="User Role *" value={member.userRole} onChange={onchange} name="userRole" required>
                              <option value=''>User Role*</option>
                              <option value='Employee'>Employee</option>
                              <option value='Admin'>Admin</option>

                            </select>
                          </div>
                          <div className="col mt-2 AddMember-mobile-style">
                            <div className='fs-6'>Choose a JoinDate:</div>
                            <input type="date" className='bottom-border' value={member.joindate} onChange={onchange} name="joindate" />
                          </div>
                          <div className="mt-4 pt-1 AddMember-mobile-style">
                            <input type="text " className='bottom-border' placeholder="Phone Number *" value={member.phone} onChange={onchange} name="phone" minLength={10} required />
                          </div>
                          <div className="mt-4 pt-1 AddMember-mobile-style">
                            <select className="bottom-border" placeholder="User Designation *" aria-label="User Designation *" value={member.userDesignation} onChange={onchange} name="userDesignation" required>
                              <option value=''>User Designation*</option>
                              <option value='Architect'>Architect</option>
                              <option value='Associate Consultant'>Associate Consultant</option>
                              <option value='Manager'>Manager</option>
                              <option value='Senior Architect'>Senior Architect</option>
                              <option value='Senior Software Engineer'>Senior Software Engineer</option>
                              <option value='Junior Software Engineer'>Junior Software Engineer</option>
                              <option value='Team Lead'>Team Lead</option>
                              <option value='Technology Analyst'>Technology Analyst</option>
                              <option value='Trainee'>Trainee</option>
                            </select>
                          </div>
                          <div className="mt-4 AddMember-mobile-style">
                            <input type="text" className='bottom-border' placeholder="Alternative Phone Number" value={member.alterPhone} onChange={onchange} name="alterPhone" minLength={10} />
                          </div>
                          <div className="mt-4 AddMember-mobile-style">
                            <input type="email " className='bottom-border' placeholder="Alternative Email" value={member.alterEmail} onChange={onchange} name="alterEmail" />
                          </div>
                          <div className="col-md-12 mt-4 pt-1 AddMember-mobile-style">
                            <select className="bottom-border" placeholder="Department *" aria-label="Department" value={member.department} onChange={onchange} name="department" style={{ width: '30%' }} required>
                              <option value=''>Department*</option>
                              <option value='Dispatch Department'>Web Application Development</option>
                              <option value='Finance Department'>Mobile Application Development</option>
                              <option value='Human Resource Department'>Human Resource</option>
                            </select>
                          </div>
                          <div className="col-md-6 mt-4 AddMember-mobile-style">
                            <div className='fs-6'>Choose a Leave StartDate</div>
                            <input type="date" className='bottom-border' value={member.LeaveStartDate} onChange={onchange} name="LeaveStartDate" />
                          </div>
                          <div className="col-md-6 mt-4 AddMember-mobile-style">
                            <div className='fs-6'>Choose a Leave EndDate</div>
                            <input type="date" className='bottom-border' value={member.LeaveEndDate} onChange={onchange} name="LeaveEndDate" />
                          </div>
                          <div className="mt-4 pt-2 AddMember-mobile-style">
                            <input type="password" className='bottom-border' placeholder="Password *" value={member.password} onChange={onchange} name="password" minLength={5} required />
                          </div>
                          <div className="col mt-1 pt-1 AddMember-mobile-style">
                            <div className='fs-6'><strong>Profile Picture</strong></div>
                            <input type="file"
                              name="profile" onChange={imageUpload}
                              accept="image/png, image/jpeg" />
                          </div>
                          <div className="form-check form-switch mt-3 AddMember-mobile-style">
                            <input className="form-check-input border border-dark " type="checkbox" role="switch" onChange={toggleMode} name="isActive" />
                            <label className="form-check-label  " htmlFor="flexSwitchCheckChecked">Is Active?</label>
                          </div>
                        </div>
                        <div className="container my-5 AddMember-mobile-style">
                          <button type="submit" className="btn btn-primary  fw-bold border border-dark" ref={refclose}>Submit</button>
                          <button type="reset" className="btn btn-light btn-outline-dark mx-2 fw-bold " data-bs-dismiss="modal">Cancel</button>
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-1 p-0  text-center" >

                      <img src={image === '' ? `${imageURL}img/online-learning.jpg` : URL.createObjectURL(image)} className='Addmember-Profile' style={{ border: '10px solid #c6c6c6', borderRadius: '50%' }} alt="ProfilePicture" />
                    </div>
                  </div>

                </div>
              </>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default AddMember;
