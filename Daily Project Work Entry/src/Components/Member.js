import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../Context/notes/notecontext';
import MemberItem from './MemberItem'
import AddMember from './AddMember';
import './css/style.css'
import './css/memberStyle.css'
import { useNavigate } from 'react-router-dom';


const Member = () => {
  const context = useContext(noteContext);
  const { members, getMember, updateMember } = context;
  const refEdit = useRef(null)
  const refclose = useRef(null)
  const [member, setMember] = useState({ _id: '', firstName: '', lastName: '', email: '', userRole: '', joindate: '', phone: '', userDesignation: '', alterPhone: '', alterEmail: '', department: '', LeaveStartDate: '', LeaveEndDate: '', password: '', profile: '' })
  const [mode, setMode] = useState(false)

  // search filed
  const [filterName, setFilterName] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterActive, setFilterActive] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')



  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getMember()
    }
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentMember) => {
    setMember(currentMember)
    setMode(currentMember.isActive)
    refEdit.current.click()
  }

  const handleAddSubmit = (e) => {
    e.preventDefault();

    updateMember(member._id, member.firstName.toLowerCase(), member.lastName.toLowerCase(), member.email.toLowerCase(), member.userRole, member.joindate, member.phone, member.userDesignation, member.alterPhone, member.alterEmail, member.department, member.LeaveStartDate, member.LeaveEndDate, member.password, member.profile, mode)

    setMember({ _id: '', firstName: '', lastName: '', email: '', userRole: '', joindate: '', phone: '', userDesignation: '', alterPhone: '', alterEmail: '', department: '', LeaveStartDate: '', LeaveEndDate: '', password: '', profile: '' })
    setMode(false)
    refclose.current.click()
  }
  const onchange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value })
  }

  const toggleMode = () => {
    if (mode === true) {
      setMode(false)
    }
    else {
      setMode(true)
    }
  }

  return (
    <div className="mx-5 px-3" style={{ marginTop: '30px' }}>
      <h3 className='fw-light p-0'>Member List</h3>

      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={refEdit} className="btn d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2" >
      </button>
      {/* <!-- Modal --> */}
      <div className="modal fade" ref={refclose} id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit member</h1>
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
                            <input type="text " className='bottom-border ' placeholder="First Name *" name="firstName" value={member.firstName} onChange={onchange} minLength={2} required />
                          </div>
                          <div className="mt-4 AddMember-mobile-style">
                            <input type="text " className='bottom-border' placeholder="Last Name *" name="lastName" value={member.lastName} onChange={onchange} minLength={2} required />
                          </div>
                          <div className="mt-4 AddMember-mobile-style">
                            <input type="email " className='bottom-border' placeholder="Email *" name="email" value={member.email} onChange={onchange} required />
                          </div>
                          {/* // 4 menu */}
                          <div className="mt-4 pt-2 AddMember-mobile-style">
                            <select className="bottom-border" placeholder="User Role *" aria-label="User Role *" value={member.userRole} onChange={onchange} name="userRole" required>
                              <option value=''>User Role*</option>
                              <option value='Employee'>Employee</option>
                              <option value='Admin'>Admin</option>

                            </select>
                          </div>
                          {/* // 5 Date  */}
                          <div className="col mt-2 AddMember-mobile-style">
                            <div className='fs-6'>Choose a JoinDate:</div>
                            <input type="date" className='bottom-border'  value={member.joindate} onChange={onchange} name="joindate" />
                          </div>
                          <div className="mt-4 pt-1 AddMember-mobile-style">
                            <input type="text " className='bottom-border' placeholder="Phone Number *" value={member.phone} onChange={onchange} name="phone" minLength={10} required />
                          </div>
                          {/* // 7 menu  */}
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
                          {/* // 10 menu  */}
                          <div className="col-md-12 mt-4 pt-1 AddMember-mobile-style">
                            <select className="bottom-border" placeholder="Department *" aria-label="Department" value={member.department} onChange={onchange} name="department" style={{ width: '30%' }} required>
                              <option value=''>Department*</option>
                              <option value='Dispatch Department'>Web Application Development</option>
                              <option value='Finance Department'>Mobile Application Development</option>
                              <option value='Human Resource Department'>Human Resource</option>
                            </select>
                          </div>
                          {/* // 11 date  */}
                          <div className="col-md-6 mt-4 AddMember-mobile-style">
                            <div className='fs-6'>Choose a Leave StartDate</div>
                            <input type="date" className='bottom-border'  value={member.LeaveStartDate} onChange={onchange} name="LeaveStartDate" />
                          </div>
                          {/* // 12 date  */}
                          <div className="col-md-6 mt-4 AddMember-mobile-style">
                            <div className='fs-6'>Choose a Leave EndDate</div>
                            <input type="date" className='bottom-border'  value={member.LeaveEndDate} onChange={onchange} name="LeaveEndDate" />
                          </div>
                          <div className="mt-4 pt-2 AddMember-mobile-style">
                            <input type="password " disabled className='bottom-border' placeholder="Password *" value={member.password} onChange={onchange} name="password" minLength={5} required />
                          </div>
                          {/* // 13 file  */}
                          <div className="col mt-1 pt-1 AddMember-mobile-style">
                            <div className='fs-6'><strong>Profile Picture</strong></div>
                            <input type="file"
                               name="profile" value={member.profile} onChange={onchange}
                              accept="image/png, image/jpeg" />
                          </div>
                          {/* // 14 switch  */}
                          <div className="form-check form-switch mt-3 AddMember-mobile-style">
                            <input className="form-check-input border border-dark " checked={mode === true ? true : false} type="checkbox" role="switch" onChange={toggleMode} name="isActive" />
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
                      <img src="https://www.detectivestraining.com/views/assets/images/online-learning.jpg" className='Addmember-Profile' style={{ border: '10px solid #c6c6c6', borderRadius: '50%' }} alt="ProfilePicture" />
                    </div>
                  </div>

                </div>
              </>
            </div>
          </div>
        </div>
      </div>


      {/* <!-- Modal --> */}
      <div className='d-flex flex-row-reverse mx-5'>
        <button type="button" className="btn p-0 addMemberStyle" data-bs-toggle="modal" data-bs-target="#exampleModal1" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle-fill " viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
        </button>
      </div>
      <AddMember />


      <div className=" row ">
        <div className="col-lg-3 mt-3 pt-1 AddMember-mobile-style">
          <input type="text " className='bottom-border ' value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="Filter member" style={{width:'80%'}} name="filterName" />
        </div>
        <div className="col-lg-3 mt-4 AddMember-mobile-style">
          <select className="bottom-border" placeholder="User Role *" value={filterRole} onChange={(e) => setFilterRole(e.target.value)} aria-label="User Role *" style={{width:'80%'}} name="userRole">
            <option value=''>Select Member Roles</option>
            <option value='Employee'>Employee</option>
            <option value='Admin'>Admin</option>

          </select>
        </div>
        <div className="col-lg-3 mt-4 AddMember-mobile-style">
          <select className="bottom-border" value={filterActive} onChange={(e) => setFilterActive(e.target.value)} aria-label="filterActive" style={{width:'80%'}} name="filterActive">
            <option value=''>Select Active Staus</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="col-lg-3 AddMember-mobile-style">
          <div className='fs-6 fw-light mx-1'>Department</div>
          <select className="bottom-border" aria-label="filterDepartment" value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)} style={{width:'80%'}} name="filterDepartment">
            <option value=''>Select Department</option>
            <option value='Dispatch Department'>Web Application Development</option>
            <option value='Finance Department'>Mobile Application Development</option>
            <option value='Human Resource Department'>Human Resource</option>
          </select>
        </div>
      </div>

      <div className='mt-3 border p-1'>
        <table className="table table-striped table-hover text-center  p-5">
          <thead>
            <tr className='py-2'>
              <th>Name</th>
              <th>Username</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Department Name</th>
              <th>Join Date</th>
              <th>Active</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? <tr></tr> :

              members.filter((member) => {
                return filterName.toLowerCase() === '' ? member : `${member.firstName} ${member.lastName}`.toLowerCase().includes(filterName)
              }).filter((member) => {
                return filterRole === '' ? member : member.userRole.includes(filterRole)
              }).filter((member) => {
                return filterActive === '' ? member : member.isActive.toString().includes(filterActive)
              }).filter((member) => {
                return filterDepartment === '' ? member : member.department.includes(filterDepartment)
              }).map((member) => {
                return <MemberItem key={member._id} id={member._id} firstName={member.firstName} lastName={member.lastName} email={member.email} userRole={member.userRole} phone={member.phone} department={member.department} isActive={member.isActive} joindate={member.joindate} member={member} updateNote={updateNote} />
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Member
