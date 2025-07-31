import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  return (
    <>
      <Helmet>
        <title>Reset Password - JobPortal</title>
        <meta name="description" content="Reset your password" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Reset Password
          </h1>
          <p className="text-gray-600">
            Token: {token}
          </p>
          <p className="text-gray-600 mt-4">
            This page will allow users to set a new password using the reset token.
          </p>
        </div>
      </div>
    </>
  )
}

export default ResetPasswordPage 