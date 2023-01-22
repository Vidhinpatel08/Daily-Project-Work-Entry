import React from 'react'

const SummaryItems = (props) => {
    const { project, workHour, managementHour } = props

    const minutesToTime = (minutes) => {
        let h = Math.floor(minutes / 60);
        let m = minutes % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return h + ':' + m;
    }
    return (
        <>
            <tr className={`${project}` === 'Total' ? 'fw-bold':''}>
                <td className='w-50'>{project === '' ? 'N/A' : project}</td>
                <td>{minutesToTime(workHour)}</td>
                <td>{minutesToTime(managementHour)}</td>
            </tr>
        </>
    )
}

export default SummaryItems

