import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PremiumButton from '../components/ui/PremiumButton';
import GlassCard from '../components/ui/GlassCard';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [error, setError] = useState('');

  // Mock job data with real companies
  const mockJobs = {
    1: {
      id: 1,
      title: "Senior Software Engineer",
      company: "Microsoft",
      logo: "MS",
      location: "Seattle, WA",
      type: "Full-time",
      experience: "5+ years",
      salary: "$140k - $200k",
      postedDate: "2 days ago",
      description: `Join Microsoft's Azure team to build cloud-native applications that scale to millions of users worldwide.

      In this role, you'll:
      • Design and develop scalable web applications using .NET and C#
      • Collaborate with cross-functional teams to deliver high-quality features
      • Mentor junior developers and contribute to technical decisions
      • Work with modern cloud technologies including Azure and Docker
      • Participate in code reviews and maintain high coding standards

      We offer a collaborative environment where your ideas matter and your growth is supported. Join us in building the future of cloud computing.`,
      requirements: [
        "5+ years of experience in software development",
        "Strong proficiency in C#, .NET Core, and ASP.NET",
        "Experience with cloud platforms (Azure preferred)",
        "Knowledge of database systems (SQL Server, CosmosDB)",
        "Experience with CI/CD pipelines and DevOps practices",
        "Strong problem-solving and communication skills",
        "Bachelor's degree in Computer Science or equivalent experience"
      ],
      benefits: [
        "Competitive salary and equity package",
        "Comprehensive health, dental, and vision insurance",
        "Flexible work arrangements and remote options",
        "Unlimited PTO and sabbatical opportunities",
        "Professional development budget ($5,000/year)",
        "Top-tier equipment and home office setup",
        "Catered meals and snacks",
        "Gym membership and wellness programs"
      ],
      skills: ["C#", ".NET Core", "Azure", "SQL Server", "React"],
      category: "Technology",
      featured: true,
      remote: true,
      urgent: false,
      applicants: 127,
      views: 1543,
      companyInfo: {
        name: "Microsoft",
        size: "100,000+ employees",
        industry: "Technology",
        founded: "1975",
        website: "https://microsoft.com",
        description: "Microsoft is a leading global technology company that develops computer software, consumer electronics, personal computers, and related services."
      }
    },
    2: {
      id: 2,
      title: "Product Manager",
      company: "Google",
      logo: "G",
      location: "Mountain View, CA",
      type: "Full-time",
      experience: "3-5 years",
      salary: "$150k - $220k",
      postedDate: "1 day ago",
      description: `Lead product strategy for Google Workspace tools used by over 3 billion users worldwide.

      In this role, you'll:
      • Drive product strategy and roadmap for Google Workspace
      • Collaborate with engineering, design, and marketing teams
      • Analyze user data and market trends to inform product decisions
      • Work with AI/ML teams to integrate intelligent features
      • Lead product launches and go-to-market strategies

      Join Google's mission to organize the world's information and make it universally accessible.`,
      requirements: [
        "3-5 years of product management experience",
        "Strong analytical and data-driven decision making skills",
        "Experience with user research and product design",
        "Knowledge of agile development methodologies",
        "Excellent communication and leadership skills",
        "Technical background preferred",
        "MBA or equivalent experience preferred"
      ],
      benefits: [
        "Competitive salary and equity",
        "World-class health benefits",
        "Flexible work arrangements",
        "Professional development opportunities",
        "Free meals and snacks",
        "On-site fitness facilities",
        "Generous parental leave",
        "Retirement savings programs"
      ],
      skills: ["Product Strategy", "Data Analysis", "User Research", "Agile", "SQL"],
      category: "Product",
      featured: false,
      remote: false,
      urgent: true,
      applicants: 89,
      views: 967,
      companyInfo: {
        name: "Google",
        size: "100,000+ employees",
        industry: "Technology",
        founded: "1998",
        website: "https://google.com",
        description: "Google is a multinational technology company that specializes in Internet-related services and products."
      }
    },
    3: {
      id: 3,
      title: "UX/UI Designer",
      company: "Apple",
      logo: "A",
      location: "Cupertino, CA",
      type: "Full-time",
      experience: "4-6 years",
      salary: "$130k - $180k",
      postedDate: "3 days ago",
      description: `Design beautiful and intuitive user experiences for Apple's ecosystem of products.

      In this role, you'll:
      • Create user-centered designs for iOS, macOS, and web platforms
      • Collaborate with product and engineering teams
      • Conduct user research and usability testing
      • Design prototypes and interactive mockups
      • Maintain and evolve Apple's design system

      Join Apple's design team and help create products that delight millions of users worldwide.`,
      requirements: [
        "4-6 years of UX/UI design experience",
        "Proficiency in Figma, Sketch, and prototyping tools",
        "Strong portfolio demonstrating design thinking",
        "Experience with iOS and macOS design guidelines",
        "Knowledge of user research methodologies",
        "Excellent communication and collaboration skills",
        "Bachelor's degree in Design or related field"
      ],
      benefits: [
        "Competitive compensation package",
        "Comprehensive benefits package",
        "Employee stock purchase plan",
        "Professional development budget",
        "Product discounts",
        "Wellness programs",
        "Flexible work arrangements",
        "Career growth opportunities"
      ],
      skills: ["Figma", "Sketch", "Prototyping", "User Research", "iOS Design"],
      category: "Design",
      featured: true,
      remote: false,
      urgent: false,
      applicants: 156,
      views: 2341,
      companyInfo: {
        name: "Apple",
        size: "100,000+ employees",
        industry: "Technology",
        founded: "1976",
        website: "https://apple.com",
        description: "Apple is a multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services."
      }
    }
  };

  const mockRelatedJobs = [
    {
      id: 4,
      title: "Data Scientist",
      company: "Netflix",
      logo: "N",
      location: "Los Gatos, CA",
      salary: "$160k - $250k",
      type: "Full-time"
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Amazon",
      logo: "AM",
      location: "Austin, TX",
      salary: "$130k - $190k",
      type: "Full-time"
    },
    {
      id: 6,
      title: "Frontend Developer",
      company: "Meta",
      logo: "M",
      location: "Menlo Park, CA",
      salary: "$120k - $170k",
      type: "Full-time"
    }
  ];

  useEffect(() => {
    fetchJobDetails();
    fetchRelatedJobs();
    checkApplicationStatus();
    checkSavedStatus();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      setTimeout(() => {
        const jobData = mockJobs[parseInt(id)];
        if (jobData) {
          setJob(jobData);
        }
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setLoading(false);
    }
  };

  const fetchRelatedJobs = async () => {
    try {
      setRelatedJobs(mockRelatedJobs);
    } catch (error) {
      console.error('Error fetching related jobs:', error);
    }
  };

  const checkApplicationStatus = () => {
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const hasApplied = applications.some(app => app.id === parseInt(id));
    setApplied(hasApplied);
  };

  const checkSavedStatus = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSaved(savedJobs.includes(parseInt(id)));
  };

  const handleSaveJob = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    let updatedSaved;
    
    if (saved) {
      updatedSaved = savedJobs.filter(jobId => jobId !== parseInt(id));
    } else {
      updatedSaved = [...savedJobs, parseInt(id)];
    }
    
    localStorage.setItem('savedJobs', JSON.stringify(updatedSaved));
    setSaved(!saved);
  };

  const handleApply = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }

    setApplying(true);
    setError('');
    
    try {
      // Simulate API call
      setTimeout(() => {
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        const applicationData = {
          id: parseInt(id),
          jobTitle: job.title,
          company: job.company,
          appliedDate: new Date().toISOString().split('T')[0],
          status: 'Application Submitted',
          statusColor: 'blue'
        };
        
        // Add to applications array
        const updatedApplications = [...applications, applicationData];
        localStorage.setItem('applications', JSON.stringify(updatedApplications));
        
        setApplied(true);
        setApplying(false);
        setShowApplicationModal(false);
        
        // Show success message
        alert(`Successfully applied to ${job.title} at ${job.company}! Check your dashboard to track the application.`);
      }, 1500);
    } catch (error) {
      console.error('Error applying for job:', error);
      setError('Application failed. Please try again.');
      setApplying(false);
    }
  };

  const ApplicationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="max-w-md w-full p-6 bg-white/95">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for this position?</h3>
        <p className="text-gray-600 mb-6">
          You're about to apply for <strong>{job?.title}</strong> at <strong>{job?.company}</strong>. 
          Your profile information will be sent to the employer.
        </p>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        <div className="flex gap-3">
          <PremiumButton
            onClick={handleApply}
            loading={applying}
            className="flex-1"
          >
            {applying ? 'Submitting...' : 'Confirm Application'}
          </PremiumButton>
          <PremiumButton
            variant="outline"
            onClick={() => setShowApplicationModal(false)}
            className="flex-1"
          >
            Cancel
          </PremiumButton>
        </div>
      </GlassCard>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
            <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <PremiumButton as={Link} to="/jobs">
              Browse Other Jobs
            </PremiumButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Job Header */}
      <section className="pt-20 pb-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className={`w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${job.featured ? 'ring-4 ring-white/30' : ''}`}>
                <span className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {job.logo}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{job.title}</h1>
                  {job.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                  {job.urgent && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                      Urgent
                    </span>
                  )}
                </div>
                
                <Link 
                  to={`/companies/${job.company.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-2xl font-semibold text-blue-100 hover:text-white transition-colors mb-4"
                >
                  {job.company}
                </Link>
                
                <div className="flex flex-wrap items-center gap-4 text-blue-100 mb-4">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.type}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    {job.experience}
                  </span>
                  {job.remote && (
                    <span className="bg-green-500/20 text-green-100 px-3 py-1 rounded-full text-sm font-medium">
                      Remote Friendly
                    </span>
                  )}
                </div>
                
                <div className="text-2xl font-bold text-green-300 mb-4">{job.salary}</div>
                
                <div className="flex items-center gap-4 text-sm text-blue-200">
                  <span>{job.applicants} applicants</span>
                  <span>•</span>
                  <span>{job.views} views</span>
                  <span>•</span>
                  <span>Posted {job.postedDate}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full lg:w-auto">
              {applied ? (
                <div className="bg-green-500/20 text-green-100 px-6 py-3 rounded-lg font-semibold text-center">
                  ✅ Application Submitted
                </div>
              ) : (
                <PremiumButton
                  onClick={() => setShowApplicationModal(true)}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg w-full lg:w-auto"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  }
                >
                  Apply Now
                </PremiumButton>
              )}
              
              <PremiumButton
                variant="outline"
                onClick={handleSaveJob}
                className="border-white/30 text-white hover:bg-white hover:text-blue-600 w-full lg:w-auto"
                icon={
                  <svg className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                }
              >
                {saved ? 'Saved' : 'Save Job'}
              </PremiumButton>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
              <div className="prose prose-blue max-w-none">
                {job.description.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits & Perks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium">{job.companyInfo.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Company Size</span>
                  <span className="font-medium">{job.companyInfo.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded</span>
                  <span className="font-medium">{job.companyInfo.founded}</span>
                </div>
              </div>
              <p className="text-gray-700 mt-4 text-sm leading-relaxed">
                {job.companyInfo.description}
              </p>
              <PremiumButton
                variant="outline"
                size="sm"
                className="w-full mt-4"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                }
              >
                Visit Company Page
              </PremiumButton>
            </div>

            {/* Related Jobs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Jobs</h3>
              <div className="space-y-4">
                {relatedJobs.map((relatedJob) => (
                  <Link
                    key={relatedJob.id}
                    to={`/jobs/${relatedJob.id}`}
                    className="block p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{relatedJob.logo}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{relatedJob.title}</h4>
                        <p className="text-sm text-gray-600">{relatedJob.company}</p>
                        <p className="text-sm text-blue-600 font-medium">{relatedJob.salary}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showApplicationModal && <ApplicationModal />}
      <Footer />
    </div>
  );
};

export default JobDetails;
