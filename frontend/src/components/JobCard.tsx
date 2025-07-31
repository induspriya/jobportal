import { Link } from 'react-router-dom'
import { MapPin, Building, Clock, DollarSign, Calendar } from 'lucide-react'
import { Job } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface JobCardProps {
  job: Job
}

const JobCard = ({ job }: JobCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-green-100 text-green-800'
      case 'part-time':
        return 'bg-blue-100 text-blue-800'
      case 'contract':
        return 'bg-purple-100 text-purple-800'
      case 'internship':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link
            to={`/jobs/${job.id}`}
            className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {job.title}
          </Link>
          <div className="flex items-center mt-1 text-gray-600">
            <Building className="w-4 h-4 mr-1" />
            <span>{job.company}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
          {job.type}
        </span>
      </div>

      <div className="flex items-center text-gray-600 mb-3">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{job.location}</span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.requirements.slice(0, 3).map((requirement, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
          >
            {requirement}
          </span>
        ))}
        {job.requirements.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
            +{job.requirements.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          {job.salary && (
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{job.salary}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(job.postedAt)}</span>
          </div>
        </div>

        <Link
          to={`/jobs/${job.id}`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default JobCard 