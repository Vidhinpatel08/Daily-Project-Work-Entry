import React, { useContext } from 'react'
import globalContext from '../Context/notes/globalContext';

const WorkSummaryBox = (props) => {
    const gContext = useContext(globalContext)
    const { sidebarIsOpen } = gContext;
    const { date, entry, workHour, managementHour } = props
    const day = (date) => {
        let dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saterday']
        let d = new Date(date).getDay()
        if (date === 'Week') { return 'Week Days' }
        return dayList[d]
    }
    const formateDate = (date) => {
        if (date === 'Week') { return date }
        let d = new Date(date).toString().split(' ')
        return `${d[2]}-${d[1]}`
    }
    const minutesToTime = (minutes) => {
        let h = Math.floor(minutes / 60);
        let m = minutes % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return h + ':' + m;
    }
    let styleColor;
    if (workHour === 0) {
        styleColor = 'white'
    }
    else if (workHour <= 6000) {
        styleColor = 'rgb(239 239 239)'
    }
    else if (workHour <= 12000) {
        styleColor = '#ededed'
    }
    else if (workHour <= 18000) {
        styleColor = 'rgb(234 234 234)'
    }
    else {
        styleColor = 'rgb(225 225 225)'
    }
    let wpd = 480
    let defaultMH = date === 'Week' ? minutesToTime(managementHour) : '27:00'

    return (
        <>
            <div className='border text-center px-4 py-2 my-1 rounded' style={{ width: sidebarIsOpen ? '150px' : '170px', fontFamily: "sans-serif", backgroundColor: styleColor }}>
                <div className='fw-bold '>{formateDate(date)} ({entry})</div>
                <div className='py-1'>({day(date)})</div>
                <div>{minutesToTime(workHour)}/{minutesToTime(wpd * entry)}</div>
                <div>{minutesToTime(managementHour)}/{defaultMH}</div>

            </div>
        </>
    )
}

export default WorkSummaryBox

