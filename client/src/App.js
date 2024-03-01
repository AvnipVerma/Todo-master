import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from "./contexts/UserContext";
import Register from './components/Register/Register';
import Settings from './components/Settings/Settings';
import Analytics from './components/Analytics/Analytics';
import DashboardLeft from './components/DashboardLeft/DashboardLeft';
import toast, { Toaster } from "react-hot-toast";
import PublicPage from './components/PublicPage/PublicPage';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLeft />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/todo/:id" element={<PublicPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
