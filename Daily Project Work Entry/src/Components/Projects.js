// Importing necessary modules and components from React and other libraries
import React, { useContext, useEffect, useRef, useState } from 'react';
import AddProject from './AddProject'; // Importing AddProject component
import ProjectItem from './ProjectItem'; // Importing ProjectItem component
import noteContext from '../Context/notes/notecontext'; // Importing noteContext from context folder
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom
import Multiselect from 'multiselect-react-dropdown'; // Importing Multiselect component
import TimePicker from 'react-time-picker'; // Importing TimePicker component
import AddClient from './AddClient'; // Importing AddClient component
import globalContext from '../Context/notes/globalContext'; // Importing globalContext from context folder

// Defining Projects functional component
const Projects = () => {
  // Using useContext hook to access global context
  const gContext = useContext(globalContext);
  const { showAlert } = gContext; // Destructuring showAlert function from global context
  const navigate = useNavigate(); // Using useNavigate hook for navigation
  const context = useContext(noteContext); // Using useContext hook to access local context
  const { projects, getProject, updateProject, getClient, client } = context; // Destructuring values from local context
  const [filterName, setFilterName] = useState(''); // Initializing state for filtering project names
  const [filterProjectStatus, setFilterProjectStatus] = useState(''); // Initializing state for filtering project status
  const [filterManager, setFilterManager] = useState(''); // Initializing state for filtering project manager
  const [filterProjectMember, setFilterProjectMember] = useState(''); // Initializing state for filtering project member
  const [project, setProject] = useState({ // Initializing state for project object with default values
    projectName: '',
    clientName: '',
    member: '',
    durationHours: '',
    limithours: '',
    durationType: 'Day',
    technologies: '',
    projectManager: '',
    type: '',
    projectDescription: ''
  });
  const refEdit = useRef(null); // Creating a ref for edit button
  const refclose = useRef(null); // Creating a ref for close button
  const [members, setMembers] = useState([]); // Initializing state for members array
  const [membersList, setMembersList] = useState([]); // Initializing state for selected members list
  const [limitHours, setLimitHours] = useState('08:00'); // Initializing state for limit hours
  const host = process.env.REACT_APP_BACKEND_HOSTING; // Setting host URL

  // Function to update project details
  const updateproject = (currentProject) => {
    setProject(currentProject); // Setting current project details
    refEdit.current.click(); // Triggering click event on edit button
    setMembersList([currentProject.member]); // Setting selected members list
  };

  // Function to handle form submission for adding a project
  const handleAddSubmit = (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    // Calling updateProject function with project details
    updateProject(
      project._id,
      project.projectName,
      project.clientName,
      membersList.join(', '),
      project.durationHours,
      project.durationType,
      limitHours,
      project.technologies,
      project.projectManager,
      project.type,
      project.projectDescription
    );
    // Resetting project state and selected members list
    setProject({
      projectName: '',
      clientName: '',
      member: '',
      durationHours: '',
      limithours: '',
      durationType: 'Day',
      technologies: '',
      projectManager: '',
      type: '',
      projectDescription: ''
    });
    setMembersList([]);
    setLimitHours('');
    refclose.current.click(); // Triggering click event on close button
  };

  // Function to fetch members
  const getMember = async () => {
    try {
      // Fetching members from server
      const response = await fetch(`${host}/api/member/getuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json(); // Parsing response to JSON format
      setMembers(json.user); // Setting members in state
    } catch (error) {
      showAlert('Internal Error occurred', 'danger'); // Showing alert for internal error
    }
  };

  // Function to handle input change
  const onchange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value }); // Updating project state based on input change
  };

  // Function to handle added members
  const addedMember = (e) => {
    setMembersList(e); // Setting selected members list
  };

  // useEffect hook to fetch projects, members, and clients on component mount
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getProject(); // Fetching projects
      getMember(); // Fetching members
      getClient(); // Fetching clients
    } else {
      navigate("/login"); // Redirecting to login page if token is not available
    }
    // eslint-disable-next-line
  }, []);

  // Rendering JSX elements
  return (
    <>
      <div className="topbar fs-5 p-2 m-2 mt-1" style={{ backgroundColor: 'white', color: '#a40df1', fontFamily: 'emoji', borderBottom: '0.5px solid #c1bebe' }}>
        MANAGE PROJECTS
      </div>
      <div className="mx-2 px-3" style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }}>
        <h4 className='fw-light mt-4'>Project List</h4>
        {/* Edit Project Button */}
        <button type="button" ref={refEdit} className="btn d-none" data-bs-toggle="modal" data-bs-target="#editProjectModal"></button>
        {/* Edit Project Modal */}
        <div className="modal fade" ref={refclose} id="editProjectModal" tabIndex="-1" aria-labelledby="#exampleModalAddProject" aria-hidden="true">
          {/* Modal Content */}
          <div className="modal-dialog modal-dialog-scrollable modal-xl modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Project</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* Form for Updating Project */}
                <form onSubmit={handleAddSubmit} encType="multipart/form-data">
                  {/* Project Details Inputs */}
                  <div className='m-4 mb-0'>
                    {/* Project Name Input */}
                    <div className="row p-0 row-cols-3">
                      <div className="mt-4 AddMember-mobile-style">
                        <input type="text" className='bottom-border' placeholder="Project Name *" value={project.projectName} onChange={onchange} name="projectName" minLength={2} maxLength={25} required />
                      </div>
                      {/* Client Name Select */}
                      <div className=" d-flex AddMember-mobile-style">
                        <select className="bottom-border clientFiled" placeholder="Client Name" value={project.clientName} onChange={onchange} aria-label="clientName" name="clientName">
                          <option value=''>Client Name</option>
                          {client.map((client) => { return <option key={client._id} value={client.firstName} > {client.clientName}</option> })}
                        </select>
                        {/* Add Client Button */}
                        <button type="button" className="btn p-0 m-auto addMemberStyle" data-bs-toggle="modal" data-bs-target="#createClient">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                          </svg>
                        </button>
                      </div>
                      {/* Member Select */}
                      <div className="pt-2 AddMember-mobile-style">
                        <Multiselect
                          isObject={false}
                          displayValue="Member"
                          className='multiselectContainer'
                          hidePlaceholder={true}
                          onRemove={addedMember}
                          onSelect={addedMember}
                          showCheckbox
                          options={members.map((member) => { return `${member.firstName} ${member.lastName}` })}
                        />
                      </div>
                      {/* Technologies Select */}
                      <div className="mt-4 pt-1 AddMember-mobile-style">
                        <select className="bottom-border" placeholder="Technologies" aria-label="Technologies" value={project.technologies} onChange={onchange} name="technologies">
                          <option value=''>Technologies</option>
                          <option value='Python'>Python</option>
                          <option value='React Js'>React Js</option>
                          <option value='Angular'>Angular</option>
                          <option value='C++'>C++</option>
                          <option value='Java'>Java</option>
                        </select>
                      </div>
                      {/* Duration Hours Input */}
                      <div className=" d-flex AddMember-mobile-style">
                        <input type="text" className=' mt-4 bottom-border durationfield' placeholder="Duration Hours" value={project.durationHours} onChange={onchange} name="durationHours" minLength={1} maxLength={25} required />
                        {/* Duration Type Select */}
                        <section className='d-flex pt-2 flex-column m-auto'>
                          <label htmlFor="days" className='durationdayfield' style={{ fontSize: '13px' }}>DurationType</label>
                          <select className="bottom-border durationdayfield" placeholder="DurationType" aria-label="DurationType" value={project.durationType} onChange={onchange} name="durationType">
                            <option value='Day'>Day</option>
                            <option value='Week'>Week</option>
                            <option value='Month'>Month</option>
                          </select>
                        </section>
                      </div>
                      {/* Limit Hours Select */}
                      <div className="d-flex pt-1 flex-column" id='Limit-Hour-Mobile'>
                        <label htmlFor="days" className='w-100' style={{ fontSize: '14px' }}>select limit hours</label>
                        <TimePicker
                          clockIcon={null}
                          style={{ position: 'relative' }}
                          onChange={setLimitHours}
                          value={project.limithours}
                        />
                      </div>
                      {/* Project Manager Select */}
                      <div className="mt-4 pt-1 AddMember-mobile-style">
                        <select className="bottom-border" placeholder="Project Manager *" aria-label="Project Manager" name="projectManager" value={project.projectManager} onChange={onchange} required>
                          <option value=''>Project Manager *</option>
                          {members.filter(member => member.userDesignation === 'Manager').map((member) => { return <option key={member._id} value={`${member.firstName} ${member.lastName}`} > {member.firstName} {member.lastName}</option> })}
                        </select>
                      </div>
                      {/* Project Type Select */}
                      <div className="mt-4 pt-1 AddMember-mobile-style">
                        <select className="bottom-border" aria-label="Type" name="type" value={project.type} onChange={onchange} required>
                          <option value=''>Type *</option>
                          <option value='Active'>Active</option>
                          <option value='Close'>Close</option>
                          <option value='Pending'>Pending</option>
                          <option value='Completed'>Completed</option>
                          <option value='Delayed'>Delayed</option>
                          <option value='Suspended'>Suspended</option>
                          <option value='Abandoned'>Abandoned</option>
                          <option value='Resumed'>Resumed</option>
                          <option value='On Schedule'>On Schedule</option>
                          <option value='Ahead of Schedule'>Ahead of Schedule</option>
                          <option value='Behind Schedule'>Behind Schedule</option>
                          <option value='At Risk'>At Risk</option>
                        </select>
                      </div>
                    </div>
                    {/* Project Description Input */}
                    <div className="mt-3">
                      <div className="form-group">
                        <div className='fs-6 py-2'>Enter Project Description</div>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" name='projectDescription' value={project.projectDescription} onChange={onchange} placeholder='Enter Project Description' required></textarea>
                      </div>
                    </div>
                  </div>
                  {/* Form Buttons */}
                  <div className="m-4">
                    <div className="container mx-4 p-1 AddMember-mobile-style">
                      <button type="submit" className="btn btn-primary px-4 fw-bold border border-dark" ref={refclose}>Submit</button>
                      <button type="reset" className="btn btn-light btn-outline-dark mx-3 px-3 fw-bold" data-bs-dismiss="modal">Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Add Project Button */}
        <div className='d-flex flex-row-reverse mx-2'>
          <button type="button" className="btn p-0 addMemberStyle" data-bs-toggle="modal" data-bs-target="#exampleModalAddProject">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </button>
        </div>
        {/* AddProject Component */}
        <AddProject members={members} />

        {/* Filter Modal */}
        <div className="row">
          <div className="col-lg-3 mt-3 pt-1 AddMember-mobile-style">
            <input type="text" className='bottom-border fw-light' value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="Project Name" maxLength={25} name="filterName" />
          </div>
          <div className="col-lg-3 AddMember-mobile-style">
            <div className='fs-6 fw-light mx-1'>Project Status</div>
            <select className="bottom-border" aria-label="filterProjectStatus" value={filterProjectStatus} onChange={(e) => setFilterProjectStatus(e.target.value)} name="filterProjectStatus">
              <option value=''>Select Project Status</option>
              {[...new Set(projects.map(project => project.type))].map((type) => { return <option key={type} value={type} >{type}</option> })}
            </select>
          </div>
          <div className="col-lg-3 AddMember-mobile-style">
            <div className='fs-6 fw-light mx-1'>Project Manager</div>
            <select className="bottom-border" aria-label="filterTrackingStatus" value={filterManager} onChange={(e) => setFilterManager(e.target.value)} name="filterManager">
              <option value=''>Select Project Manager</option>
              {members.filter(member => member.userDesignation === 'Manager').map((member) => { return <option key={member._id} value={`${member.firstName} ${member.lastName}`} > {member.firstName} {member.lastName}</option> })}
            </select>
          </div>
          <div className="col-lg-3 AddMember-mobile-style">
            <div className='fs-6 fw-light mx-1'>Project Member</div>
            <select className="bottom-border" aria-label="filterProjectMember" value={filterProjectMember} onChange={(e) => setFilterProjectMember(e.target.value)} name="filterProjectMember">
              <option value=''>Select Project Members</option>
              {members.map((member) => { return <option key={member._id} value={`${member.firstName} ${member.lastName}`} > {member.firstName} {member.lastName}</option> })}
            </select>
          </div>
        </div>

        {/* Project Table */}
        <div className='mt-3 border table-responsive p-1'>
          <table className="table table-striped table-hover text-center align-middle p-5">
            <thead>
              <tr className='py-2'>
                <th>Project</th>
                <th>Manager</th>
                <th>Client</th>
                <th>Members</th>
                <th>Duration</th>
                <th>Limit</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? <tr></tr> :
                // Filtering projects based on applied filters and mapping them to ProjectItem component
                projects.filter((project) => {
                  return filterName.toLowerCase() === '' ? project : project.projectName.toLowerCase().includes(filterName.toLowerCase())
                }).filter((project) => {
                  return filterProjectStatus === '' ? project : project.type.toString().includes(filterProjectStatus)
                }).filter((project) => {
                  return filterManager === '' ? project : project.projectManager.includes(filterManager)
                }).filter((project) => {
                  return filterProjectMember === '' ? project : project.member.includes(filterProjectMember)
                }).map((project) => {
                  return <ProjectItem key={project._id} projectName={project.projectName} projectManager={project.projectManager} clientName={project.clientName} member={project.member} durationHours={project.durationHours} durationType={project.durationType} limithours={project.limithours} type={project.type} project={project} updateproject={updateproject} />
                })
              }
            </tbody>
          </table>
        </div>
        {/* AddClient Component */}
        <AddClient />
        <div className='mb-2'></div>
      </div>
    </>
  );
};

export default Projects; // Exporting Projects component
