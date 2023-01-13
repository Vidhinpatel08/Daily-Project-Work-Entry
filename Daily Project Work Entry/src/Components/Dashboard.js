import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {

    }
    else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])
  const handlelogout = () => {
    localStorage.removeItem('token')
    navigate("/login");
    console.log("Logout Successfully",'success')
}
  return (
    <>
      <div className='container my-2  mx-auto p-5 login-style'>
            <h1 className="h3 mb-3 fw-normal py-3 fw-semibold">Dashboard</h1>
            <Link role="button" to='/member' className="btn btn-outline-light btn-dark mx-1 fw-bold">Member</Link>
            <Link role="button" to='/project'  className="btn btn-outline-light btn-dark mx-1 fw-bold">Project</Link>
            <Link role="button" to='/project' onClick={(handlelogout)} className="btn btn-outline-light btn-dark mx-1 fw-bold">Logout</Link>
        </div>
    </>
  )
}

export default Dashboard
