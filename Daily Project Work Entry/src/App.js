// Importing necessary modules and components
import React from 'react';
import './Components/css/sidebar.css';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Member from './Components/Member';
import NoteState from './Context/notes/NodeState';
import Projects from './Components/Projects';
import ProjectState from './Context/notes/ProjectState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './Components/UserProfile';
import Navbar from './Components/Navbar';
import ClientList from './Components/ClientList';
import Dprs from './Components/Dprs';
import DPRSState from './Context/notes/DPRSState';
import ActivityDetails from './Components/ActivityDetails';
import ActivitySummary from './Components/ActivitySummary';
import GlobalState from './Context/notes/GlobalState';
import ResetPassword from './Components/ResetPassword';
import ForgotPassword from './Components/ForgotPassword';
import Alert from './Alert';
import ErrorPage from './ErrorPage';


// Exporting the component
export default function App() {
  return (
    <div>
      {/* Wrap the entire application in GlobalState */}
      <GlobalState>
        <Router>
          <Routes>
            {/* Route for login */}
            <Route path='/login' element={(<Login />)}></Route>
            {/* Route for forgot password */}
            <Route path='/emailsender' element={(<ForgotPassword />)}></Route>
            {/* Catch-all route */}
            <Route path='*' element={(
              <>
                {/* Display navbar and alert component */}
                <Navbar />
                <Alert />
                {/* Sidebar with nested routes */}
                <Sidebar>
                  <Routes>
                    {/* Default route */}
                    <Route path='/' element={(<DPRSState><Dashboard /></DPRSState>)}></Route>
                    {/* Route for dashboard */}
                    <Route path='/dashboard' element={(<DPRSState><Dashboard /></DPRSState>)}></Route>
                    {/* Route for DPRS */}
                    <Route path='/dprs' element={(<DPRSState><Dprs /></DPRSState>)}></Route>
                    {/* Route for projects */}
                    <Route path='/project' element={(<ProjectState><Projects /></ProjectState>)}></Route>
                    {/* Route for members */}
                    <Route path='/member' element={(<NoteState><Member /></NoteState>)}></Route>
                    {/* Route for client list */}
                    <Route path='/client' element={(<ProjectState><ClientList /></ProjectState>)}></Route>
                    {/* Route for activity details */}
                    <Route path='/activitydetails' element={(<DPRSState><ActivityDetails /></DPRSState>)}></Route>
                    {/* Route for activity summary */}
                    <Route path='/activitysummary' element={(<DPRSState><ActivitySummary /></DPRSState>)}></Route>
                    {/* Route for user profile */}
                    <Route path='/userprofile' element={(<UserProfile />)}></Route>
                    {/* Route for reset password */}
                    <Route path='/forgetpassword' element={(<ResetPassword />)}></Route>
                    {/* Route for Error */}
                    <Route path='/errorpage' element={(<ErrorPage></ErrorPage>)}></Route>
                    {/* Route for Error */}
                    <Route path='*' element={(<ErrorPage></ErrorPage>)}></Route>
                  </Routes>
                </Sidebar>
              </>
            )}>
            </Route>
          </Routes >
        </Router>
      </GlobalState>
    </div >
  )
}
