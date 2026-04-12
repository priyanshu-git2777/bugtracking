import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar    from './components/Navbar';
import Login     from './pages/Login';
import Register  from './pages/Register';
import Dashboard from './pages/Dashboard';
import BugList   from './pages/BugList';
import CreateBug from './pages/CreateBug';

const Guard = ({ children }) => {
  const u = localStorage.getItem('user');
  return u ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"            element={<Navigate to="/dashboard" />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/register"    element={<Register />} />
        <Route path="/dashboard"   element={<Guard><Dashboard /></Guard>} />
        <Route path="/bugs"        element={<Guard><BugList /></Guard>} />
        <Route path="/create-bug"  element={<Guard><CreateBug /></Guard>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </BrowserRouter>
  );
}
