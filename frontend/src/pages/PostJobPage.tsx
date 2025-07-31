import { Helmet } from 'react-helmet-async'

const PostJobPage = () => {
  return (
    <>
      <Helmet>
        <title>Post a Job - JobPortal</title>
        <meta name="description" content="Post a new job listing" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Post a Job
          </h1>
          <p className="text-gray-600">
            This page will allow employers to create and post new job listings.
          </p>
        </div>
      </div>
    </>
  )
}

export default PostJobPage 