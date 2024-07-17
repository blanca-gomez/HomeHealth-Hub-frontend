import React from 'react';
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <>
        <h1>Welcome to HomeHealth</h1>
        <nav>
            <Link to='/signUp'>Sign Up</Link>
            <Link to='/signIn'>Sign In</Link>
            
        </nav>
    </>
  )
};

export default Home;