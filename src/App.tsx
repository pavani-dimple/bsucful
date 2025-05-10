import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ContentList from './pages/content/ContentList';
import ContentEditor from './pages/content/ContentEditor';
import MediaLibrary from './pages/media/MediaLibrary';
import Users from './pages/users/Users';
import UserProfile from './pages/users/UserProfile';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';
import AppLayout from './components/layout/AppLayout';
import { useNotification } from './contexts/NotificationContext';
import Notification from './components/ui/Notification';

function App() {
  const { isAuthenticated, loading } = useAuth();
  const { notifications } = useNotification();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/dashboard" /> : <ForgotPassword />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Content routes */}
          <Route path="/content" element={<ContentList />} />
          <Route path="/content/create" element={<ContentEditor />} />
          <Route path="/content/edit/:id" element={<ContentEditor />} />
          
          {/* Media routes */}
          <Route path="/media" element={<MediaLibrary />} />
          
          {/* User routes */}
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<UserProfile />} />
          
          {/* Settings routes */}
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        {/* Redirect root to dashboard if authenticated, otherwise to login */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
        />
        
        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Notification display */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            message={notification.message}
            id={notification.id}
          />
        ))}
      </div>
    </>
  );
}

export default App;