import React, { useState, useEffect, useContext, useRef } from 'react';
import TimePicker from 'react-time-picker';
import noteContext from '../Context/notes/notecontext';
import ListItems from './ListItems';

const WorkingList = () => {
    // Get current date
    let d = new Date().toString().split(' ');
    let Month = new Date().getMonth() + 1;
    const Today = `${d[3]}-${Month < 10 ? `0${Month}` : Month}-${d[2]}`;

    // Context setup
    const context = useContext(noteContext);
    const { DPRS, getdprs, userdata, getMember, getProject, members, projects, user, updateDPRS } = context;
    const refDprsEdit = useRef(null);
    const refclose = useRef(null);

    // State setup
    const [toDate, setToDate] = useState(`${Today}`);
    const [filterDPRS, setFilterDPRS] = useState('');
    const [DPRSEntry, setDPRSEntry] = useState({ member: `${user}`, project: '', date: `${Today}`, dprsDescription: '' });
    const [workHour, setWorkHour] = useState('00:00');
    const [managementHour, setManagementHour] = useState('00:00');
    const [inTime, setInTime] = useState('10:00');
    const [outTime, setOutTime] = useState('19:00');
    const [moreComponet, setMoreComponet] = useState(false);
    const [select, setSelect] = useState('');

    // Function to update DPRS entry
    const updatedprs = (dprs) => {
        setDPRSEntry(dprs);
        setWorkHour(dprs.workHour);
        setManagementHour(dprs.managementHour);
        setInTime(dprs.inTime);
        setOutTime(dprs.outTime);
        setSelect(dprs.member);
        refDprsEdit.current.click();
    };

    // Function to handle input changes
    const onchange = (e) => {
        setDPRSEntry({ ...DPRSEntry, [e.target.name]: e.target.value });
        setSelect({ ...DPRSEntry, [e.target.name]: e.target.value }.member === '' ? user : { ...DPRSEntry, [e.target.name]: e.target.value }.member);
    };

    // Function to toggle display of additional components
    const toggle = () => {
        setMoreComponet(!moreComponet);
    };

    // Function to handle form submission
    const handleAddSubmit = (e) => {
        e.preventDefault();
        updateDPRS(DPRSEntry._id, DPRSEntry.member, DPRSEntry.project, DPRSEntry.date, workHour, managementHour, inTime, outTime, DPRSEntry.dprsDescription);
        setDPRSEntry({ member: `${user}`, project: '', date: `${Today}`, dprsDescription: '' });
        setWorkHour('00:00');
        setManagementHour('00:00');
        setInTime('00:00');
        setOutTime('00:00');
        setMoreComponet(false);
        setSelect('');
        refclose.current.click();
    };

    // Fetch initial data
    useEffect(() => {
        getProject();
        getMember();
        userdata();
        getdprs();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {/* Modal trigger button */}
            <button type="button" ref={refDprsEdit} className="btn d-none" data-bs-toggle="modal" data-bs-target="#editDprs" />

            {/* Edit DPRS Modal */}
            <div className="modal fade" ref={refclose} id="editDprs" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit DPRS Entry</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <>
                                <div className="" style={{ backgroundColor: 'white', color: 'black' }}>
                                    <form onSubmit={handleAddSubmit} encType="multipart/form-data">
                                        <div className='m-1   row'>
                                            {/* Member name selection */}
                                            <div className="my-2 mx-0 AddMember-mobile-style">
                                                <div className='fs-6 fw-light '>Member Name *</div>
                                                <select className="bottom-border " aria-label="filterTrackingStatus" value={DPRSEntry.member} onChange={onchange} name="member" disabled>
                                                    <option value={DPRSEntry.member}>{DPRSEntry.member}</option>
                                                    {members.map((member) => { return `${member.firstName} ${member.lastName}` !== DPRSEntry.member && <option key={member._id} value={`${member.firstName} ${member.lastName}`} > {member.firstName} {member.lastName}</option> })}
                                                </select>
                                            </div>
                                            {/* Project selection */}
                                            <div className="my-2 AddMember-mobile-style">
                                                <div className='fs-6 fw-light '>Select Project</div>
                                                <select className="bottom-border" aria-label="filterProjectStatus" value={DPRSEntry.project} onChange={onchange} name="project" required>
                                                    <option value='DPRSEntry.project'>{DPRSEntry.project}</option>
                                                    {projects.map((project, index) => { return (project.member.split(', ').some(pMember => pMember === `${select}`) === true ? projects[index] : null) }).filter((project) => { return project !== null }).map((project) => { return project.projectName !== DPRSEntry.project && <option key={project._id} value={project.projectName} >{project.projectName}</option> })}
                                                </select>
                                            </div>
                                            {/* Date, Work Hours, and Management Support Hours */}
                                            <div className="row mt-3 row-cols-3" id='dprs_mobile-fields'>
                                                <div className="d-flex pt-1 flex-column AddMember-mobile-style">
                                                    <div className='fs-6'>Work Date</div>
                                                    <input type="date" className='bottom-border pt-1' value={DPRSEntry.date} onChange={onchange} name="date" required />
                                                </div>
                                                <div className="d-flex pt-1 flex-column AddMember-mobile-style">
                                                    <div className='fs-6'>Work Hours</div>
                                                    <TimePicker clockIcon={null} value={workHour} onChange={setWorkHour} />
                                                </div>
                                                <div className="d-flex pt-1 flex-column AddMember-mobile-style">
                                                    <div className='fs-6'>Management Support Hours</div>
                                                    <TimePicker clockIcon={null} value={managementHour} onChange={setManagementHour} required />
                                                </div>
                                            </div>
                                            {/* Task Description */}
                                            <div className="mt-3">
                                                <div className="form-group ">
                                                    <div className='fs-6 py-2'>Enter Task Description</div>
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" name='dprsDescription' value={DPRSEntry.dprsDescription} onChange={onchange} placeholder='Enter Task Description' required></textarea>
                                                </div>
                                            </div>
                                            {/* Additional time inputs */}
                                            <div className={moreComponet ? 'mt-2' : 'mt-2 d-none'}>
                                                <div className="row row-cols-2 ">
                                                    <div className="d-flex pt-1 flex-column AddMember-mobile-style">
                                                        <div className='fs-6'>In Time</div>
                                                        <TimePicker clockIcon={null} value={inTime} onChange={setInTime} />
                                                    </div>
                                                    <div className="d-flex pt-1  flex-column AddMember-mobile-style">
                                                        <div className='fs-6'>Out Time</div>
                                                        <TimePicker clockIcon={null} value={outTime} onChange={setOutTime} />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Form submission buttons */}
                                            <div className="my-4">
                                                <div className="container mx-2 p-1 AddMember-mobile-style">
                                                    <button type="submit" className="btn btn-primary btn-outline-light px-4 mx-1 py-1 fw-bold border border-dark text-center" style={{ width: '90px' }} ref={refclose}>Save</button>
                                                    <button type='button' className="btn btn-light btn-outline-primary mx-4 py-1 fw-bold " style={{ width: '90px' }} onClick={toggle} >{moreComponet ? 'Less' : 'More'}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter modal */}
            <div className=" row p-0 m-0">
                <div className="col-lg-8 mt-3 pt-2 AddMember-mobile-style">
                    <input type="text " className='bottom-border fw-light pt-1' value={filterDPRS} onChange={(e) => setFilterDPRS(e.target.value)} placeholder="Filter DPRS" maxLength={25} name="filterDPRS" />
                </div>
                <div className="col-lg-4 pt-1 AddMember-mobile-style">
                    <div className='fs-6 fw-light '>Date</div>
                    <input type="date" className='bottom-border ' placeholder='01-22-2023' value={toDate} onChange={(e) => setToDate(e.target.value)} name="toDate" required />
                </div>
            </div>

            {/* Table */}
            <div className='border table-responsive p-1  m-2 w-100'>
                <table className="mt-1 table table-striped table-hover text-center w-100 align-middle p-5" >
                    <thead>
                        <tr className='py-2' style={{ backgroundColor: '#d9d9d9' }}>
                            <th>Project</th>
                            <th>WH</th>
                            <th>MH</th>
                            <th>Member Name</th>
                            <th>Description</th>
                            <th>In Time</th>
                            <th>Out Time</th>
                            <th>Created</th>
                            <th>Verified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {DPRS !== undefined ?
                            (DPRS.length === 0 ? <tr></tr> :
                                DPRS.filter((dprs) => {
                                    return new Date(dprs.date).getTime() === new Date(toDate).getTime()
                                }).filter((dprs) => {
                                    return filterDPRS === '' ? dprs : dprs.project.includes(filterDPRS)
                                }).map((dprs) => {
                                    return <ListItems key={dprs._id} id={dprs._id} project={dprs.project} workHour={dprs.workHour} managementHour={dprs.managementHour} member={dprs.member} dprsDescription={dprs.dprsDescription} inTime={dprs.inTime} outTime={dprs.outTime} date={dprs.date} isVarify={dprs.isVarify} dprs={dprs} updatedprs={updatedprs} />
                                })) : <tr></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WorkingList;
