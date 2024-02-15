// Importing necessary components and modules
import Multiselect from 'multiselect-react-dropdown';
import React, { useContext, useRef, useState } from 'react';
import TimePicker from 'react-time-picker';
import noteContext from '../Context/notes/notecontext'; // Importing context
import AddClient from './AddClient'; // Importing AddClient component
import './css/projectstyle.css'; // Importing CSS file

const AddProject = (props) => {
  const context = useContext(noteContext); // Accessing context
  const { createProject, client } = context; // Destructuring context values
  const refclose = useRef(null); // Creating a ref
  const { members } = props; // Destructuring props
  const [membersList, setMembersList] = useState([]); // State for selected members
  const [limitHours, setLimitHours] = useState('08:00'); // State for limit hours

  // State for project details
  const [project, setProject] = useState({ 
    projectName: '', 
    clientName: '', 
    member: '', 
    durationHours: '', 
    durationType: 'Day', 
    technologies: '', 
    projectManager: '', 
    type: '', 
    projectDescription: '' 
  });

  // Function to handle form submission
  const handleAddSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    createProject( // Calling createProject function with project details
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
    // Resetting project state and limitHours state
    setProject({ 
      projectName: '', 
      clientName: '', 
      member: '', 
      durationHours: '', 
      durationType: 'Day', 
      technologies: '', 
      projectManager: '', 
      type: '', 
      projectDescription: '' 
    });
    setLimitHours('');
    refclose.current.click(); // Clicking on the ref element to close the modal
    setMembersList([]); // Resetting membersList state
  };

  // Function to handle input change
  const onchange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value }); // Updating project state
  };

  // Function to handle added members
  const addedMember = (e) => {
    setMembersList(e); // Updating membersList state
  };

  return (
    <>
      {/* Modal */}
      <div className="modal fade" ref={refclose} id="exampleModalAddProject" tabIndex="-1" aria-labelledby="#exampleModalAddProject" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Project</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddSubmit} encType="multipart/form-data">
                <div className='m-4 mb-0  '>
                  <div className="row p-0 row-cols-3">
                    <div className="mt-4 AddMember-mobile-style">
                      <input type="text " className='bottom-border ' placeholder="Project Name *" value={project.projectName} onChange={onchange} name="projectName" minLength={2} maxLength={25} required />
                    </div>
                    <div className=" d-flex AddMember-mobile-style">
                      {/* Selecting client name */}
                      <select className="bottom-border clientFiled " placeholder="Client Name" value={project.clientName} onChange={onchange} aria-label="clientName" name="clientName" >
                        <option value=''>Client Name</option>
                        {/* Mapping through clients */}
                        {client.map((client) => { return <option key={client._id} value={client.firstName} > {client.clientName}</option> })}
                      </select>
                      {/* Button to add new client */}
                      <button type="button" className="btn p-0 m-auto addMemberStyle" data-bs-toggle="modal" data-bs-target="#createClient" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle-fill " viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                        </svg>
                      </button>
                    </div>
                    <div className="pt-2 AddMember-mobile-style">
                      {/* Selecting project members */}
                      <Multiselect isObject={false} displayValue='Id' key={members.map((m) => { return m._id })} className='multiselectContainer' hidePlaceholder={true} onRemove={addedMember} onSelect={addedMember} showCheckbox options={members.map((member) => { return `${member.firstName} ${member.lastName}` })} />
                    </div>
                    <div className="mt-4 pt-1 AddMember-mobile-style">
                      {/* Selecting technologies */}
                      <select className="bottom-border" placeholder="Technologies" aria-label="Technologies" value={project.technologies} onChange={onchange} name="technologies" >
                        <option value=''>Technologies</option>
                        <option value='Python'>Python</option>
                        <option value='React Js'>React Js</option>
                        <option value='Angular'>Angular</option>
                        <option value='C++'>C++</option>
                        <option value='Java'>Java</option>
                      </select>
                    </div>
                    <div className=" d-flex AddMember-mobile-style">
                      {/* Entering duration hours */}
                      <input type="text " className=' mt-4  bottom-border durationfield ' placeholder="Duration Hours" value={project.durationHours} onChange={onchange} name="durationHours" minLength={1} maxLength={25} required />
                      {/* Selecting duration type */}
                      <section className='d-flex pt-2 flex-column  m-auto'>
                        <label htmlFor="days" className='durationdayfield' style={{ fontSize: '13px' }}>DurationType</label>
                        <select className="bottom-border durationdayfield " placeholder="DurationType" aria-label="DurationType" value={project.durationType} onChange={onchange} name="durationType" >
                          <option value='Day' >Day</option>
                          <option value='Week'>Week</option>
                          <option value='Month'>Month</option>
                        </select>
                      </section>
                    </div>
                    <div className="d-flex pt-1 flex-column ">
                      <label htmlFor="days" className='' style={{ fontSize: '14px' }}>select limit hours</label>
                      {/* Selecting limit hours */}
                      <TimePicker clockIcon={null} style={{ position: 'relative' }} value={limitHours} onChange={setLimitHours} />
                    </div>
                    <div className="mt-4 pt-1 AddMember-mobile-style">
                      {/* Selecting project manager */}
                      <select className="bottom-border" placeholder="Project Manager *" aria-label="Project Manager" name="projectManager" value={project.projectManager} onChange={onchange} required>
                        <option value=''>Project Manager *</option>
                        {/* Filtering members based on designation */}
                        {members.filter(member => member.userDesignation === 'Manager').map((member) => { return <option key={member._id} value={`${member.firstName} ${member.lastName}`} > {member.firstName} {member.lastName}</option> })}
                      </select>
                    </div>
                    <div className="mt-4 pt-1 AddMember-mobile-style">
                      {/* Selecting project type */}
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
                  <div className="mt-3">
                    <div className="form-group">
                      <div className='fs-6 py-2'>Enter Project Description</div>
                      {/* Entering project description */}
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" name='projectDescription' value={project.projectDescription} onChange={onchange} placeholder='Enter Project Description' required></textarea>
                    </div>
                  </div>
                </div>
                <div className="m-4">
                  <div className="container mx-4 p-1 AddMember-mobile-style">
                    {/* Buttons to save or cancel */}
                    <button type="submit" className="btn btn-primary px-4 fw-bold border border-dark" ref={refclose}>Save</button>
                    <button type="reset" className="btn btn-light btn-outline-dark mx-3 px-3 fw-bold " data-bs-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Adding AddClient component */}
        <AddClient />
      </div>
    </>
  )
}

export default AddProject;
