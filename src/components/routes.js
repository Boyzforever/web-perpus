import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../log/login';
import HomeAdmin from '../admin/HalamanAdmin';
import Reg from '../log/reg';
import HomePage from '../pages/homepage';

export default function Routing() {
  return (
    
    <BrowserRouter>
    <Routes>

        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/reg' element={<Reg />}/>
        <Route path='/' element={<HomePage />} /> 
        <Route path='/admin' element={<HomeAdmin  />} /> 
    </Routes>
    
    </BrowserRouter>
  )
}
