import React from 'react'
import './App.css';
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Member from './Components/Member';
import NoteState from './Context/notes/NodeState';
import Projects from './Components/Projects';
import ProjectState from './Context/notes/ProjectState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Forgot from './Components/Forgot';


export default function App() {
  return (
    <div>
      <Router>
        <div className="">
          <Routes>
            <Route path='/' element={(<Dashboard />)}></Route>
            <Route path='/login' element={(<Login />)}></Route>
            <Route path='/forgetpassword' element={(<Forgot />)}></Route>
            <Route path='/member' element={(<NoteState><Member /></NoteState>)}></Route>
            <Route path='/project' element={(<ProjectState><Projects /></ProjectState>)}></Route>
          </Routes>
        </div>
      </Router>
    </div >
  )
}
