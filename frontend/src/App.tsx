import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
import OAuthCallback from './components/OAuthCallback';
import WebhookEvents from './components/WebhookEvents';
import SyncHistory from './components/SyncHistory';
import { TermsOfService } from './components/legal/TermsOfService';
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tenantId = localStorage.getItem('tenantId');
    if (token && tenantId) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tenantId');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={
          <LoginForm 
            onForgotPassword={() => window.location.href = '/forgot-password'}
            onRegister={() => window.location.href = '/register'}
          />
        } />
        <Route path="/register" element={
          <RegisterForm 
            onBackToLogin={() => window.location.href = '/login'}
          />
        } />
        <Route path="/forgot-password" element={
          <ForgotPasswordForm 
            onBackToLogin={() => window.location.href = '/login'}
          />
        } />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        
        {/* Legal Pages */}
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        } />
        <Route path="/webhooks" element={
          isAuthenticated ? <WebhookEvents /> : <Navigate to="/login" replace />
        } />
        <Route path="/history" element={
          isAuthenticated ? <SyncHistory /> : <Navigate to="/login" replace />
        } />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Logout Button for Authenticated Users */}
      {isAuthenticated && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            ออกจากระบบ
          </button>
        </div>
      )}
    </Router>
  );
};

export default App;
