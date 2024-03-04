// Importing necessary modules and components from React
import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../Context/notes/notecontext'; // Importing noteContext from custom context
import TableReport from './TableReport'; // Importing TableReport component

// Functional component for Activity Summary
const ActivitySummary = () => {
    // Initialize date variables for filtering
    let d = new Date().toString().split(' ');
    let Month = new Date().getMonth() + 1;
    const MonthDate = `${d[3]}-${Month < 10 ? `0${Month}` : Month}-01`; // Setting start of current month
    const Today = `${d[3]}-${Month < 10 ? `0${Month}` : Month}-${d[2]}`; // Setting current date

    // Using context to access state and actions
    const context = useContext(noteContext);
    const { userdata, getMember, members, user, DPRS, getdprs } = context;

    // States for filtering and data manipulation
    const [fromDate, setFromDate] = useState(`${MonthDate}`);
    const [toDate, setToDate] = useState(`${Today}`);
    const [filterMember, setFilterMember] = useState(`${user}`);
    const [filterReportType, SetFilterReportType] = useState('Project Wise Report');
    const [select, setSelect] = useState('');
    const [memberProject, setMemberProject] = useState({});
    const [monthly, setMonthly] = useState([]);
    const [weekly, setWeekly] = useState([]);

    // Function to handle member selection change
    const onchange = (e) => {
        setFilterMember(e.target.value);
        setSelect(e.target.value);
    }

    // Function to handle search button click
    const clickme = (e) => {
        userdata();
        if (!select) {
            setSelect(user);
        }
        if (filterMember === 'undefined') {
            setFilterMember(user);
        }
    }

    // Function to filter data based on date range and member
    const data = (fromDate, toDate, filterMember) => {
        const projectData = [];
        DPRS.filter((dprs) => new Date(dprs.date).getTime() >= new Date(fromDate).getTime())
            .filter((dprs) => new Date(dprs.date).getTime() <= new Date(toDate).getTime())
            .filter((dprs) => dprs.member === (`${filterMember}` === 'undefined' ? `${user}` : `${filterMember}`))
            .forEach((dprs) => {
                const workHourInMinutes = parseInt(dprs.workHour.split(':')[0] * 60) + parseInt(dprs.workHour.split(':')[1]);
                const managementHourInMinutes = parseInt(dprs.managementHour.split(':')[0] * 60) + parseInt(dprs.managementHour.split(':')[1]);
                if (projectData[dprs.project]) {
                    projectData[dprs.project].workHour += workHourInMinutes;
                    projectData[dprs.project].managementHour += managementHourInMinutes;
                } else {
                    projectData[dprs.project] = {
                        workHour: workHourInMinutes,
                        managementHour: managementHourInMinutes
                    };
                }
            });
        setMemberProject(projectData);
        return projectData;
    }

    // Function to fetch data based on filter criteria
    const datafetch = () => {
        userdata();
        setMonthly([]);
        setWeekly([]);
        if (DPRS !== undefined && DPRS.length !== 0 && filterReportType === 'Project Wise Report') {
            data(fromDate, toDate, filterMember);
        } else if (DPRS !== undefined && DPRS.length !== 0 && filterReportType === 'Month Wise Report') {
            let fromD = new Date(fromDate);
            let toD = new Date(toDate);
            let current = new Date(fromD);
            let start, end;
            while (current <= toD) {
                start = new Date(current.getFullYear(), current.getMonth(), 1);
                end = new Date(current.getFullYear(), current.getMonth() + 1, 0);
                let dd = new Date(start).toString().split(' ');
                let fStartDate = `${dd[3]}-${(start.getMonth() + 1) < 10 ? `0${start.getMonth() + 1}` : start.getMonth() + 1}-${dd[2]}`;
                let ddd = new Date(end).toString().split(' ');
                let flastDate = `${ddd[3]}-${(start.getMonth() + 1) < 10 ? `0${end.getMonth() + 1}` : end.getMonth() + 1}-${ddd[2]}`;
                let come = data(fStartDate, flastDate, filterMember);
                setMonthly(monthly => [...monthly, [come, fStartDate, flastDate]]);
                current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
            }
        } else if (DPRS !== undefined && DPRS.length !== 0 && filterReportType === 'Week Wise Report') {
            let fromD = new Date(fromDate);
            let toD = new Date(toDate);
            let current = new Date(fromD);
            let start, end;
            while (current <= toD) {
                start = new Date(current);
                start.setDate(start.getDate() - start.getDay());
                end = new Date(current);
                end.setDate(end.getDate() - end.getDay() + 6);
                let dd = new Date(start).toString().split(' ');
                let fStartDate = `${dd[3]}-${(start.getMonth() + 1) < 10 ? `0${start.getMonth() + 1}` : start.getMonth() + 1}-${dd[2]}`;
                let ddd = new Date(end).toString().split(' ');
                let flastDate = `${ddd[3]}-${(start.getMonth() + 1) < 10 ? `0${end.getMonth() + 1}` : end.getMonth() + 1}-${ddd[2]}`;
                let come = data(fStartDate, flastDate, filterMember);
                setWeekly(weekly => [...weekly, [come, fStartDate, flastDate]]);
                current.setDate(current.getDate() + 7);
                if (current > toD) {
                    break;
                }
            }
        }
    }

    // Effect hook to fetch initial data
    useEffect(() => {
        getMember();
        userdata();
        getdprs();
        if (!select) {
            setSelect(user);
            setFilterMember(user);
        }
        // eslint-disable-next-line
    }, []);

    // Calculate total work hours and management hours for project wise report
    const totalWorkHour = Object.values(memberProject).reduce((total, { workHour }) => total + workHour, 0);
    const totalManagementHour = Object.values(memberProject).reduce((total, { managementHour }) => total + managementHour, 0);

    // Format start and end dates for display
    let dd = new Date(fromDate).toString().split(' ');
    let fStartDate = `${dd[1]} ${dd[2]}, ${dd[3]}`;
    let ddd = new Date(toDate).toString().split(' ');
    let flastDate = `${ddd[1]} ${ddd[2]}, ${ddd[3]}`;

    // JSX to render
    return (
        <>
            <div className="topbar fs-5 p-2 m-2 mt-1" style={{ backgroundColor: 'white', color: '#a40df1', fontFamily: 'emoji', borderBottom: '0.5px solid #c1bebe' }}>
                USER ACTIVITY SUMMARY
            </div>
            <div className="mx-2 p-3 Activity_Detail_Mobile" style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }} onMouseEnter={clickme}>
                <div className="m-2 row">
                    <div className="col-lg-2 AddMember-mobile-style">
                        <div className='fs-6 fw-light'>From Date</div>
                        <input type="date" className='bottom-border' value={fromDate} onChange={(e) => setFromDate(e.target.value)} name="fromDate" required />
                    </div>
                    <div className="col-lg-2 AddMember-mobile-style">
                        <div className='fs-6 fw-light'>To Date</div>
                        <input type="date" className='bottom-border' value={toDate} onChange={(e) => setToDate(e.target.value)} name="toDate" required />
                    </div>
                    <div className="col-lg-2 AddMember-mobile-style">
                        <div className='fs-6 fw-light'>Select Member</div>
                        <select className="bottom-border" aria-label="filterMember" value={filterMember} onChange={onchange} name="filterMember">
                            <option value={user}>{user}</option>
                            {members.map((member) => { return `${member.firstName} ${member.lastName}` !== user && <option key={member._id} value={`${member.firstName} ${member.lastName}`} > {member.firstName} {member.lastName}</option> })}
                        </select>
                    </div>
                    <div className="col-lg-2 AddMember-mobile-style">
                        <div className='fs-6 fw-light'>Select Project</div>
                        <select className="bottom-border" aria-label="filterReportType" value={filterReportType} onChange={(e) => SetFilterReportType(e.target.value)} name="filterReportType" >
                            <option value='Project Wise Report'>Project Wise Report</option>
                            <option value='Month Wise Report'>Month Wise Report</option>
                            <option value='Week Wise Report'>Week Wise Report</option>
                        </select>
                    </div>
                    <div className="col-lg-2 px-5 AddMember-mobile-style " id='Activity_Summary_Search_Mobile'>
                        <button type="button" className="btn btn-primary" onClick={datafetch}>Search</button>
                    </div>
                </div>
                <div className="text-center">
                    <div className="container fw-bold">
                        <div className='py-4'>
                            {filterMember === undefined ? `${user}` : filterMember} - Activity Summary Report
                        </div>
                    </div>
                </div>
                {filterReportType === 'Project Wise Report' &&
                    (Object.entries(memberProject).length > 0 ?
                        <TableReport memberProject={memberProject} fStartDate={fStartDate} flastDate={flastDate} totalWorkHour={totalWorkHour} totalManagementHour={totalManagementHour} />
                        : <div className="text-center py-3"> No Data Found</div>)
                }
                {filterReportType === 'Month Wise Report' &&
                    (Object.entries(monthly).length > 0 ?
                        Object.entries(monthly).map(([index, data]) => {
                            const totalWorkHour = Object.values(data[0]).reduce((total, { workHour }) => total + workHour, 0);
                            const totalManagementHour = Object.values(data[0]).reduce((total, { managementHour }) => total + managementHour, 0);
                            return <TableReport key={index} memberProject={data[0]} fStartDate={data[1]} flastDate={data[2]} totalWorkHour={totalWorkHour} totalManagementHour={totalManagementHour} />
                        })
                        : <div className="text-center py-3"> No Data Found</div>)
                }
                {filterReportType === 'Week Wise Report' &&
                    (Object.entries(weekly).length > 0 ?
                        Object.entries(weekly).map(([index, data]) => {
                            const totalWorkHour = Object.values(data[0]).reduce((total, { workHour }) => total + workHour, 0);
                            const totalManagementHour = Object.values(data[0]).reduce((total, { managementHour }) => total + managementHour, 0);
                            return <TableReport key={index} memberProject={data[0]} fStartDate={data[1]} flastDate={data[2]} totalWorkHour={totalWorkHour} totalManagementHour={totalManagementHour} />
                        })
                        : <div className="text-center py-3"> No Data Found</div>)
                }
            </div>
        </>
    );
}

// Exporting the component
export default ActivitySummary;
