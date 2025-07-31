import { Job } from '@/types'
import { Link } from 'react-router-dom'

interface RecentJobsCardProps {
  jobs: Job[]
}

const RecentJobsCard = ({ jobs }: RecentJobsCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatSalary = (salary: any) => {
    if (typeof salary === 'string') {
      return salary
    }
    if (salary && typeof salary === 'object' && salary.min && salary.max) {
      return `${salary.currency}${salary.min.toLocaleString()} - ${salary.currency}${salary.max.toLocaleString()}`
    }
    return 'Salary not specified'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Job Postings</h3>
        <Link 
          to="/jobs" 
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View all
        </Link>
      </div>
      
      <div className="space-y-4">
        {jobs.map((job) => {
          const jobId = job.id || job._id
          const postedDate = job.postedAt || job.createdAt
          
          return (
            <div key={jobId} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link 
                    to={`/jobs/${jobId}`}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600"
                  >
                    {job.title}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                    <span>{formatSalary(job.salary)}</span>
                  </div>
                </div>
                <div className="ml-4 text-xs text-gray-400">
                  {formatDate(postedDate)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecentJobsCard 