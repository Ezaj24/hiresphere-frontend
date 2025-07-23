import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PremiumButton from '../components/ui/PremiumButton';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import GlassCard from '../components/ui/GlassCard';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (location) params.append('location', location);
    window.location.href = `/jobs?${params.toString()}`;
  };

  const scrollToCategories = () => {
    document.getElementById('job-categories').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const jobCategories = [
    { name: 'Technology', count: '2,500', icon: '💻', color: 'from-blue-500 to-cyan-500' },
    { name: 'Healthcare', count: '1,800', icon: '🏥', color: 'from-green-500 to-emerald-500' },
    { name: 'Finance', count: '1,200', icon: '💰', color: 'from-yellow-500 to-orange-500' },
    { name: 'Marketing', count: '950', icon: '📈', color: 'from-pink-500 to-rose-500' },
    { name: 'Education', count: '800', icon: '📚', color: 'from-indigo-500 to-purple-500' },
    { name: 'Engineering', count: '1,600', icon: '⚙️', color: 'from-gray-500 to-slate-500' },
    { name: 'Sales', count: '1,100', icon: '🤝', color: 'from-red-500 to-pink-500' },
    { name: 'Design', count: '650', icon: '🎨', color: 'from-purple-500 to-violet-500' }
  ];

  const featuredCompanies = [
    { name: 'TechCorp', logo: 'TC', openings: 45, rating: 4.9, industry: 'Technology' },
    { name: 'InnovateLab', logo: 'IL', openings: 32, rating: 4.8, industry: 'AI & ML' },
    { name: 'GlobalSoft', logo: 'GS', openings: 28, rating: 4.7, industry: 'Software' },
    { name: 'DataStream', logo: 'DS', openings: 23, rating: 4.9, industry: 'Analytics' },
    { name: 'CloudNine', logo: 'CN', openings: 19, rating: 4.6, industry: 'Cloud' },
    { name: 'FutureGen', logo: 'FG', openings: 15, rating: 4.8, industry: 'Innovation' }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      image: "👩‍💻",
      text: "HireSphere helped me find my dream job in just 2 weeks. The platform is incredibly user-friendly!"
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateLab",
      image: "👨‍💼",
      text: "The quality of job postings and companies on this platform is outstanding. Highly recommended!"
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      company: "DesignHub",
      image: "👩‍🎨",
      text: "I love the modern interface and how easy it is to apply for jobs. Got 3 interviews in my first week!"
    }
  ];

  if (!isLoaded) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Find Your 
              <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Dream Job
              </span>
              <br />Today
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Connect with industry leaders and discover opportunities that align with your ambitions in our premium job marketplace
            </p>
            
            {/* Enhanced Search Form */}
            <GlassCard className="max-w-5xl mx-auto mb-12 p-4">
              <form onSubmit={handleSearch}>
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/90 text-gray-900 placeholder-gray-500 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:bg-white"
                    />
                  </div>
                  <div className="flex-1 relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="City, state, or remote"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/90 text-gray-900 placeholder-gray-500 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:bg-white"
                    />
                  </div>
                  <PremiumButton 
                    type="submit" 
                    size="lg"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    }
                  >
                    Search Jobs
                  </PremiumButton>
                </div>
              </form>
            </GlassCard>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PremiumButton
                variant="outline"
                size="lg"
                onClick={scrollToCategories}
                className="border-white/30 text-white hover:bg-white hover:text-gray-900"
              >
                Browse Categories
              </PremiumButton>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-sm">Trusted by</span>
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm">50k+ professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Jobs', value: 10000, icon: '💼' },
              { label: 'Verified Companies', value: 500, icon: '🏢' },
              { label: 'Job Seekers', value: 50000, icon: '👥' },
              { label: 'Success Rate', value: 95, suffix: '%', icon: '⭐' }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix || '+'}
                    className="tabular-nums"
                  />
                </div>
                <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Job Categories */}
      <section id="job-categories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Explore Opportunities
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Browse by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover opportunities across various industries and find the perfect role that matches your expertise and career goals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {jobCategories.map((category, index) => (
              <Link
                key={index}
                to={`/jobs?category=${encodeURIComponent(category.name)}`}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent p-8 transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
                    {category.name}
                  </h3>
                  <p className={`font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.count}+ jobs
                  </p>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Companies Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              Premium Partners
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top Companies <span className="text-gradient">Hiring</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join industry leaders and innovative startups that are actively seeking talented professionals like you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCompanies.map((company, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 transform group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">{company.logo}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-gray-600 text-sm ml-1">({company.rating})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{company.name}</h3>
                  <p className="text-gray-600 mb-4">{company.industry} • Fortune 500</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                      {company.openings} positions
                    </span>
                    <Link
                      to={`/jobs?company=${encodeURIComponent(company.name)}`}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors group-hover:translate-x-1 transform duration-300 inline-flex items-center gap-1"
                    >
                      View Jobs
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Getting hired has never been easier. Follow these simple steps to land your dream job and start your career journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Search & Discover",
                description: "Browse through thousands of job opportunities from top companies across various industries using our advanced search filters",
                icon: (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                color: "blue"
              },
              {
                step: "02",
                title: "Apply with Ease",
                description: "Submit your application with just a few clicks. Your profile and resume are always ready to go with our smart application system",
                icon: (
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                color: "purple"
              },
              {
                step: "03",
                title: "Get Hired",
                description: "Connect with employers, ace your interviews with our preparation tools, and start your new career journey with confidence",
                icon: (
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                color: "green"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-${item.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-all duration-300 group-hover:rotate-3`}>
                    {item.icon}
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 bg-${item.color}-600 text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="text-gradient">Users Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what real professionals say about their experience with HireSphere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <GlassCard key={index} className="p-8 text-center bg-white/80">
                <div className="text-6xl mb-6">{testimonial.image}</div>
                <blockquote className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                  "{testimonial.text}"
                </blockquote>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-blue-600 font-medium">{testimonial.role}</div>
                  <div className="text-gray-500">{testimonial.company}</div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Find Your Next 
            <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              {" "}Opportunity?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of professionals who have found their dream jobs through HireSphere's premium platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <PremiumButton
              as={Link}
              to="/register"
              size="xl"
              className="bg-white text-gray-900 hover:bg-gray-100 shadow-2xl"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            >
              Get Started Today
            </PremiumButton>
            
            <PremiumButton
              as={Link}
              to="/jobs"
              variant="outline"
              size="xl"
              className="border-white/30 text-white hover:bg-white hover:text-gray-900"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            >
              Browse Jobs
            </PremiumButton>
          </div>

          <div className="flex items-center justify-center gap-8 text-gray-300">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Premium support</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Verified companies</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
