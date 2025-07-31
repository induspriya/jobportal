import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

const JobDetailPage = () => {
  const { id } = useParams()

  return (
    <>
      <Helmet>
        <title>Job Details - JobPortal</title>
        <meta name="description" content="View job details and apply" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Job Details
          </h1>
          <p className="text-gray-600">
            Job ID: {id}
          </p>
          <p className="text-gray-600 mt-4">
            This page will show detailed job information and application form.
          </p>
        </div>
      </div>
    </>
  )
}

export default JobDetailPage 