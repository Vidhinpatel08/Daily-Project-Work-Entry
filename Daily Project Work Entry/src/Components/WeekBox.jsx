import React, { useContext } from 'react'
import globalContext from '../Context/notes/globalContext';


const WeekBox = (props) => {
  const gContext = useContext(globalContext)
  const { sidebarIsOpen } = gContext;
  const { StartDate, lastDate, workHour, managementHour } = props
  const dates = (date) => {
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
  else if (workHour <= 2000) {
    styleColor = 'rgb(239 239 239)'
  }
  else if (workHour <= 5000) {
    styleColor = 'rgb(237 237 237)'
  }
  else if (workHour <= 8000) {
    styleColor = 'rgb(234 234 234)'
  }
  else {
    styleColor = 'rgb(225 225 225)'
  }

  return (
    <>
      <div className='border text-center px-1 py-3 my-1 rounded' style={{ width: sidebarIsOpen ? '154px' : '170px', fontFamily: "sans-serif", backgroundColor: styleColor }}>
        <div className='fw-bold pb-1'>{dates(StartDate)} ~ {dates(lastDate)}</div>
        <div>WH - {minutesToTime(workHour)}</div>
        <div>MH - {minutesToTime(managementHour)}</div>
      </div>
    </>
  )
}

export default WeekBox
