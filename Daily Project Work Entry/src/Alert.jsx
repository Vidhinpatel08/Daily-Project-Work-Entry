import React, { useContext } from 'react';

// Importing the global context from './Context/notes/globalContext'
import globalContext from './Context/notes/globalContext';

// Alert component definition
const Alert = () => {
    // Accessing global context using useContext hook
    const gContext = useContext(globalContext);
    const { alert } = gContext;

    // Function to capitalize the first letter of a word
    const capitalized = (word) => {
        // If the word is 'danger', replace it with 'error'
        if (word === 'danger') {
            word = 'error';
        }
        let newText = word.toLowerCase();
        return newText.charAt(0).toUpperCase() + newText.slice(1);
    };

    // Function to return the appropriate symbol based on the type
    const symbols = (type) => {
        // If type is 'danger', return an exclamation triangle SVG icon
        if (type === 'danger') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                    <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                    <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                </svg>
            );
        }
        // If type is 'success', return a checkmark circle SVG icon
        else if (type === 'success') {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                </svg>
            );
        }
        // If type is neither 'danger' nor 'success', return a diamond exclamation fill SVG icon
        else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
                    <path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
            );
        }
    };

    // JSX return statement
    return (
        <div className="my-1 " style={{ height: alert ? '15px' : '',  zIndex: 5, position:'fixed', right:'1%' }}>   
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show py-3  px-3 rounded-pill border border-dark`} role="alert" >
                <strong>{symbols(alert.type)}   {capitalized(alert.type)} : </strong> {alert.msg}
            </div>}
        </div>
    );
};

// Exporting the Alert component as default
export default Alert;
