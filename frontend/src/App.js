import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditForm from './pages/EditForm';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import FormTakerView from "./pages/FormTakerView";
import Responses from "./pages/Responses";
import './App.css';

import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:username" element={<Dashboard />} />
        <Route path="/editForm/:formId/:userId" element={<EditForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form/:formId/:userId" element={<FormTakerView />} />
        <Route path="/form/:formId" element={<FormTakerView />} />
        <Route path="/responses/:id" element={<Responses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
