import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Projects } from './pages/Projects';
import { AdminLayout } from './components/layout/AdminLayout';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { ProjectForm } from './pages/admin/ProjectForm';

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="projects" element={<Projects />} />
        </Route>

        {/* Rutas de Administrador */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
