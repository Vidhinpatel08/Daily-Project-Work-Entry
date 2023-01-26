import React from 'react'
import './Components/css/sidebar.css';
import Sidebar from './Components/Sidebar';
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
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

export default function App() {
  return (
    <div>
      <GlobalState>
        <Router>
          <Routes>
            <Route path='/login' element={(<Login />)}></Route>
            <Route path='/emailsender' element={(<ForgotPassword/>)}></Route>
            <Route path='*' element={(
              <>
                <Navbar />
                <Sidebar>
                  <Routes>
                    <Route path='/' element={(<DPRSState><Dashboard /></DPRSState>)}></Route>
                    <Route path='/dashboard' element={(<DPRSState><Dashboard /></DPRSState>)}></Route>
                    <Route path='/dprs' element={(<DPRSState><Dprs /></DPRSState>)}></Route>
                    <Route path='/project' element={(<ProjectState><Projects /></ProjectState>)}></Route>
                    <Route path='/member' element={(<NoteState><Member /></NoteState>)}></Route>
                    <Route path='/client' element={(<ProjectState><ClientList /></ProjectState>)}></Route>
                    <Route path='/activitydetails' element={(<DPRSState><ActivityDetails /></DPRSState>)}></Route>
                    <Route path='/activitysummary' element={(<DPRSState><ActivitySummary /></DPRSState>)}></Route>
                    <Route path='/userprofile' element={(<UserProfile />)}></Route>
                    <Route path='/forgetpassword' element={(<ResetPassword />)}></Route>
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
