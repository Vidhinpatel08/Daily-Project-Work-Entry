import React from 'react'
import './index.css'
const ErrorPage = () => {

    return (
        <>
            <div className='container mx-auto login-style' id='error-page'>
                <div className="error-message">
                    <h1 className="h3 mb-3 fw-normal py-2 fw-semibold" id='Error-Message'>DPRS Error</h1>
                    <p>An error has occurred. Please try again later.</p>
                </div>

                <div className="error-actions m-0 p-0">
                    <button onClick={() => window.history.back()} className="btn btn-primary px-3 m-2 btn-errorpage">Go Back</button>
                    <a href="mailto:support@dprs.com" className="btn btn-primary px-3 m-2 btn-errorpage">Contact Support</a>
                </div>
            </div>

        </>
    )
};

// Exporting the Alert component as default
export default ErrorPage;
