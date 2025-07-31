import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

interface ErrorPageProps {
  title?: string
  message?: string
  showSearch?: boolean
}

const ErrorPage = ({ 
  title = "Something went wrong", 
  message = "We're sorry, but something unexpected happened. Please try again later.",
  showSearch = true 
}: ErrorPageProps) => {
  return (
    <>
      <Helmet>
        <title>{title} - JobPortal</title>
        <meta name="description" content={message} />
      </Helmet>

      <div className="error-page">
        <div className="error-content-container">
          <div className="error-image-container">
            <svg width="150" height="150" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          
          <div className="error-text-container">
            <h1 className="error-title">{title}</h1>
            <p className="error-message">{message}</p>
            
            {showSearch && (
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
            )}
            
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

export default ErrorPage 