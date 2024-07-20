import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import MyMedication from './components/MyMedication';
import AddMedication from './components/AddMedication';
import { UserProvider } from './components/UserContext';
import { MedicationProvider } from './contexts/MedicationContexts';

function App() {
  return (
    <UserProvider>
      <MedicationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path='/medications' element={<MyMedication/>}/>
            <Route path='/medication/add' element= {<AddMedication/>}/>
          </Routes>
        </Router>
      </MedicationProvider>
    </UserProvider>

  )
}

export default App;
