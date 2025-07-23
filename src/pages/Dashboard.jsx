import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import PremiumButton from '../components/ui/PremiumButton';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock data
    const mockApplications = [
      {
        id: 1,
        jobTitle: 'Senior Full Stack Developer',
        company: 'TechCorp',
        appliedDate: '2025-07-20',
        status: 'Under Review',
        statusColor: 'yellow'
      },
      {
        id: 2,
        jobTitle: 'Product Manager',
        company: 'InnovateLab',
        appliedDate: '2025-07-18',
        status: 'Interview Scheduled',
        statusColor: 'blue'
      },
      {
        id: 3,
        jobTitle: 'UX Designer',
        company: 'DesignHub',
        appliedDate: '2025-07-15',
        status: 'Rejected',
        statusColor: 'red'
      }
    ];

    const mockSavedJobs = [
      {
        id: 4,
        title: 'Data Scientist',
        company: 'DataStream',
        location: 'Boston, MA',
        salary: '$110k - $140k'
      },
      {
        id: 5,
        title: 'DevOps Engineer',
        company: 'CloudNine',
        location: 'Seattle, WA',
        salary: '$130k - $170k'
      }
    ];

    setApplications(mockApplications);
    setSavedJobs(mockSavedJobs);
  }, []);

  const getStatusColor = (color) => {
    const colors = {
      yellow: 'bg-yellow-100 text-yellow-800',
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800'
    };
    return colors[color] || colors.yellow;
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'applications', label: 'Applications', icon: '📋' },
    { id: 'saved', label: 'Saved Jobs', icon: '❤️' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-black text-2xl">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-900">
                    Welcome back, {user?.name?.split(' ')[0] || 'Executive'}
                  </h1>
                  <p className="text-gray-600">Manage your career opportunities</p>
                </div>
              </div>
              <PremiumButton className="bg-gray-900 hover:bg-black">
                Update Profile
              </PremiumButton>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-semibold text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-gray-900 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="text-3xl font-black text-blue-600 mb-2">{applications.length}</div>
                      <div className="text-gray-700 font-semibold">Applications Submitted</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6">
                      <div className="text-3xl font-black text-green-600 mb-2">{savedJobs.length}</div>
                      <div className="text-gray-700 font-semibold">Jobs Saved</div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-6">
                      <div className="text-3xl font-black text-yellow-600 mb-2">1</div>
                      <div className="text-gray-700 font-semibold">Interview Scheduled</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-4">Recent Applications</h3>
                      <div className="space-y-3">
                        {applications.slice(0, 3).map((app) => (
                          <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-semibold text-gray-900">{app.jobTitle}</div>
                              <div className="text-sm text-gray-600">{app.company}</div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.statusColor)}`}>
                              {app.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-4">Recommended Jobs</h3>
                      <div className="space-y-3">
                        {savedJobs.map((job) => (
                          <div key={job.id} className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-semibold text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-600">{job.company} • {job.location}</div>
                            <div className="text-sm font-semibold text-green-600">{job.salary}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Applications Tab */}
              {activeTab === 'applications' && (
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-6">Your Applications</h3>
                  <div className="space-y-4">
                    {applications.map((app) => (
                      <div key={app.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{app.jobTitle}</h4>
                            <p className="text-gray-600">{app.company}</p>
                            <p className="text-sm text-gray-500">Applied on {app.appliedDate}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(app.statusColor)}`}>
                              {app.status}
                            </span>
                            <div className="mt-2">
                              <Link to={`/jobs/${app.id}`} className="text-gray-700 hover:text-gray-900 font-semibold text-sm">
                                View Job →
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Jobs Tab */}
              {activeTab === 'saved' && (
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-6">Saved Jobs</h3>
                  <div className="space-y-4">
                    {savedJobs.map((job) => (
                      <div key={job.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{job.title}</h4>
                            <p className="text-gray-600">{job.company}</p>
                            <p className="text-sm text-gray-500">{job.location}</p>
                            <p className="text-sm font-semibold text-green-600">{job.salary}</p>
                          </div>
                          <div className="flex gap-3">
                            <PremiumButton variant="outline" size="sm">
                              Remove
                            </PremiumButton>
                            <PremiumButton size="sm">
                              Apply Now
                            </PremiumButton>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-6">Profile Settings</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={user?.name || ''}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={user?.email || ''}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          placeholder="Add your phone number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          placeholder="City, State"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Experience Level</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                          <option>Entry Level</option>
                          <option>Mid Level</option>
                          <option>Senior Level</option>
                          <option>Executive</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Industry</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                          <option>Technology</option>
                          <option>Finance</option>
                          <option>Healthcare</option>
                          <option>Marketing</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <PremiumButton className="bg-gray-900 hover:bg-black">
                      Update Profile
                    </PremiumButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
