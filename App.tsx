
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogDetailPage from './pages/BlogDetailPage';
import { PublicLayout } from './components/PublicLayout';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './components/AdminLayout';

import { ArticlesPage } from './pages/admin/ArticlesPage';
import { ProjectsPage } from './pages/admin/ProjectsPage';
import { SettingsPage } from './pages/admin/SettingsPage';

import { ConfigProvider } from './contexts/ConfigContext';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <ConfigProvider>
        <AuthProvider>
          <Routes>
            <Route path="/admin/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<DashboardPage />} />
                <Route path="/admin/projects" element={<ProjectsPage />} />
                <Route path="/admin/articles" element={<ArticlesPage />} />
                <Route path="/admin/settings" element={<SettingsPage />} />
              </Route>
            </Route>

            <Route element={<PublicLayout
              onContactClick={() => setIsChatOpen(true)}
              isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
            />}>
              <Route path="/" element={<HomePage onContactClick={() => setIsChatOpen(true)} />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ConfigProvider>
    </Router>
  );
};

export default App;
