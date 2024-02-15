// Importing necessary modules from React
import React, { useContext, useEffect, useState } from 'react';
// Importing the context for notes
import noteContext from '../Context/notes/notecontext';
// Importing the component for displaying individual details
import DetailsItem from './DetailsItem';

// Component for displaying activity details
const ActivityDetails = () => {
    // Filter Date
    let d = new Date().toString().split(' ');
    let Month = new Date().getMonth() + 1;
    const MonthDate = `${d[3]}-${Month < 10 ? `0${Month}` : Month}-01`; // Getting the first day of the current month
    const Today = `${d[3]}-${Month < 10 ? `0${Month}` : Month}-${d[2]}`; // Getting today's date

    // Using note context
    const context = useContext(noteContext);
    const { userdata, getMember, getProject, members, projects, user, DPRS, getdprs } = context;
    const [fromDate, setFromDate] = useState(`${MonthDate}`); // State for 'from' date
    const [toDate, setToDate] = useState(`${Today}`); // State for 'to' date
    const [filterMember, setFilterMember] = useState(`${user}`); // State for selected member to filter
    const [filterProject, setFilterProject] = useState(''); // State for selected project to filter
    const [select, setSelect] = useState(''); // State for selected item

    // Function to handle member filter change
    const onchange = (e) => {
        setFilterMember(e.target.value); // Setting the selected member for filtering
        setSelect(e.target.value); // Setting the selected value
    };

    // Function to handle click event
    const clickme = (e) => {
        userdata(); // Fetching user data
        if (!select) {
            setSelect(user); // Setting user as the selected value if not selected
        }
        if (filterMember === 'undefined') {
            setFilterMember(user); // Setting user as the filter member if not defined
        }
    };

    useEffect(() => {
        getProject(); // Fetching projects
        getMember(); // Fetching members
        userdata(); // Fetching user data
        getdprs(); // Fetching DPRs
        if (!select) {
            setSelect(user); // Setting user as the selected value if not selected
        }
        // eslint-disable-next-line
    }, []);

    // Display Date
    let dd = new Date(fromDate).toString().split(' ');
    let fStartDate = `${dd[1]} ${dd[2]}, ${dd[3]}`; // Formatting the start date
    let ddd = new Date(toDate).toString().split(' ');
    let flastDate = `${ddd[1]} ${ddd[2]}, ${ddd[3]}`; // Formatting the end date

    return (
        <>
            <div className="topbar fs-5 p-2 m-2 mt-1" style={{ backgroundColor: 'white', color: '#a40df1', fontFamily: 'emoji', borderBottom: '0.5px solid #c1bebe' }}>
                USER ACTIVITY DETAILS
            </div>
            <div className="mx-2 p-3" style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }} onClick={clickme}>

                {/* Filter Modal  */}
                <div className="m-2 row">
                    <div className="col-lg-3 AddMember-mobile-style">
                        <div className='fs-6 fw-light'>From Date</div>
                        <input type="date" className='bottom-border' value={fromDate} onChange={(e) => setFromDate(e.target.value)} name="fromDate" required />
                    </div>
                    <div className="col-lg-3 AddMember-mobile-style">
                        <div className='fs-6 fw-light'>To Date</div>
                        <input type="date" className='bottom-border' value={toDate} onChange={(e) => setToDate(e.target.value)} name="toDate" required />
                    </div>
                    <div className="col-lg-3 AddMember-mobile-style">
                        <div className='fs-6 fw-light'>Select Member</div>
                        <select className="bottom-border" aria-label="filterMember" value={filterMember} onChange={onchange} name="filterMember">
                            <option value={user}>{user}</option>
                            {members.map((member) => { return `${member.firstName} ${member.lastName}` !== user && <option key={member._id} value={`${member.firstName} ${member.lastName}`} > {member.firstName} {member.lastName}</option> })}
                        </select>
                    </div>
                    <div className="col-lg-3 AddMember-mobile-style">
                        <div className='fs-6 fw-light'>Select Project</div>
                        <select className="bottom-border" aria-label="filterProject" value={filterProject} onChange={(e) => setFilterProject(e.target.value)} name="filterProject" >
                            <option value=''>All</option>
                            {projects.map((project, index) => { return (project.member.split(', ').some(pMember => pMember === `${select}`) === true ? projects[index] : null) }).filter((project) => { return project !== null }).map((project) => { return <option key={project._id} value={project.projectName} >{project.projectName}</option> })}
                        </select>
                    </div>
                </div>

                <div className="mt-3 text-center">
                    <div className="container fw-bold">
                        <div>
                            {filterMember === 'undefined' ? `${user}` : filterMember} , {fStartDate} to {flastDate}
                        </div>
                        <div >
                            User Activity Detail
                        </div>
                    </div>
                </div>

                {/* Table Modal  */}
                <div className='border table-responsive p-1 m-2'>
                    <div className="mt-2 text-center fw-bold" style={{ color: '#a40df1', fontSize: "18px" }}>
                        Member Name : {filterMember === 'undefined' ? `${user}` : filterMember}
                    </div>
                    <table className="mt-1 table table-striped table-hover text-center w-100 align-middle p-5">
                        <thead>
                            <tr className='py-2' style={{ backgroundColor: '#d9d9d9' }}>
                                <th>Worked Date</th>
                                <th>Project Name</th>
                                <th>Description</th>
                                <th>Worked Hours</th>
                                <th>Manager Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DPRS !== undefined ?
                                (DPRS.length === 0 ? <tr></tr> :
                                    DPRS.sort(function (fromDate, toDate) {
                                        let dateA = new Date(fromDate.date);
                                        let dateB = new Date(toDate.date);
                                        return -(dateA - dateB);
                                    }).filter((dprs) => {
                                        return new Date(dprs.date).getTime() >= new Date(fromDate).getTime()
                                    }).filter((dprs) => {
                                        return new Date(dprs.date).getTime() <= new Date(toDate).getTime()
                                    }).filter((dprs) => {
                                        return dprs.member === (`${filterMember}` === 'undefined' ? `${user}` : `${filterMember}`)
                                    }).filter((dprs) => {
                                        return filterProject === '' ? dprs : dprs.project === `${filterProject}` ? dprs.project.includes(filterProject) : ''
                                    }).map((dprs) => {
                                        return <DetailsItem key={dprs._id} date={dprs.date} project={dprs.project} dprsDescription={dprs.dprsDescription} workHour={dprs.workHour} managementHour={dprs.managementHour} />
                                    })) : <tr></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ActivityDetails;
