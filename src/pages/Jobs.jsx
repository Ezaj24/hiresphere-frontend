import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PremiumButton from '../components/ui/PremiumButton';
import GlassCard from '../components/ui/GlassCard';
import { JobCardSkeleton } from '../components/ui/LoadingSkeleton';
import { jobsAPI } from '../services/api';

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    company: searchParams.get('company') || '',
    jobType: '',
    experience: '',
    salary: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());

  // Mock job data with real companies
  const mockJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Microsoft",
      logo: "MS",
      location: "Seattle, WA",
      type: "Full-time",
      experience: "5+ years",
      salary: "$140k - $200k",
      postedDate: "2 days ago",
      description: "Join Microsoft's Azure team to build cloud-native applications that scale to millions of users. Work with cutting-edge technologies including .NET, C#, and Azure services.",
      skills: ["C#", ".NET Core", "Azure", "SQL Server", "React"],
      category: "Technology",
      featured: true,
      remote: true,
      urgent: false
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Google",
      logo: "G",
      location: "Mountain View, CA",
      type: "Full-time",
      experience: "3-5 years",
      salary: "$150k - $220k",
      postedDate: "1 day ago",
      description: "Lead product strategy for Google Workspace tools used by over 3 billion users worldwide. Drive innovation in collaboration software and AI-powered productivity features.",
      skills: ["Product Strategy", "Data Analysis", "User Research", "Agile", "SQL"],
      category: "Product",
      featured: false,
      remote: false,
      urgent: true
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Apple",
      logo: "A",
      location: "Cupertino, CA",
      type: "Full-time",
      experience: "4-6 years",
      salary: "$130k - $180k",
      postedDate: "3 days ago",
      description: "Design beautiful and intuitive user experiences for Apple's ecosystem of products. Collaborate with engineering teams to bring innovative designs to life across iOS, macOS, and web platforms.",
      skills: ["Figma", "Sketch", "Prototyping", "User Research", "iOS Design"],
      category: "Design",
      featured: true,
      remote: false,
      urgent: false
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "Netflix",
      logo: "N",
      location: "Los Gatos, CA",
      type: "Full-time",
      experience: "3+ years",
      salary: "$160k - $250k",
      postedDate: "4 days ago",
      description: "Build machine learning models that power Netflix's recommendation engine, reaching 230+ million subscribers globally. Work with petabytes of data to personalize content experiences.",
      skills: ["Python", "Machine Learning", "TensorFlow", "Spark", "SQL"],
      category: "Data Science",
      featured: false,
      remote: true,
      urgent: false
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Amazon",
      logo: "AM",
      location: "Austin, TX",
      type: "Full-time",
      experience: "4+ years",
      salary: "$130k - $190k",
      postedDate: "5 days ago",
      description: "Build and maintain cloud infrastructure for Amazon Web Services. Automate deployment processes and ensure system reliability for services used by millions of customers worldwide.",
      skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Python"],
      category: "DevOps",
      featured: true,
      remote: true,
      urgent: false
    },
    {
      id: 6,
      title: "Frontend Developer",
      company: "Meta",
      logo: "M",
      location: "Menlo Park, CA",
      type: "Full-time",
      experience: "2-4 years",
      salary: "$120k - $170k",
      postedDate: "1 week ago",
      description: "Develop user interfaces for Facebook, Instagram, and WhatsApp platforms. Work with React, React Native, and cutting-edge web technologies to create experiences for 3+ billion users.",
      skills: ["React", "JavaScript", "React Native", "GraphQL", "CSS"],
      category: "Frontend",
      featured: false,
      remote: false,
      urgent: false
    },
    {
      id: 7,
      title: "Marketing Manager",
      company: "Tesla",
      logo: "T",
      location: "Palo Alto, CA",
      type: "Full-time",
      experience: "3-5 years",
      salary: "$110k - $150k",
      postedDate: "6 days ago",
      description: "Drive marketing strategies for Tesla's electric vehicles and energy products. Lead digital marketing campaigns and brand initiatives to accelerate sustainable transport adoption.",
      skills: ["Digital Marketing", "Brand Strategy", "Analytics", "Social Media", "SEO"],
      category: "Marketing",
      featured: false,
      remote: false,
      urgent: true
    },
    {
      id: 8,
      title: "Backend Engineer",
      company: "Spotify",
      logo: "S",
      location: "New York, NY",
      type: "Full-time",
      experience: "3+ years",
      salary: "$125k - $175k",
      postedDate: "3 days ago",
      description: "Build scalable backend services that power Spotify's music streaming platform for 400+ million users. Work with microservices architecture and real-time data processing.",
      skills: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Docker"],
      category: "Backend",
      featured: true,
      remote: true,
      urgent: false
    },
    {
      id: 9,
      title: "Cybersecurity Analyst",
      company: "IBM",
      logo: "IBM",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      salary: "$95k - $135k",
      postedDate: "2 days ago",
      description: "Protect IBM's global infrastructure and client systems from cyber threats. Implement security protocols and respond to security incidents across enterprise environments.",
      skills: ["Security Protocols", "Penetration Testing", "SIEM", "Risk Assessment", "Python"],
      category: "Security",
      featured: false,
      remote: true,
      urgent: false
    },
    {
      id: 10,
      title: "Sales Executive",
      company: "Salesforce",
      logo: "SF",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "2-5 years",
      salary: "$80k - $120k + Commission",
      postedDate: "1 day ago",
      description: "Drive enterprise sales for Salesforce's CRM platform. Build relationships with Fortune 500 companies and help them transform their customer engagement strategies.",
      skills: ["Enterprise Sales", "CRM", "Salesforce", "Lead Generation", "Negotiation"],
      category: "Sales",
      featured: false,
      remote: false,
      urgent: true
    }
  ];

  useEffect(() => {
    fetchJobs();
  }, [filters, sortBy, currentPage]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await jobsAPI.getJobs({ ...filters, sort: sortBy, page: currentPage });
      
      // Mock API response
      setTimeout(() => {
        let filteredJobs = [...mockJobs];
        
        // Apply filters
        if (filters.search) {
          filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))
          );
        }
        
        if (filters.location) {
          filteredJobs = filteredJobs.filter(job => 
            job.location.toLowerCase().includes(filters.location.toLowerCase())
          );
        }
        
        if (filters.category) {
          filteredJobs = filteredJobs.filter(job => job.category === filters.category);
        }
        
        if (filters.company) {
          filteredJobs = filteredJobs.filter(job => job.company === filters.company);
        }
        
        if (filters.jobType) {
          filteredJobs = filteredJobs.filter(job => job.type === filters.jobType);
        }

        // Apply sorting
        switch (sortBy) {
          case 'newest':
            // Already sorted by newest
            break;
          case 'salary':
            filteredJobs.sort((a, b) => {
              const salaryA = parseInt(a.salary.replace(/[^0-9]/g, ''));
              const salaryB = parseInt(b.salary.replace(/[^0-9]/g, ''));
              return salaryB - salaryA;
            });
            break;
          case 'company':
            filteredJobs.sort((a, b) => a.company.localeCompare(b.company));
            break;
        }
        
        setJobs(filteredJobs);
        setTotalJobs(filteredJobs.length);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Update URL parameters
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const handleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
    
    // Save to localStorage
    localStorage.setItem('savedJobs', JSON.stringify([...newSavedJobs]));
  };

  const handleQuickApply = (job) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to apply for jobs!');
      window.location.href = '/login';
      return;
    }
    
    // Check if already applied
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const alreadyApplied = applications.some(app => app.id === job.id);
    
    if (alreadyApplied) {
      alert('You have already applied to this job!');
      return;
    }
    
    // Add application
    const applicationData = {
      id: job.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Application Submitted',
      statusColor: 'blue'
    };
    
    applications.push(applicationData);
    localStorage.setItem('applications', JSON.stringify(applications));
    alert(`Successfully applied to ${job.title} at ${job.company}!`);
  };

  useEffect(() => {
    // Load saved jobs from localStorage
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      setSavedJobs(new Set(JSON.parse(saved)));
    }
  }, []);

  const categories = [
    "Technology", "Product", "Design", "Data Science", "DevOps", 
    "Frontend", "Backend", "Marketing", "Security", "Sales"
  ];

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const experienceLevels = ["Entry Level", "1-2 years", "3-5 years", "5+ years"];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Search Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Your Perfect Job
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover {totalJobs} opportunities from top companies
            </p>
          </div>
          
          {/* Enhanced Search Form */}
          <GlassCard className="max-w-4xl mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/90 text-gray-900 placeholder-gray-500 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <div className="flex-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="City, state, or remote"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/90 text-gray-900 placeholder-gray-500 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <PremiumButton
                onClick={fetchJobs}
                disabled={loading}
                loading={loading}
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              >
                Search
              </PremiumButton>
            </div>
          </GlassCard>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <PremiumButton
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full"
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586l-4-4V9.414a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
                    </svg>
                  }
                >
                  Filters
                </PremiumButton>
              </div>

              <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 ${showFilters || 'hidden lg:block'}`}>
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange('jobType', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">All Types</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <select
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <option value="">All Levels</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Remote Work */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Remote Work</span>
                  </label>
                </div>

                {/* Clear Filters */}
                <PremiumButton
                  variant="outline"
                  onClick={() => {
                    setFilters({
                      search: '',
                      location: '',
                      category: '',
                      company: '',
                      jobType: '',
                      experience: '',
                      salary: ''
                    });
                    setSearchParams({});
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </PremiumButton>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {loading ? 'Loading...' : `${jobs.length} Jobs Found`}
                </h2>
                {filters.search && (
                  <p className="text-gray-600">
                    Results for "<span className="font-medium">{filters.search}</span>"
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest</option>
                  <option value="salary">Highest Salary</option>
                  <option value="company">Company A-Z</option>
                </select>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
              {loading ? (
                // Loading Skeletons
                [...Array(6)].map((_, index) => (
                  <JobCardSkeleton key={index} />
                ))
              ) : jobs.length === 0 ? (
                // No Results
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                  <PremiumButton
                    onClick={() => {
                      setFilters({
                        search: '',
                        location: '',
                        category: '',
                        company: '',
                        jobType: '',
                        experience: '',
                        salary: ''
                      });
                      setSearchParams({});
                    }}
                  >
                    Clear All Filters
                  </PremiumButton>
                </div>
              ) : (
                // Job Cards
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200 p-6 group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Company Logo */}
                        <div className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md flex-shrink-0 ${job.featured ? 'ring-2 ring-blue-300' : ''}`}>
                          <span className="text-white font-bold text-lg">{job.logo}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Link
                                  to={`/jobs/${job.id}`}
                                  className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors group-hover:text-blue-600"
                                >
                                  {job.title}
                                </Link>
                                {job.featured && (
                                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    Featured
                                  </span>
                                )}
                                {job.urgent && (
                                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                                    Urgent
                                  </span>
                                )}
                              </div>
                              <p className="text-lg font-medium text-gray-700 mb-1">{job.company}</p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  </svg>
                                  {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  {job.type}
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                  </svg>
                                  {job.experience}
                                </span>
                                {job.remote && (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Remote
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.slice(0, 4).map((skill, index) => (
                              <span
                                key={index}
                                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 4 && (
                              <span className="text-gray-500 text-sm">
                                +{job.skills.length - 4} more
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-lg font-bold text-green-600">{job.salary}</span>
                              <span className="text-sm text-gray-500">{job.postedDate}</span>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleSaveJob(job.id)}
                                className={`p-2 rounded-lg transition-colors ${
                                  savedJobs.has(job.id)
                                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                title={savedJobs.has(job.id) ? 'Remove from saved' : 'Save job'}
                              >
                                <svg className="w-5 h-5" fill={savedJobs.has(job.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </button>

                              <Link to={`/jobs/${job.id}`}>
                                <PremiumButton
                                  variant="outline"
                                  size="sm"
                                >
                                  View Details
                                </PremiumButton>
                              </Link>

                              <PremiumButton
                                size="sm"
                                onClick={() => handleQuickApply(job)}
                              >
                                Quick Apply
                              </PremiumButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {jobs.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <PremiumButton
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </PremiumButton>
                  
                  {[1, 2, 3].map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <PremiumButton
                    variant="outline"
                    disabled={currentPage === 3}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </PremiumButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Jobs;
