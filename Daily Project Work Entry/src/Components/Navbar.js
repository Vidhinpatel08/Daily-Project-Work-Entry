import React from 'react'
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    let navigate = useNavigate();
    let location = useLocation() // for navbar active button

    const handlelogout = () => {
        localStorage.removeItem('token')
        navigate("/signup");
        props.showAlert("Logout Successfully",'success')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? 'active' : ''}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ?
                            <div className=''>
                                <Link role="button" to='/login' className="btn btn-outline-light btn-dark mx-1 fw-bold">Login</Link>
                                <Link role="button" to='/signup' className="btn btn-outline-light btn-dark mx-1 fw-bold">Signup</Link>
                            </div> :
                            <div>
                                <Link role="button" to='/login' onClick={(handlelogout)} className="btn btn-outline-light btn-dark mx-1 fw-bold">Logout</Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

