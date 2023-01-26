import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import globalContext from '../Context/notes/globalContext';


const ResetPassword = () => {
    const host = `http://localhost:5000`
    const gContext = useContext(globalContext)
    const { userdata, user } = gContext;
    const history = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "", cpassword: "" })

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { password, cpassword } = credentials;

        if (password !== cpassword) {
            // props.showAlert("Comfirm Password not match", 'warning')
            console.log("Comfirm Password not match", 'warning')
            return
        }
        console.log('Submit', password)
        const response = await fetch(`${host}/api/auth/resetPassword/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password })
            });
            const json = await response.json();
            if (json.success) {
            //     // props.showAlert("Account Created Sucessfully", 'success')
                console.log("Password Edited Sucessfully", 'success')
                history('/login')
            }
            else {
                console.log("Invalid Credentials", 'danger')
            }
        }

    if (credentials.email === '' || credentials.email === undefined) {
            credentials.email = user ? user.email : ''
        }

        useEffect(() => {
            userdata()
            // eslint-disable-next-line
        }, [])

        return (
            <div className='container   mx-auto px-5 py-4 login-style'  style={{marginTop:'120px',width:'45%'}}> 
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal py-3 fw-semibold">Reset Password</h1>
                    <div className="py-2 m-1">
                        <input type="email" className="input-border form-control" id="email" value={credentials.email} disabled name='email' aria-describedby="emailHelp" required placeholder="Email Address" />
                    </div>
                    <div className="py-2 m-1">
                        <input type="password" className="input-border form-control" id="password" value={credentials.password} onChange={onchange} name='password' required minLength={5} placeholder="New Password" />
                    </div>
                    <div className="py-2 m-1">
                        <input type="password" className="input-border form-control" id="Cpassword" value={credentials.cpassword} onChange={onchange} name='cpassword' required minLength={5} placeholder="Confirm  New Password" />
                    </div>
                    <div className="">
                    <button type="submit" className="btn text-center btn-success px-3 m-2">Reset</button>
                    {/* <Link role='button' to='/' className="btn btn-dark px-3 mx-4">Cancel</Link> */}
                    </div>
                </form>
            </div>
        )
    }

    export default ResetPassword
