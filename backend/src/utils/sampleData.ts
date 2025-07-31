import { Job } from '../models/Job'
import { User } from '../models/User'

export const sampleJobs = [
  {
    title: 'Senior React Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: '$120,000 - $150,000',
    description: 'We are looking for a senior React developer to join our team. You will be responsible for building scalable web applications and mentoring junior developers.',
    requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience', 'Team leadership'],
    category: 'Technology',
    postedBy: 'employer1',
    applications: [],
    status: 'active'
  },
  {
    title: 'Frontend Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'full-time',
    salary: '$90,000 - $110,000',
    description: 'Join our fast-growing startup as a frontend engineer. You will work on cutting-edge web applications and have the opportunity to grow with the company.',
    requirements: ['JavaScript', 'React', 'CSS', '3+ years experience', 'Git'],
    category: 'Technology',
    postedBy: 'employer2',
    applications: [],
    status: 'active'
  },
  {
    title: 'UI/UX Designer',
    company: 'Design Studio Pro',
    location: 'New York, NY',
    type: 'contract',
    salary: '$80,000 - $100,000',
    description: 'Creative UI/UX designer needed for exciting projects. You will work on user interface design, user experience research, and design systems.',
    requirements: ['Figma', 'Adobe Creative Suite', 'User Research', '4+ years experience', 'Prototyping'],
    category: 'Design',
    postedBy: 'employer3',
    applications: [],
    status: 'active'
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Austin, TX',
    type: 'full-time',
    salary: '$110,000 - $130,000',
    description: 'DevOps engineer to manage our cloud infrastructure. You will be responsible for CI/CD pipelines, monitoring, and infrastructure automation.',
    requirements: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', '4+ years experience'],
    category: 'Technology',
    postedBy: 'employer4',
    applications: [],
    status: 'active'
  },
  {
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'Seattle, WA',
    type: 'full-time',
    salary: '$130,000 - $160,000',
    description: 'Lead product strategy and development for our platform. You will work closely with engineering, design, and business teams to deliver exceptional products.',
    requirements: ['Product Strategy', 'Agile', 'Data Analysis', '6+ years experience', 'Leadership'],
    category: 'Business',
    postedBy: 'employer5',
    applications: [],
    status: 'active'
  },
  {
    title: 'Marketing Specialist',
    company: 'Growth Marketing Co.',
    location: 'Los Angeles, CA',
    type: 'full-time',
    salary: '$70,000 - $90,000',
    description: 'Join our marketing team to drive growth through digital marketing campaigns, content creation, and social media management.',
    requirements: ['Digital Marketing', 'Social Media', 'Content Creation', '3+ years experience', 'Analytics'],
    category: 'Marketing',
    postedBy: 'employer6',
    applications: [],
    status: 'active'
  },
  {
    title: 'Data Scientist',
    company: 'Data Insights Inc.',
    location: 'Boston, MA',
    type: 'full-time',
    salary: '$100,000 - $130,000',
    description: 'Data scientist to analyze complex datasets and build machine learning models. You will work on predictive analytics and data-driven insights.',
    requirements: ['Python', 'Machine Learning', 'Statistics', '4+ years experience', 'SQL'],
    category: 'Technology',
    postedBy: 'employer7',
    applications: [],
    status: 'active'
  },
  {
    title: 'Customer Success Manager',
    company: 'SaaS Solutions',
    location: 'Chicago, IL',
    type: 'full-time',
    salary: '$75,000 - $95,000',
    description: 'Help our customers succeed with our SaaS platform. You will manage customer relationships, provide training, and ensure customer satisfaction.',
    requirements: ['Customer Service', 'SaaS', 'Training', '3+ years experience', 'Communication'],
    category: 'Customer Service',
    postedBy: 'employer8',
    applications: [],
    status: 'active'
  }
]

export const populateSampleData = async () => {
  try {
    // Check if jobs already exist
    const existingJobs = await Job.countDocuments()
    if (existingJobs > 0) {
      console.log('Sample data already exists, skipping...')
      return
    }

    // Create sample jobs
    await Job.insertMany(sampleJobs)
    console.log('✅ Sample jobs created successfully')

    // Create sample employer users
    const sampleEmployers = [
      {
        name: 'TechCorp HR',
        email: 'hr@techcorp.com',
        password: 'password123',
        role: 'employer',
        company: 'TechCorp Inc.'
      },
      {
        name: 'StartupXYZ Team',
        email: 'team@startupxyz.com',
        password: 'password123',
        role: 'employer',
        company: 'StartupXYZ'
      }
    ]

    for (const employer of sampleEmployers) {
      const existingUser = await User.findOne({ email: employer.email })
      if (!existingUser) {
        await User.create(employer)
      }
    }

    console.log('✅ Sample employers created successfully')
    console.log('📊 Database populated with sample data')
  } catch (error) {
    console.error('❌ Error populating sample data:', error)
  }
} 