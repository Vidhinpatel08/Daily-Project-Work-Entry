import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Forgot = () => {
    const history = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "", cpassword: "" })

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password, cpassword } = credentials;

        if (password !== cpassword) {
            // props.showAlert("Comfirm Password not match", 'warning')
            console.log("Comfirm Password not match", 'warning')
            return
        }
        const response = await fetch("http://localhost:5000/api/auth/resetPassword", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // change hardcode token 
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        if (json.success) {
            // props.showAlert("Account Created Sucessfully", 'success')
            console.log("Account Created Sucessfully", 'success')
            history('/login')
        }
        else {
            console.log("Invalid Credentials", 'danger')
        }
    }

    return (
        <div className='container my-2  mx-auto p-5 login-style'>
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal py-3 fw-semibold">Reset Password</h1>
                <div className="py-2 m-1">
                    <input type="email" className="input-border form-control" id="email" value={credentials.email} onChange={onchange} name='email' aria-describedby="emailHelp" required placeholder="Email Address" />
                </div>
                <div className="py-2 m-1">
                    <input type="password" className="input-border form-control" id="password" value={credentials.password} onChange={onchange} name='password' required minLength={5} placeholder="New Password" />
                </div>
                <div className="py-2 m-1">
                    <input type="password" className="input-border form-control" id="Cpassword" value={credentials.cpassword} onChange={onchange} name='cpassword' required minLength={5} placeholder="Confirm  New Password" />
                </div>
                <button type="submit" className="btn btn-success px-3 m-2">Reset</button>
                <Link role='button' to='/' className="btn btn-dark px-3 mx-4">Cancel</Link>
            </form>
        </div>
    )
}

export default Forgot
