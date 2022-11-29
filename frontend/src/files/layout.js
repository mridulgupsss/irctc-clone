import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar';
import Footer from './components/footer';
import Homepage from './homepage';
import Register from './register';
import Login from './login';
import Schedule from "./schedule";
import Details from './Details';
import Mybookings from "./mybookings"
import AdminLogin from './adminLogin'
import ChangePassword from './changepassword';
import Bookaticket from './bookaticket';
import AllTrains from './allTrains';
import AllBookings from './allBookings';
import Addtrain from './addtrain';
import DeleteTrain from './deleteTrain';

import './files.css'

function Layout() {
  var [isUser, setUser] = React.useState(false);
  var [isAdmin, setAdmin] = React.useState(false);

  return (
    <Router>
        <Navbar isUser={isUser} isAdmin={isAdmin}/>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login setUser={setUser} setAdmin={setAdmin}/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/train-schedule" element={<Schedule/>} />
            <Route path="/details" element={<Details/>} />
            <Route path="/mybookings" element={<Mybookings/>} />
            <Route path="/adminLogin" element={<AdminLogin/>} />
            <Route path='/changepassword' element={<ChangePassword/>} />
            <Route path='/pd' element={<Bookaticket/>} />
            <Route path='/allTrains' element={<AllTrains/>} />
            <Route path='/allBookings' element={<AllBookings/>} />
            <Route path='/addTrain' element={<Addtrain/>} />
            <Route path='/deleteTrain' element={<DeleteTrain/>} />
        </Routes>
        <Footer/>
    </Router>
  );
}

export default Layout;


