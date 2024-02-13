import React, { useState, useContext } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import globalContext from '../Context/notes/globalContext';


const ResetPassword = () => {
    const host = `http://localhost:5000`
    const gContext = useContext(globalContext)
    const [typeFiled, setTypeField] = useState("password")
    const [typeFiledConfirm, setTypeFieldConfirm] = useState("password")
    const { userdata, user, showAlert } = gContext;
    const history = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "", cpassword: "" })

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const visible = (e) => {
        setTypeField(typeFiled === "password" ? "text" : "password")
    }

    const ConfirmVisible = (e) => {
        setTypeFieldConfirm(typeFiledConfirm === "password" ? "text" : "password")
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { password, cpassword } = credentials;

        if (password !== cpassword) {
            showAlert("Passwords do not match. Please re-enter your passwords.", 'warning')
            return
        }
        const response = await fetch(`${host}/api/auth/resetPassword/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password })
        });
        const json = await response.json();
        if (json.success) {
            showAlert("Password Edited Sucessfully", 'success')
            history('/')
        }
        else {
            showAlert("Invalid Credentials", 'danger')
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
        <div className='container   mx-auto px-5 py-4 login-style' style={{ marginTop: '120px', width: '45%' }}>
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal py-3 fw-semibold">Reset Password</h1>
                <div className="py-2 m-1">
                    <input type="email" className="input-border form-control" id="email" value={credentials.email} disabled name='email' aria-describedby="emailHelp" required placeholder="Email Address" />
                </div>
                <div className="py-2 m-1 ">
                        <div className="input-border form-control d-flex">
                            <input type={typeFiled} className="w-100" id="password" value={credentials.password} onChange={onchange} name='password' required placeholder="New Password" style={{ outline: 'none', border: 'none' }} />
                            <span className=" flex-shrink-1" onClick={visible}>
                                {typeFiled === 'password' ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                </svg>}
                            </span>
                        </div>
                    </div>
                <div className="py-2 m-1 ">
                        <div className="input-border form-control d-flex">
                            <input type={typeFiledConfirm} className="w-100" id="Cpassword" value={credentials.cpassword} onChange={onchange} name='cpassword' required placeholder="Confirm  New Password" style={{ outline: 'none', border: 'none' }} />
                            <span className=" flex-shrink-1" onClick={ConfirmVisible}>
                                {typeFiledConfirm === 'password' ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                </svg>}
                            </span>
                        </div>
                    </div>
                <div className="">
                    <button type="submit" className="btn text-center btn-success px-3 m-2">Reset</button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
