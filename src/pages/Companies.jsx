import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PremiumButton from '../components/ui/PremiumButton';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  const mockCompanies = [
    {
      id: 1,
      name: 'Microsoft',
      logo: 'MS',
      industry: 'Technology',
      size: '100,000+',
      location: 'Seattle, WA',
      openJobs: 2847,
      rating: 4.4,
      description: 'Global technology company developing computer software, consumer electronics, and cloud services.',
      founded: '1975',
      website: 'https://microsoft.com'
    },
    {
      id: 2,
      name: 'Google',
      logo: 'G',
      industry: 'Technology',
      size: '100,000+',
      location: 'Mountain View, CA',
      openJobs: 3521,
      rating: 4.5,
      description: 'Multinational technology company specializing in Internet-related services and products.',
      founded: '1998',
      website: 'https://google.com'
    },
    {
      id: 3,
      name: 'Apple',
      logo: 'A',
      industry: 'Technology',
      size: '100,000+',
      location: 'Cupertino, CA',
      openJobs: 1876,
      rating: 4.3,
      description: 'Multinational technology company that designs and manufactures consumer electronics.',
      founded: '1976',
      website: 'https://apple.com'
    },
    {
      id: 4,
      name: 'Amazon',
      logo: 'AM',
      industry: 'E-commerce',
      size: '1,000,000+',
      location: 'Seattle, WA',
      openJobs: 4521,
      rating: 4.1,
      description: 'Multinational technology company focusing on e-commerce, cloud computing, and artificial intelligence.',
      founded: '1994',
      website: 'https://amazon.com'
    },
    {
      id: 5,
      name: 'Meta',
      logo: 'M',
      industry: 'Social Media',
      size: '50,000-100,000',
      location: 'Menlo Park, CA',
      openJobs: 987,
      rating: 4.2,
      description: 'Technology conglomerate holding company focused on social technology and virtual reality.',
      founded: '2004',
      website: 'https://meta.com'
    },
    {
      id: 6,
      name: 'Netflix',
      logo: 'N',
      industry: 'Entertainment',
      size: '10,000-50,000',
      location: 'Los Gatos, CA',
      openJobs: 234,
      rating: 4.3,
      description: 'American streaming entertainment service with over 230 million paid memberships worldwide.',
      founded: '1997',
      website: 'https://netflix.com'
    },
    {
      id: 7,
      name: 'Tesla',
      logo: 'T',
      industry: 'Automotive',
      size: '50,000-100,000',
      location: 'Palo Alto, CA',
      openJobs: 1245,
      rating: 3.9,
      description: 'Electric vehicle and clean energy company designing and manufacturing electric cars and energy storage.',
      founded: '2003',
      website: 'https://tesla.com'
    },
    {
      id: 8,
      name: 'Spotify',
      logo: 'S',
      industry: 'Music Streaming',
      size: '5,000-10,000',
      location: 'New York, NY',
      openJobs: 312,
      rating: 4.4,
      description: 'Audio streaming and media services provider with over 400 million active users worldwide.',
      founded: '2006',
      website: 'https://spotify.com'
    },
    {
      id: 9,
      name: 'IBM',
      logo: 'IBM',
      industry: 'Technology',
      size: '250,000+',
      location: 'Armonk, NY',
      openJobs: 1876,
      rating: 4.0,
      description: 'Multinational technology corporation operating in over 170 countries worldwide.',
      founded: '1911',
      website: 'https://ibm.com'
    },
    {
      id: 10,
      name: 'Salesforce',
      logo: 'SF',
      industry: 'Cloud Computing',
      size: '50,000-100,000',
      location: 'San Francisco, CA',
      openJobs: 945,
      rating: 4.2,
      description: 'American cloud-based software company providing customer relationship management services.',
      founded: '1999',
      website: 'https://salesforce.com'
    },
    {
      id: 11,
      name: 'Adobe',
      logo: 'AD',
      industry: 'Software',
      size: '25,000-50,000',
      location: 'San Jose, CA',
      openJobs: 567,
      rating: 4.3,
      description: 'Multinational computer software company known for creative and digital marketing software.',
      founded: '1982',
      website: 'https://adobe.com'
    },
    {
      id: 12,
      name: 'Uber',
      logo: 'U',
      industry: 'Transportation',
      size: '25,000-50,000',
      location: 'San Francisco, CA',
      openJobs: 789,
      rating: 3.8,
      description: 'Technology platform that connects drivers and riders through a mobile application.',
      founded: '2009',
      website: 'https://uber.com'
    }
  ];

  const industries = ['All Industries', 'Technology', 'E-commerce', 'Social Media', 'Entertainment', 'Automotive', 'Music Streaming', 'Software', 'Cloud Computing', 'Transportation'];

  useEffect(() => {
    setTimeout(() => {
      setCompanies(mockCompanies);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !industryFilter || industryFilter === 'All Industries' || company.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="pt-20 pb-16 bg-masculine-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              Partner <span className="text-gray-300">Companies</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Discover leading organizations actively hiring top talent through our executive network.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
            <div className="md:w-64">
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompanies.map((company) => (
              <div key={company.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-black text-lg">{company.logo}</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < Math.floor(company.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-600 text-sm ml-1">({company.rating})</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-2">{company.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{company.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Industry:</span>
                    <span className="font-semibold">{company.industry}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Company Size:</span>
                    <span className="font-semibold">{company.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-semibold">{company.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Founded:</span>
                    <span className="font-semibold">{company.founded}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {company.openJobs.toLocaleString()} open positions
                  </span>
                  <Link
                    to={`/jobs?company=${company.name}`}
                    className="text-gray-700 hover:text-gray-900 font-semibold transition-colors"
                  >
                    View Jobs →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCompanies.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Companies;
