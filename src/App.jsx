import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/login';
import NotFound from './pages/NotFound';

export default function App() {
  return (
  <BrowserRouter>
  
     <Routes>
       <Route path="/" element={<Navigate to="/login" />} />
       <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound/>} />
     </Routes>
    </BrowserRouter>
  )
}
