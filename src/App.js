import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Home/Home';
import Navbar from './Navbar/Navbar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './Regester/Register';
import { Login } from './Login/Login';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProRoutes from './ProRoutes/ProRoutes.jsx';








function App() {


  let [loginData, setLoginData] = useState(null)
  function setUserData() {
    let token = localStorage.getItem('token'); //decoded
    const decoded = jwtDecode(token);
    setLoginData(decoded)
    console.log(decoded);
  }


  function logout() {
    localStorage.removeItem('token');
    setLoginData(null)
    navigate('/login')
  }


  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUserData()//because navigation of login to home return it null object  (this fill it )
    }
  }, [])

  let navigate = useNavigate()


  return (
    <div className="App">
      <Navbar />
      <Routes>

        
        <Route element={<ProRoutes logindata={loginData} />}>
          <Route path='home' element={<Home />} />
        </Route>


        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
