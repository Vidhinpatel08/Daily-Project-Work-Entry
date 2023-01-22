import React from 'react'
import SummaryItems from './SummaryItems'

const TableReport = ({ memberProject, fStartDate, flastDate, totalWorkHour, totalManagementHour }) => {
    const converter = (date) => {
        let d = new Date(date).toString().split(' ')
        return `${d[1]} ${d[2]}, ${d[3]}`
    }
    return (
        <>
            <div className='border table-responsive p-1  mx-2 mb-5 border'>
                <div className="mt-2 text-center fw-bold" style={{ color: '#a40df1', fontSize: "18px" }}>
                    {converter(fStartDate)} to {converter(flastDate)} Activity Report
                </div>
                <table className="mt-1 table table-striped table-hover text-center w-100 align-middle p-5" >
                    <thead>
                        <tr className='py-2' style={{ backgroundColor: '#d9d9d9' }}>
                            <th className='w-50'>Project Name</th>
                            <th>Worked Hours</th>
                            <th>Manager Hours</th>
                        </tr>
                    </thead>
                    <tbody >
                        {Object.entries(memberProject).map(([project, hours]) => {

                            return <SummaryItems key={project} project={project} workHour={hours.workHour} managementHour={hours.managementHour} />
                        })}
                        <SummaryItems key={'total'} project={"Total"} workHour={totalWorkHour} managementHour={totalManagementHour} />
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableReport
