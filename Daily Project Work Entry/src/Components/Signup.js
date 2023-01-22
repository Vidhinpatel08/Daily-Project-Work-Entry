import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const history = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password, cpassword } = credentials;

        if (password !== cpassword) {
            props.showAlert("Comfirm Password not match", 'warning')
            return
        }
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // change hardcode token 
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authToken)
            props.showAlert("Account Created Sucessfully", 'success')
            history('/')
        }
        else {
            props.showAlert("Invalid Credentials", 'danger')
        }
    }
    return (
        <div className='container my-2  mx-auto p-5 login-style'>
            <form onSubmit={handleSubmit}>
            <h1 className="h3 mb-3 fw-normal py-3 fw-semibold">Sign Up</h1>

                <div className="py-2 m-1">
                    <input type="text" className="input-border form-control" id="name" value={credentials.name} onChange={onchange} name='name' placeholder="Name" required />
                </div>
                <div className="py-2 m-1">
                    <input type="email" className="input-border form-control" id="email" value={credentials.email} onChange={onchange} name='email' aria-describedby="emailHelp" required placeholder="Email Address" />
                </div>
                <div className="py-2 m-1">
                    <input type="password" className="input-border form-control" id="password" value={credentials.password} onChange={onchange} name='password' required placeholder="Password" />
                </div>
                <div className="py-2 m-1">
                    <input type="password" className="input-border form-control" id="Cpassword" value={credentials.cpassword} onChange={onchange} name='cpassword' required placeholder="Confirm Password" />
                </div>
                <button type="submit" className="btn btn-primary  my-2">Sign up</button>
            </form>
        </div>
    )
}

export default Signup