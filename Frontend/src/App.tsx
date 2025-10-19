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
import EnrollmentForm from './pages/EnrollmentForm';
import EnrollmentDocuments from './pages/EnrollmentDocuments';
import EnrollmentReview from './pages/EnrollmentReview';
import EnrollmentDocumentsReview from './pages/EnrollmentDocumentsReview';
import EnrollmentConfirmation from './pages/EnrollmentConfirmation';
import UnifiedLogin from './pages/UnifiedLogin';
import StudentPortal from './pages/StudentPortal';
import NotificationsPage from './pages/NotificationsPage';
import AdmissionDashboard from './pages/admin/AdmissionDashboard';
import RegistrarDashboard from './pages/admin/RegistrarDashboard';
import DepartmentDashboard from './pages/admin/DepartmentDashboard';
import StaffAccountRequest from './pages/admin/StaffAccountRequest';

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
        <Route path="/student-dashboard" element={<StudentDashboard />} />

        {/* Enrollment flow routes */}
        <Route path="/enrollment-form" element={<EnrollmentForm />} />
        <Route path="/enrollment-documents" element={<EnrollmentDocuments />} />
        <Route path="/enrollment-review" element={<EnrollmentReview />} />
        <Route path="/enrollment-documents-review" element={<EnrollmentDocumentsReview />} />
        <Route path="/enrollment-confirmation" element={<EnrollmentConfirmation />} />

        {/* Unified Login Portal */}
        <Route path="/login" element={<UnifiedLogin />} />

        {/* Student Portal routes */}
        <Route path="/student-portal" element={<StudentPortal />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        {/* Admin portal routes */}
        <Route path="/admin" element={<AdminLayout><AdmissionDashboard /></AdminLayout>} />
        <Route path="/registrar" element={<AdminLayout><RegistrarDashboard /></AdminLayout>} />
        <Route path="/department" element={<AdminLayout><DepartmentDashboard /></AdminLayout>} />

        <Route path="/staff-account-request" element={<Layout><StaffAccountRequest /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;