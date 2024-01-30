import Navbar from './Components/Navbar';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import { useState } from 'react';
import Dashboard from './Pages/Dashboard';
import PrivateRoute from './Pages/PrivateRoute';

function App() {
  const[isLoggedIn, setIsLoggedIn]=useState(false);
  return (
  <div className="w-full h-full bg-richblack-900 flex flex-col">
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    <Routes>
      <Route path='/' element={<Home isLoggedIn={isLoggedIn}/>}/>
      <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path='/signup' element={<Signup setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path='/dashboard' element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <Dashboard/>
        </PrivateRoute>
      }/>
    </Routes>
  </div>
  );
}

export default App;
