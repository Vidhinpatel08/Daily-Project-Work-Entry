import React, { useState } from 'react'
import './css/style.css'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login-reset-password", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        const json = await response.json();
        if (json.success) {
            alert('Email senting successfully')
            navigate("/login");
        }
        else {
            console.log("Invalid Details", 'danger')
        }
    }
    document.body.style.backgroundColor = '#e4e6ee'
    return (
        <>
            <div className='container  mx-auto px-4  py-4 login-style rounded' style={{ marginTop: '12%', width: '550px' }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal py-3 fw-semibold">Reset Password</h1>
                    <div className="py-2 m-1" >
                        <input type="email" className="input-border form-control rounded" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} name='email' aria-describedby="emailHelp" required placeholder="Email Address" style={{ color: 'black', backgroundColor: '#e4e6ee' }} />
                    </div>
                    <div className=" py-2 m-1 text-center">
                        <button type="submit" className="btn btn-primary text-center w-50">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword
