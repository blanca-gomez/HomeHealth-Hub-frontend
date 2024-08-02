import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import MyMedication from './components/MyMedication';
import MedicationForm from './components/MedicationForm';
import MyVitals from './components/MyVitals';
import AddVital from './components/AddVital';
import MyAppoinments from './components/MyAppoinments';
import AddAppoinment from './components/AddAppoinment';
import User from './components/User';
import UpdateMedication from './components/UpdateMedication';
import Updatevital from './components/UpdateVital';
import UpdateAppointment from './components/UpdateAppoinment';
import { UserProvider } from './components/UserContext';
import { MedicationProvider } from './contexts/MedicationContexts';
import { VitalProvider } from './contexts/VitalsContext';
import { AppoinmentProvider } from './contexts/AppoinmentContext';


function App() {
  return (
    <UserProvider>
      <MedicationProvider>
        <VitalProvider>
          <AppoinmentProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signIn" element={<SignIn/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/user" element={<User/>} />
                <Route path='/medications' element={<MyMedication/>}/>
                <Route path='/medication/add' element= {<MedicationForm/>}/>
                <Route path="/medication/edit/:id" element={<UpdateMedication />} />
                <Route path='/vitals' element={<MyVitals/>}/>
                <Route path='/vitals/add' element= {<AddVital/>}/>
                <Route path="/vitals/edit/:id" element={<Updatevital />} />
                <Route path='/appoinments' element={<MyAppoinments/>}/>
                <Route path='/appoinments/add' element= {<AddAppoinment/>}/>
                <Route path="/appoinments/edit/:id" element={<UpdateAppointment/>} />
              </Routes>
            </Router>
          </AppoinmentProvider>
        </VitalProvider>
      </MedicationProvider>
    </UserProvider>
  )
}

export default App;
