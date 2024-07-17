import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
 
  return (
   <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
      </Routes>
   </Router>
  )
}

export default App;
