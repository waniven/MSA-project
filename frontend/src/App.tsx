import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LunchPage from './pages/LunchPage';
import SocialEventsPage from './pages/SocialEventsPage';
import StaffDirectoryPage from './pages/StaffDirectoryPage';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';
import ResponsiveAppBar from './AppBar';

import HRPage from './pages/staffpages/HRPage';
import MarketingPage from './pages/staffpages/MarketingPage';
import SalesPage from './pages/staffpages/SalesPage';
import LegalPage from './pages/staffpages/LegalPage';
import ITPage from './pages/staffpages/ITPage';
import DevPage from './pages/staffpages/DevPage';

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
        <Route path="/staff-directory/hr" element={<HRPage />} />
        <Route path="/staff-directory/marketing" element={<MarketingPage />} />
        <Route path="/staff-directory/sales" element={<SalesPage />} />
        <Route path="/staff-directory/legal" element={<LegalPage />} />
        <Route path="/staff-directory/IT" element={<ITPage />} />
        <Route path="/staff-directory/development" element={<DevPage />} />
      </Routes>
    </>
  );
};

export default App;
