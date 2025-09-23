import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ProgramsPage from './pages/ProgramsPage';
import ApplicationRequirements from './pages/ApplicationRequirements';
import ApplicationForm from './pages/ApplicationForm';
import ReviewPage from './pages/ReviewPage';
import SubmissionConfirmation from './pages/SubmissionConfirmation';
import DashboardLogin from './pages/DashboardLogin';
import StudentDashboard from './pages/StudentDashboard';
import AdmissionLogin from './pages/admin/AdmissionLogin';
import AdmissionDashboard from './pages/admin/AdmissionDashboard';
import RegistrarLogin from './pages/admin/RegistrarLogin';
import RegistrarDashboard from './pages/admin/RegistrarDashboard';
import DepartmentLogin from './pages/admin/DepartmentLogin';
import DepartmentDashboard from './pages/admin/DepartmentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with layout */}
        <Route path="/" element={<Layout><LandingPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/programs" element={<Layout><ProgramsPage /></Layout>} />
        
        {/* Application flow routes */}
        <Route path="/apply" element={<Layout><ApplicationRequirements /></Layout>} />
        <Route path="/apply/form" element={<Layout><ApplicationForm /></Layout>} />
        <Route path="/apply/review" element={<Layout><ReviewPage /></Layout>} />
        <Route path="/apply/confirmation" element={<Layout><SubmissionConfirmation /></Layout>} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard-login" element={<Layout><DashboardLogin /></Layout>} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        
        {/* Admin portal routes (hidden from public navbar) */}
        <Route path="/admin-login" element={<Layout><AdmissionLogin /></Layout>} />
        <Route path="/admin" element={<AdminLayout><AdmissionDashboard /></AdminLayout>} />
        
        <Route path="/registrar-login" element={<Layout><RegistrarLogin /></Layout>} />
        <Route path="/registrar" element={<AdminLayout><RegistrarDashboard /></AdminLayout>} />
        
        <Route path="/department-login" element={<Layout><DepartmentLogin /></Layout>} />
        <Route path="/department" element={<AdminLayout><DepartmentDashboard /></AdminLayout>} />
      </Routes>
    </Router>
  );
}

export default App;