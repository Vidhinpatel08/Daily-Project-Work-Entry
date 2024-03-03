// Importing necessary modules and components
import React, { useState, useContext } from 'react'; // Importing React and hooks
import './css/style.css'; // Importing CSS file for styling
import { useNavigate } from 'react-router-dom'; // Importing hook for programmatic navigation
import Alert from '../Alert'; // Importing Alert component
import globalContext from '../Context/notes/globalContext'; // Importing global context

// Functional component for Forgot Password page
const ForgotPassword = () => {
    const host = process.env.REACT_APP_BACKEND_HOSTING

    // Accessing global context
    const gContext = useContext(globalContext);
    const { showAlert } = gContext; // Destructuring showAlert function from context
    const navigate = useNavigate(); // Getting navigate function from react-router-dom
    const [email, setEmail] = useState(''); // State variable for email input

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Preventing default form submission behavior
        try {
            // Sending POST request to reset password endpoint
            const response = await fetch(`${host}/api/auth/login-reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }) // Sending email in request body
            });
            const json = await response.json(); // Parsing response JSON
            if (json.success) {
                showAlert('Email sent successfully', 'success'); // Showing success alert
                navigate("/login"); // Navigating to login page after successful email sending
            } else {
                showAlert('Request not sent... Try Again !!', 'danger'); // Showing failure alert
            }            
        } catch (error) {
            console.error('Internal Error occurred:', error); // Logging internal error
            showAlert('Request not sent... Try Again !!', 'danger'); // Showing failure alert
        }
    }

    // Styling body background color
    document.body.style.backgroundColor = '#e4e6ee';

    // JSX structure for Forgot Password page
    return (
        <>
            <Alert /> {/* Rendering Alert component */}
            <div className='container mx-auto px-4 py-4 login-style rounded' style={{ marginTop: '12%', width: '550px' }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal py-3 fw-semibold">Reset Password</h1>
                    <div className="py-2 m-1">
                        <input 
                            type="email" 
                            className="input-border form-control rounded" 
                            id="email" 
                            value={email} 
                            onChange={(e) => { setEmail(e.target.value) }} 
                            name='email' 
                            aria-describedby="emailHelp" 
                            required 
                            placeholder="Email Address" 
                            style={{ color: 'black', backgroundColor: '#e4e6ee' }} 
                        />
                    </div>
                    <div className="py-2 m-1 text-center">
                        <button type="submit" className="btn btn-primary text-center w-50">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ForgotPassword; // Exporting ForgotPassword component
