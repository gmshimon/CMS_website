import React, { useState } from 'react'
import {
  ExternalLink,
  Award,
  Store,
  MapPin,
  Globe,
  Users,
  Building
} from 'lucide-react'

const OurPartners = () => {
  const [activeTab, setActiveTab] = useState('sponsors')

  const sponsors = [
    {
      id: 1,
      name: 'Malaysian Institute of Management',
      country: 'Malaysia',
      flag: '🇲🇾',
      logo: 'MIM',
      description: 'Leading management education institute in Southeast Asia',
      website: 'https://mim.edu.my',
      type: 'Platinum Sponsor',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 2,
      name: "Human Resource Educators' Association of the Philippines, Inc",
      country: 'Philippines',
      flag: '🇵🇭',
      logo: 'HREAP',
      description: 'Premier association for HR education and development',
      website: 'https://hreap.org.ph',
      type: 'Gold Sponsor',
      color: 'from-green-500 to-green-700'
    },
    {
      id: 3,
      name: 'TechCorp International',
      country: 'Singapore',
      flag: '🇸🇬',
      logo: 'TECH',
      description: 'Innovation-driven technology solutions provider',
      website: 'https://techcorp.sg',
      type: 'Silver Sponsor',
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: 4,
      name: 'EduGlobal Solutions',
      country: 'Thailand',
      flag: '🇹🇭',
      logo: 'EDU',
      description: 'Educational technology and research solutions',
      website: 'https://eduglobal.th',
      type: 'Bronze Sponsor',
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 5,
      name: 'ResearchTech Labs',
      country: 'Indonesia',
      flag: '🇮🇩',
      logo: 'RTL',
      description: 'Advanced research and development laboratory',
      website: 'https://researchtech.id',
      type: 'Supporting Sponsor',
      color: 'from-teal-500 to-teal-700'
    },
    {
      id: 6,
      name: 'Innovation Hub Asia',
      country: 'Vietnam',
      flag: '🇻🇳',
      logo: 'IHA',
      description: 'Regional innovation and startup ecosystem',
      website: 'https://innovationhub.vn',
      type: 'Supporting Sponsor',
      color: 'from-red-500 to-red-700'
    }
  ]

  const exhibitors = [
    {
      id: 1,
      name: 'AI Solutions Pro',
      country: 'Japan',
      flag: '🇯🇵',
      logo: 'AI-PRO',
      description: 'Cutting-edge artificial intelligence solutions',
      website: 'https://aisolutions.jp',
      booth: 'A1-A3',
      category: 'Technology',
      color: 'from-indigo-500 to-indigo-700'
    },
    {
      id: 2,
      name: 'EduTech Innovations',
      country: 'South Korea',
      flag: '🇰🇷',
      logo: 'EDUTECH',
      description: 'Educational technology and e-learning platforms',
      website: 'https://edutech.kr',
      booth: 'B4-B6',
      category: 'Education',
      color: 'from-pink-500 to-pink-700'
    },
    {
      id: 3,
      name: 'Research Publishers Ltd',
      country: 'United Kingdom',
      flag: '🇬🇧',
      logo: 'RPL',
      description: 'Academic publishing and research dissemination',
      website: 'https://researchpub.co.uk',
      booth: 'C7-C9',
      category: 'Publishing',
      color: 'from-cyan-500 to-cyan-700'
    },
    {
      id: 4,
      name: 'DataViz Analytics',
      country: 'Australia',
      flag: '🇦🇺',
      logo: 'DVA',
      description: 'Data visualization and analytics tools',
      website: 'https://dataviz.com.au',
      booth: 'D10-D12',
      category: 'Analytics',
      color: 'from-emerald-500 to-emerald-700'
    },
    {
      id: 5,
      name: 'CloudEd Systems',
      country: 'Canada',
      flag: '🇨🇦',
      logo: 'CLOUD',
      description: 'Cloud-based educational management systems',
      website: 'https://clouded.ca',
      booth: 'E13-E15',
      category: 'Cloud Solutions',
      color: 'from-violet-500 to-violet-700'
    },
    {
      id: 6,
      name: 'MobileLearn Tech',
      country: 'India',
      flag: '🇮🇳',
      logo: 'MLT',
      description: 'Mobile learning applications and platforms',
      website: 'https://mobilelearn.in',
      booth: 'F16-F18',
      category: 'Mobile Tech',
      color: 'from-amber-500 to-amber-700'
    }
  ]

  const currentData = activeTab === 'sponsors' ? sponsors : exhibitors

  const getSponsorTypeColor = type => {
    switch (type) {
      case 'Platinum Sponsor':
        return 'bg-gray-300 text-gray-800'
      case 'Gold Sponsor':
        return 'bg-yellow-400 text-yellow-900'
      case 'Silver Sponsor':
        return 'bg-gray-200 text-gray-700'
      case 'Bronze Sponsor':
        return 'bg-orange-400 text-orange-900'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden py-16 px-4'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='absolute top-0 left-0 w-full h-full'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className='relative z-10 container mx-auto max-w-7xl'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 tracking-wider'>
            <span className='text-yellow-400'>OUR</span>{' '}
            <span className='text-white'>PARTNERS</span>
          </h1>
          <p className='text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed'>
            Meet our valued sponsors and exhibitors who make EGEIMRC2025
            possible
          </p>
        </div>

        {/* Tabs */}
        <div className='flex justify-center mb-12'>
          <div className='bg-white/10 backdrop-blur-sm rounded-full p-2 inline-flex'>
            <button
              onClick={() => setActiveTab('sponsors')}
              className={`flex items-center px-8 py-4 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'sponsors'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Award className='w-5 h-5 mr-2' />
              Sponsors
            </button>
            <button
              onClick={() => setActiveTab('exhibitors')}
              className={`flex items-center px-8 py-4 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'exhibitors'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Store className='w-5 h-5 mr-2' />
              Exhibitors
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
          {currentData.map((partner, index) => (
            <div
              key={partner.id}
              className='group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer shadow-xl'
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Header with Flag and Country */}
              <div className='bg-gray-900/80 p-4 flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>{partner.flag}</span>
                  <span className='text-white font-semibold'>
                    {partner.country}
                  </span>
                </div>
                {activeTab === 'sponsors' && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getSponsorTypeColor(
                      partner.type
                    )}`}
                  >
                    {partner.type}
                  </span>
                )}
                {activeTab === 'exhibitors' && (
                  <div className='text-right'>
                    <div className='text-yellow-400 font-bold text-sm'>
                      Booth {partner.booth}
                    </div>
                    <div className='text-white/70 text-xs'>
                      {partner.category}
                    </div>
                  </div>
                )}
              </div>

              {/* Logo Section */}
              <div
                className={`relative h-48 flex items-center justify-center bg-gradient-to-br ${partner.color} group-hover:scale-110 transition-transform duration-700 overflow-hidden`}
              >
                {/* Logo */}
                <div className='text-center z-10'>
                  <div className='text-4xl md:text-5xl font-bold text-white mb-2 tracking-wider'>
                    {partner.logo}
                  </div>
                  <div className='text-white/80 text-sm font-medium'>
                    {activeTab === 'sponsors' ? 'SPONSOR' : 'EXHIBITOR'}
                  </div>
                </div>

                {/* Background Pattern */}
                <div className='absolute inset-0 opacity-10'>
                  <div className='absolute top-0 left-0 w-full h-full bg-white transform rotate-12 scale-150'></div>
                </div>

                {/* Icon Overlay */}
                <div className='absolute top-4 right-4 opacity-20'>
                  {activeTab === 'sponsors' ? (
                    <Award className='w-12 h-12 text-white' />
                  ) : (
                    <Building className='w-12 h-12 text-white' />
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className='p-6'>
                <h3 className='text-xl font-bold text-white mb-2 leading-tight'>
                  {partner.name}
                </h3>

                <p className='text-white/70 text-sm mb-4 leading-relaxed'>
                  {partner.description}
                </p>

                {/* Visit Website Button */}
                <button
                  className='group/btn w-full bg-white/10 hover:bg-yellow-400 hover:text-black text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center'
                  onClick={() => window.open(partner.website, '_blank')}
                >
                  <Globe className='w-4 h-4 mr-2' />
                  Visit Website
                  <ExternalLink className='w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200' />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className='text-center mt-16'>
          <div className='bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300'>
            <div className='flex items-center justify-center mb-6'>
              <Users className='w-12 h-12 text-black mr-4' />
              <h3 className='text-2xl md:text-4xl font-bold text-black'>
                Become Our Partner
              </h3>
            </div>
            <p className='text-black/80 mb-8 text-lg leading-relaxed'>
              Join our prestigious list of {activeTab} and gain global exposure
              at EGEIMRC2025
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-black hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg'>
                {activeTab === 'sponsors'
                  ? 'Become a Sponsor'
                  : 'Book Exhibition Space'}
              </button>
              <button className='bg-transparent border-2 border-black hover:bg-black hover:text-white text-black font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300'>
                Partnership Package
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: activeTab === 'sponsors' ? "25+" : "50+", label: activeTab === 'sponsors' ? "Global Sponsors" : "International Exhibitors" },
            { number: "15+", label: "Countries Represented" },
            { number: activeTab === 'sponsors' ? "$2M+" : "100+", label: activeTab === 'sponsors' ? "Sponsorship Value" : "Exhibition Booths" },
            { number: "98%", label: "Partner Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                {stat.number}
              </div>
              <div className="text-white/80 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default OurPartners
