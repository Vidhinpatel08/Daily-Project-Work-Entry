import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../Context/notes/notecontext';
import DetailsItem from './DetailsItem';

const ActivityDetails = () => {
    // filter Date
    let d = new Date().toString().split(' ')
    let Month = new Date().getMonth() + 1
    const MonthDate = `${d[3]}-${Month < 10 ? `0${Month}` : Month}-01`
    const Today = `${d[3]}-${Month < 10 ? `0${Month}` : Month}-${d[2]}`

    const context = useContext(noteContext);
    const { userdata, getMember, getProject, members, projects, user, DPRS, getdprs } = context;
    const [fromDate, setFromDate] = useState(`${MonthDate}`)
    const [toDate, setToDate] = useState(`${Today}`)
    const [filterMember, setFilterMember] = useState(`${user}`)
    const [filterProject, setFilterProject] = useState('')
    const [select, setSelect] = useState('')

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

    useEffect(() => {
        getProject()
        getMember()
        userdata()
        getdprs()
        if (!select) {
            setSelect(user)
        }
        // eslint-disable-next-line
    }, [])
    // Display Date
    let dd = new Date(fromDate).toString().split(' ')
    let fStartDate = `${dd[1]} ${dd[2]}, ${dd[3]}`
    let ddd = new Date(toDate).toString().split(' ')
    let flastDate = `${ddd[1]} ${ddd[2]}, ${ddd[3]}`
    return (
        <>
            <div className="topbar  p-2 m-2 mt-1" style={{ backgroundColor: 'white', color: '#a40df1', fontFamily: 'emoji', borderBottom: '0.5px solid #c1bebe' }}>
                USER ACTIVITY DETAILS
            </div>
            <div className="mx-2 p-3 " style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }} onClick={clickme}>

                {/* Filter Modal  */}
                <div className="m-2  row ">
                    <div className="col-lg-3 AddMember-mobile-style">
                        <div className='fs-6 fw-light '>From Date</div>
                        <input type="date" className='bottom-border ' value={fromDate} onChange={(e) => setFromDate(e.target.value)} name="fromDate" required />
                    </div>
                    <div className="col-lg-3 AddMember-mobile-style">
                        <div className='fs-6 fw-light '>To Date</div>
                        <input type="date" className='bottom-border ' value={toDate} onChange={(e) => setToDate(e.target.value)} name="toDate" required />
                    </div>
                    <div className="col-lg-3 AddMember-mobile-style">
                        <div className='fs-6 fw-light'>Select Member</div>
                        <select className="bottom-border " aria-label="filterMember" value={filterMember} onChange={onchange} name="filterMember">
                            <option value={user}>{user}</option>
                            {members.map((member) => { return `${member.firstName} ${member.lastName}` !== user && <option key={member._id} value={`${member.firstName} ${member.lastName}`} > {member.firstName} {member.lastName}</option> })}
                        </select>
                    </div>
                    <div className="col-lg-3 AddMember-mobile-style">
                        <div className='fs-6 fw-light '>Select Project</div>
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

                {/* table Modal  */}
                <div className='border table-responsive p-1  m-2'>
                    <div className="mt-2 text-center fw-bold" style={{ color: '#a40df1', fontSize: "18px" }}>
                        Member Name : {filterMember === 'undefined' ? `${user}` : filterMember}
                    </div>
                    <table className="mt-1 table table-striped table-hover text-center w-100 align-middle p-5" >
                        <thead>
                            <tr className='py-2' style={{ backgroundColor: '#d9d9d9' }}>
                                <th>Worked Date</th>
                                <th>Project Name</th>
                                <th>Description</th>
                                <th>Worked Hours</th>
                                <th>Manager Hours</th>
                            </tr>
                        </thead>
                        <tbody  >
                            {DPRS !== undefined ?
                                (DPRS.length === 0 ? <tr></tr> :
                                    DPRS.filter((dprs) => {
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

export default ActivityDetails
