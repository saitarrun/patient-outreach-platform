import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PatientsPage from './pages/PatientsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import PatientLoginPage from './pages/PatientLoginPage';
import PatientDashboardPage from './pages/PatientDashboardPage';

function Dashboard() {
  return <h2 className="text-2xl font-bold">Dashboard</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Patient Portal */}
        <Route path="/portal/login" element={<PatientLoginPage />} />
        <Route path="/portal/dashboard" element={<PatientDashboardPage />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
