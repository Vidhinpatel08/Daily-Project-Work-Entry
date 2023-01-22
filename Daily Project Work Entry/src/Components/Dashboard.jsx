import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>        <>
      <div className="topbar  p-2 m-2 mt-1" style={{ backgroundColor: 'white', color: '#a40df1', fontFamily: 'emoji', borderBottom: '0.5px solid #c1bebe' }}>
        DASHBOARD
      </div>
      <div className="mx-2 px-3 " style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }}>
        dashboard
      </div>
    </>




    </>
  )
}

export default Dashboard
