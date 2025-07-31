import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import Layout from '@/components/Layout'
import HomePage from '@/pages/HomePage'
import JobsPage from '@/pages/JobsPage'
import JobDetailPage from '@/pages/JobDetailPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/ResetPasswordPage'
import ProfilePage from '@/pages/ProfilePage'
import DashboardPage from '@/pages/DashboardPage'
import PostJobPage from '@/pages/PostJobPage'
import ProtectedRoute from '@/components/ProtectedRoute'
import NotFoundPage from '@/pages/NotFoundPage'

function App() {
  return (
    <>
      <Helmet>
        <title>Job Portal - Find Your Dream Job</title>
        <meta name="description" content="Find your dream job or hire the perfect candidate with our modern job portal platform." />
      </Helmet>
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="post-job" element={<PostJobPage />} />
          </Route>
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App 