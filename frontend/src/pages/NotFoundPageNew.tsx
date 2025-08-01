import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const NotFoundPageNew = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - JobPortal</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Helmet>

      <div className="error-page">
        <div className="error-content-container">
          <div className="error-image-container">
            <svg width="150" height="150" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          
          <div className="error-text-container">
            <h1 className="error-title">404 - Page Not Found</h1>
            <p className="error-message">
              Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="suggestion-prompt">
              <p>Try searching for what you're looking for:</p>
              <form className="suggestion-form">
                <input 
                  type="text" 
                  placeholder="Search jobs, companies..."
                  className="input"
                />
              </form>
            </div>
            
            <div className="suggestion-prompt">
              <p>Or try one of these links:</p>
              <div className="suggestion-form">
                <Link to="/">Go Home</Link>
              </div>
              <div className="suggestion-form">
                <Link to="/jobs">Browse Jobs</Link>
              </div>
              <div className="suggestion-form">
                <button onClick={() => window.history.back()}>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFoundPageNew 