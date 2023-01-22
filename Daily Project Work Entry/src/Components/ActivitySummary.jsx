import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../Context/notes/notecontext'
import TableReport from './TableReport'

const ActivitySummary = () => {
    // filter Date
    let d = new Date().toString().split(' ')
    let Month = new Date().getMonth() + 1
    const MonthDate = `${d[3]}-${Month < 10 ? `0${Month}` : Month}-01`
    const Today = `${d[3]}-${Month < 10 ? `0${Month}` : Month}-${d[2]}`

    const context = useContext(noteContext);
    const { userdata, getMember, members, user, DPRS, getdprs } = context;
    const [fromDate, setFromDate] = useState(`${MonthDate}`)
    const [toDate, setToDate] = useState(`${Today}`)
    const [filterMember, setFilterMember] = useState(`${user}`)
    const [filterReportType, SetFilterReportType] = useState('Project Wise Report')
    const [select, setSelect] = useState('')
    const [memberProject, setMemberProject] = useState({})
    const [monthly, setMonthly] = useState([])
    const [weekly, setWeekly] = useState([])

    const onchange = (e) => {
        setFilterMember(e.target.value)
        setSelect(e.target.value)
    }
    const clickme = (e) => {
        userdata()
        if (!select) {
            setSelect(user)
        }
        if (filterMember === 'undefined') {
            setFilterMember(user)
        }
    }
    const data = (fromDate, toDate, filterMember) => {
        const projectData = []
        DPRS.filter((dprs) => {
            return new Date(dprs.date).getTime() >= new Date(fromDate).getTime()
        }).filter((dprs) => {
            return new Date(dprs.date).getTime() <= new Date(toDate).getTime()
        }).filter((dprs) => {
            return dprs.member === (`${filterMember}` === 'undefined' ? `${user}` : `${filterMember}`)
        }).forEach((dprs) => {
            const workHourInMinutes = parseInt(dprs.workHour.split(':')[0] * 60) + parseInt(dprs.workHour.split(':')[1])
            const managementHourInMinutes = parseInt(dprs.managementHour.split(':')[0] * 60) + parseInt(dprs.managementHour.split(':')[1])
            // Check if project already exists in object
            if (projectData[dprs.project]) {
                // Add to existing hours
                projectData[dprs.project].workHour += workHourInMinutes
                projectData[dprs.project].managementHour += managementHourInMinutes
            } else {
                // Create new project key-value pair
                projectData[dprs.project] = {
                    workHour: workHourInMinutes,
                    managementHour: managementHourInMinutes
                }
            }
        })
        setMemberProject(projectData)
        return projectData

    }

    const datafetch = (e) => {
        userdata()
        setMonthly([])
        setWeekly([])
        if (DPRS !== undefined && DPRS.length !== 0 && filterReportType === 'Project Wise Report') {
            data(fromDate, toDate, filterMember)
        }
        else if (DPRS !== undefined && DPRS.length !== 0 && filterReportType === 'Month Wise Report') {
            // Parse the fromDate and toDate strings into Date objects
            let fromD = new Date(fromDate);
            let toD = new Date(toDate);
            let current = new Date(fromD);
            // variable to store start and end date of each month
            let start, end;
            // Iterate through each month between the fromDate and toDate

            while (current <= toD) {
                // Get the start date of the current month
                start = new Date(current.getFullYear(), current.getMonth(), 1);
                // Get the end date of the current month
                end = new Date(current.getFullYear(), current.getMonth() + 1, 0);
                //Call the data function with the start and end date of the current month and filter member
                let dd = new Date(start).toString().split(' ')
                let fStartDate = `${dd[3]}-${(start.getMonth() + 1) < 10 ? `0${start.getMonth() + 1}` : start.getMonth() + 1}-${dd[2]}`
                let ddd = new Date(end).toString().split(' ')
                let flastDate = `${ddd[3]}-${(start.getMonth() + 1) < 10 ? `0${end.getMonth() + 1}` : end.getMonth() + 1}-${ddd[2]}`
                let come = data(fStartDate, flastDate, filterMember);

                setMonthly(monthly => [...monthly, [come, fStartDate, flastDate]])

                // Set the current date to the first day of the next month
                current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
            }
        }
        else if (DPRS !== undefined && DPRS.length !== 0 && filterReportType === 'Week Wise Report') {
            // Parse the fromDate and toDate strings into Date objects
            let fromD = new Date(fromDate);
            let toD = new Date(toDate);
            let current = new Date(fromD);
            // variable to store start and end date of each month
            let start, end;
            // Iterate through each month between the fromDate and toDate

            while (current <= toD) {
                // Get the start date of the current week
                start = new Date(current);
                start.setDate(start.getDate() - start.getDay());
                // Get the end date of the current week
                end = new Date(current);
                end.setDate(end.getDate() - end.getDay() + 6);

                //Call the data function with the start and end date of the current month and filter member
                let dd = new Date(start).toString().split(' ')
                let fStartDate = `${dd[3]}-${(start.getMonth() + 1) < 10 ? `0${start.getMonth() + 1}` : start.getMonth() + 1}-${dd[2]}`
                let ddd = new Date(end).toString().split(' ')
                let flastDate = `${ddd[3]}-${(start.getMonth() + 1) < 10 ? `0${end.getMonth() + 1}` : end.getMonth() + 1}-${ddd[2]}`
                let come = data(fStartDate, flastDate, filterMember);

                setWeekly(weekly => [...weekly, [come, fStartDate, flastDate]])

                // Set the current date to the first day of the next week
                current.setDate(current.getDate() + 7);
                if (current > toD) {
                    break;
                }
            }
        }

    }
    useEffect(() => {
        getMember()
        userdata()
        getdprs()
        if (!select) {
            setSelect(user)
            setFilterMember(user)
        }
        datafetch()
        // eslint-disable-next-line
    }, [])

    // for Project wise report
    const totalWorkHour = Object.values(memberProject).reduce((total, { workHour }) => total + workHour, 0);
    const totalManagementHour = Object.values(memberProject).reduce((total, { managementHour }) => total + managementHour, 0);

    let dd = new Date(fromDate).toString().split(' ')
    let fStartDate = `${dd[1]} ${dd[2]}, ${dd[3]}`
    let ddd = new Date(toDate).toString().split(' ')
    let flastDate = `${ddd[1]} ${ddd[2]}, ${ddd[3]}`

    return (
        <>
            <div className="topbar  p-2 m-2 mt-1" style={{ backgroundColor: 'white', color: '#a40df1', fontFamily: 'emoji', borderBottom: '0.5px solid #c1bebe' }} >
                USER ACTIVITY SUMMARY
            </div>
            <div className="mx-2 p-3 " style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }} onMouseEnter={clickme} >
                {/* Filter Modal  */}
                <div className="m-2  row ">
                    <div className="col-lg-2  AddMember-mobile-style">
                        <div className='fs-6 fw-light '>From Date</div>
                        <input type="date" className='bottom-border ' value={fromDate} onChange={(e) => setFromDate(e.target.value)} name="fromDate" required />
                    </div>
                    <div className="col-lg-2  AddMember-mobile-style">
                        <div className='fs-6 fw-light '>To Date</div>
                        <input type="date" className='bottom-border ' value={toDate} onChange={(e) => setToDate(e.target.value)} name="toDate" required />
                    </div>
                    <div className="col-lg-2  AddMember-mobile-style">
                        <div className='fs-6 fw-light'>Select Member</div>
                        <select className="bottom-border " aria-label="filterMember" value={filterMember} onChange={onchange} name="filterMember">
                            <option value={user}>{user}</option>
                            {members.map((member) => { return `${member.firstName} ${member.lastName}` !== user && <option key={member._id} value={`${member.firstName} ${member.lastName}`} > {member.firstName} {member.lastName}</option> })}
                        </select>
                    </div>
                    <div className="col-lg-2   AddMember-mobile-style">
                        <div className='fs-6 fw-light '>Select Project</div>
                        <select className="bottom-border" aria-label="filterReportType" value={filterReportType} onChange={(e) => SetFilterReportType(e.target.value)} name="filterReportType" >
                            <option value='Project Wise Report'>Project Wise Report</option>
                            <option value='Month Wise Report'>Month Wise Report</option>
                            <option value='Week Wise Report'>Week Wise Report</option>
                        </select>
                    </div>
                    <div className="col-lg-2 px-5 AddMember-mobile-style">
                        <button type="button" className="btn btn-primary" onClick={datafetch}>search</button>
                    </div>
                </div>

                <div className=" text-center">
                    <div className="container fw-bold">
                        <div className='py-4'>
                            {filterMember === undefined ? `${user}` : filterMember} - Activity Summary Report
                        </div>
                    </div>
                </div>

                {/* table Modal  */}
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
    )
}

export default ActivitySummary
