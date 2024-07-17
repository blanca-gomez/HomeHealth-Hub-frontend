import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import { UserProvider } from './components/UserContext';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />

        </Routes>
      </UserProvider>
      
    </Router>
  )
}

export default App;
