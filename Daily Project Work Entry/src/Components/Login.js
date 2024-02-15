import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import globalContext from '../Context/notes/globalContext';
import './css/style.css';

const Login = () => {
    // State for password visibility
    const [typeField, setTypeField] = useState("password");

    // Accessing global context for alerts
    const gContext = useContext(globalContext);
    const { showAlert } = gContext;

    // State for user credentials
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    // Navigation hook for redirecting
    const history = useNavigate();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sending login request
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email.toLowerCase(), password: credentials.password })
        });
        
        // Parsing response JSON
        const json = await response.json();
        
        // Handling success or failure
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            showAlert("Logged in Successfully", 'success');
            history('/');
        } else {
            showAlert("Invalid Details", 'danger');
        }
    };

    // Function to handle input changes
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Function to toggle password visibility
    const visible = (e) => {
        setTypeField(typeField === "password" ? "text" : "password");
    };

    // Setting body background color
    document.body.style.backgroundColor = '#e4e6ee';

    return (
        <>
            <Alert />
            <div className='container  mx-auto p-5 login-style' style={{ marginTop: '120px', width: '40%' }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal py-3 fw-semibold">LOG IN</h1>
                    <div className="py-2 m-1">
                        <input type="email" className="input-border form-control" id="email" value={credentials.email.toLowerCase()} onChange={onchange} name='email' aria-describedby="emailHelp" required placeholder="Email Address" />
                    </div>
                    <div className="py-2 m-1 ">
                        <div className="input-border form-control d-flex">
                            <input type={typeField} className='w-100 ' id="password" value={credentials.password} onChange={onchange} name='password' required placeholder="Password" style={{ outline: 'none', border: 'none' }} />
                            <span className=" flex-shrink-1" onClick={visible}>
                                {typeField === 'password' ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                </svg>}
                            </span>
                        </div>
                    </div>
                    <div className=" py-2 m-1">
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </div>
                    <div className=" m-1">
                        <Link className="m-1" id='label-forget' to="/emailsender">Forgot your password?</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
