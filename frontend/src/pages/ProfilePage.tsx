import { Helmet } from 'react-helmet-async'

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>Profile - JobPortal</title>
        <meta name="description" content="Manage your profile" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Profile
          </h1>
          <p className="text-gray-600">
            This page will allow users to view and edit their profile information.
          </p>
        </div>
      </div>
    </>
  )
}

export default ProfilePage 