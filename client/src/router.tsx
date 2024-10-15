/* eslint-disable */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// import TermsPage from './pages/terms';
// import AdminTermsPage from './pages/admin/terms';
import LandingPage from './pages/LandingPage';
import Editor from './components/Editor';
import NewDocumentButton from './components/NewDocumentButton';

const AppRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route index element={<NewDocumentButton />} />
         {/* <Route path="/terms" element={<TermsPage />} /> */}
        <Route path="/document/:id" element={<Editor />} />
         {/* <Route path="/admin/terms" element={<AdminTermsPage />} /> */}
        <Route path="*" element={<Navigate to="/Editor" />} />
      </Routes>
    </div>
  );
};

export default AppRouter;