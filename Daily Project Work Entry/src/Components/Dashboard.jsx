import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import WorkingCharts from './WorkingCharts';
import WorkingHours from './WorkingHours';
import WorkingList from './WorkingList';
import './css/style.css'
import globalContext from '../Context/notes/globalContext';

const Dashboard = () => {
  const gContext = useContext(globalContext)
  const { showAlert } = gContext;
  const navigate = useNavigate();

  const [isopenGraphs, setIsOpenGraphs] = useState(true)
  const [isopenHours, setIsOpenHours] = useState(true)
  const [isopenList, setIsOpenList] = useState(true)


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      showAlert("Login Required", 'warning')
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="topbar  p-2 m-2 mt-1" style={{ backgroundColor: 'white', color: '#a40df1', fontFamily: 'emoji', borderBottom: '0.5px solid #c1bebe' }}>
        DASHBOARD
      </div>
      <div >

        {/* DAILY, WEEKLY & MONTHLY REPORTS CHARTS  */}
        <div className=""  >
          <div className={isopenGraphs ? 'dashboard-item open m-2 p-3' : 'dashboard-item m-2 p-3'} style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }} aria-activedescendant='active' tabIndex={1}>
            <div className="dashboard-title" onClick={() => { setIsOpenGraphs(!isopenGraphs) }}>
              <span>
                <div className=" justify-content-start" >
                  DAILY, WEEKLY & MONTHLY REPORTS CHARTS
                </div>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" style={{ transition: 'all 0.5s' }} className="bi bi-chevron-down toggle-btn" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
            <div className='dashboard-content p-o mx-0' >
              <WorkingCharts />
            </div>
          </div>
        </div>

        {/* DETAILS OF WORKING HOURS  */}
        <div className="" >
          <div className={isopenHours ? 'dashboard-item open m-2  p-3' : 'dashboard-item m-2 p-3'} style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }} aria-activedescendant='active' tabIndex={1}>
            <div className="dashboard-title" onClick={() => { setIsOpenHours(!isopenHours) }}>
              <span>
                <div className=" justify-content-start" >
                  DETAILS OF WORKING HOURS
                </div>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" style={{ transition: 'all 0.5s' }} className="bi bi-chevron-down toggle-btn" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
            <div className='dashboard-content'>
              <WorkingHours />
            </div>
          </div>
        </div>


        {/* DETAILS OF WORKING LISTS */}
        <div className="" >
          <div className={isopenList ? 'dashboard-item open m-2 p-3' : 'dashboard-item m-2 p-3'} style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }} aria-activedescendant='active' tabIndex={1}>
            <div className="dashboard-title" onClick={() => { setIsOpenList(!isopenList) }}>
              <span>
                <div className=" justify-content-start" >
                  DETAILS OF WORKING LISTS
                </div>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" style={{ transition: 'all 0.5s' }} className="bi bi-chevron-down toggle-btn" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
            <div className='dashboard-content '>
              <WorkingList />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard
