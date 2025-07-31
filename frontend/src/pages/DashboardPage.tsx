import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '@/contexts/AuthContext'
import { jobService } from '@/services/jobService'
import StatsCard from '@/components/StatsCard'
import ApplicationCard from '@/components/ApplicationCard'
import RecentJobsCard from '@/components/RecentJobsCard'
import { Application, Job } from '@/types'

// Icons
const BriefcaseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0v2a2 2 0 002 2h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const UserGroupIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const DashboardPage = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    reviewedApplications: 0,
    interviewedApplications: 0,
    savedJobs: 0,
    recentJobs: [] as Job[]
  })
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [dashboardStats, userApplications] = await Promise.all([
          jobService.getDashboardStats(),
          jobService.getUserApplications()
        ])
        
        setStats(dashboardStats)
        setApplications(userApplications)
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - JobPortal</title>
        <meta name="description" content="Your JobPortal dashboard" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your job search
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Applications"
            value={stats.totalApplications}
            icon={<BriefcaseIcon />}
            color="blue"
          />
          <StatsCard
            title="Pending Review"
            value={stats.pendingApplications}
            icon={<ClockIcon />}
            color="yellow"
          />
          <StatsCard
            title="Reviewed"
            value={stats.reviewedApplications}
            icon={<CheckCircleIcon />}
            color="green"
          />
          <StatsCard
            title="Saved Jobs"
            value={stats.savedJobs}
            icon={<HeartIcon />}
            color="purple"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Applications Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Applications</h2>
              <span className="text-sm text-gray-500">
                {applications.length} application{applications.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((application) => (
                  <ApplicationCard key={application.id || application._id} application={application} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <BriefcaseIcon />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-600 mb-4">
                  Start applying to jobs to see your applications here
                </p>
                <a
                  href="/jobs"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Browse Jobs
                </a>
              </div>
            )}
          </div>

          {/* Recent Jobs Section */}
          <div>
            <RecentJobsCard jobs={stats.recentJobs} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/jobs"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="p-2 bg-blue-100 rounded-lg mr-4">
                <BriefcaseIcon />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Browse Jobs</h4>
                <p className="text-sm text-gray-600">Find your next opportunity</p>
              </div>
            </a>
            
            <a
              href="/profile"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-lg mr-4">
                <UserGroupIcon />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Update Profile</h4>
                <p className="text-sm text-gray-600">Keep your profile current</p>
              </div>
            </a>
            
            <a
              href="/jobs/saved"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
            >
              <div className="p-2 bg-purple-100 rounded-lg mr-4">
                <HeartIcon />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Saved Jobs</h4>
                <p className="text-sm text-gray-600">Review your saved positions</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage 