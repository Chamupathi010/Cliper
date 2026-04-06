import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import ProtectedRoute from '../components/ProtectedRoute';

// Public pages
import Landing from '../pages/public/LandingPage';
import SignUp from '../pages/public/signup';
import Login from '../pages/public/login';

// Student pages
import StuDash from '../pages/public/Student/StudentDashboard';
import StuPubRooms from '../pages/public/Student/StudentPublicRooms';
import LiveSessionStudent from '../pages/public/Student/LiveSessionStudent';

// Lecturer pages
import LiveSessionLecturer from '../pages/public/Lecturer/LiveSessionLecturer';
import LecturerCreateRoom from '../pages/public/Lecturer/LecturerCreateRoom';
import LecActiveRooms from '../pages/public/Lecturer/lec_active_rooms';
import Resources from '../pages/public/Lecturer/lec_resources';
import LecDash from '../pages/public/Lecturer/LecturerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Public routes (no login required) ── */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* ── Student-only routes ── */}
        <Route
          path="/StudentDashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StuDash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/rooms"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StuPubRooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/live-sessionStudent"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <LiveSessionStudent />
            </ProtectedRoute>
          }
        />

        {/* ── Lecturer / Admin routes ── */}
        <Route
          path="/lecturer"
          element={
            <ProtectedRoute allowedRoles={["lecturer", "admin"]}>
              <LecDash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/lec_active-rooms"
          element={
            <ProtectedRoute allowedRoles={["lecturer", "admin"]}>
              <LecActiveRooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/create-room"
          element={
            <ProtectedRoute allowedRoles={["lecturer", "admin"]}>
              <LecturerCreateRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lecturer/resources"
          element={
            <ProtectedRoute allowedRoles={["lecturer", "admin"]}>
              <Resources />
            </ProtectedRoute>
          }
        />
        <Route
          path="/live-sessionLecturer"
          element={
            <ProtectedRoute allowedRoles={["lecturer", "admin"]}>
              <LiveSessionLecturer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;