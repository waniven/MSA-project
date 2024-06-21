import React from 'react';

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LunchPage from './pages/LunchPage';
import SocialEventsPage from './pages/SocialEventsPage';
import StaffDirectoryPage from './pages/StaffDirectoryPage';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';

import ResponsiveAppBar from './AppBar';


const App: React.FC = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lunch" element={<LunchPage />} />
        <Route path="/social-events" element={<SocialEventsPage />} />
        <Route path="/staff-directory" element={<StaffDirectoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </>
  );
};

export default App;
