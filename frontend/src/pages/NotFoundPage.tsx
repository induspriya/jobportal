import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Home, Search, ArrowLeft } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - JobPortal</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="mx-auto h-24 w-24 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl font-bold text-white">404</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="btn-primary btn-lg w-full inline-flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
            
            <Link
              to="/jobs"
              className="btn-outline btn-lg w-full inline-flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Jobs
            </Link>

            <button
              onClick={() => window.history.back()}
              className="btn-ghost btn-lg w-full inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage 