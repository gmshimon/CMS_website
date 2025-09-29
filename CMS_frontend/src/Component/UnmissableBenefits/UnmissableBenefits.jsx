import React, { useState } from 'react'
import {
  Users,
  Handshake,
  Award,
  BookOpen,
  Trophy,
  Mountain,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

const UnmissableBenefits = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  const benefits = [
    {
      id: 1,
      title: 'SHOWCASE YOUR RESEARCH TO A GLOBAL AUDIENCE',
      subtitle: 'Present to International Experts',
      description:
        'Your research will be published in prestigious well-reputed journals, indexed in Scopus or Web of Science, ensuring maximum visibility and citations for your work. Boost your academic profile and research impact.',
      icon: Users,
      color: 'from-blue-600 to-blue-800',
      image:
        'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/UNMISSABLE+BENEFITS+OF+JOINING+EGEIMRC2026/SHOWCASE+YOUR+RESEARCH+TO+A.jpg',
      features: [
        'Global reach',
        'Expert audience',
        'Live presentations',
        'Q&A sessions'
      ]
    },
    {
      id: 2,
      title: 'CONNECT ACROSS CONTINENTS & DISCIPLINES',
      subtitle: 'Network with Industry Leaders',
      description:
        'Build meaningful connections with researchers, academics, and industry professionals from diverse backgrounds and geographical locations. Expand your professional network and discover new collaboration opportunities.',
      icon: Handshake,
      color: 'from-green-600 to-green-800',
      image:
        'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/UNMISSABLE+BENEFITS+OF+JOINING+EGEIMRC2026/CONNECT+ACROSS+CONTINENTS.jpg',
      features: [
        'International networking',
        'Cross-disciplinary collaboration',
        'Industry partnerships',
        'Career opportunities'
      ]
    },
    {
      id: 3,
      title: 'INSIGHTFUL KEYNOTES & AI-CENTRIC PANELS',
      subtitle: 'Learn from AI Pioneers',
      description:
        'Attend cutting-edge keynote presentations and specialized AI panels featuring industry leaders and renowned researchers in artificial intelligence and emerging technologies. Stay at the forefront of innovation.',
      icon: Award,
      color: 'from-purple-600 to-purple-800',
      image:
        'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/UNMISSABLE+BENEFITS+OF+JOINING+EGEIMRC2026/INSIGHTFUL+KEYNOTES+%26+AI.jpg',
      features: [
        'Expert keynotes',
        'AI-focused content',
        'Technology trends',
        'Future insights'
      ]
    },
    {
      id: 4,
      title: 'GET PUBLISHED IN WELL REPUTED JOURNALS',
      subtitle: 'Web of Science Publication & SCOPUS Indexed',
      description:
        'Your research will be published in prestigious well-reputed journals, indexed in Scopus or Web of Science, ensuring maximum visibility and citations for your work. Boost your academic profile and research impact.',
      icon: BookOpen,
      color: 'from-orange-600 to-orange-800',
      image:
        'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/UNMISSABLE+BENEFITS+OF+JOINING+EGEIMRC2026/GET+PUBLISHED+IN+HIGH-VALUE.jpg',
      features: [
        'WoS, Scopus and HEC',
        'EGE Conference Proceedings',
        'High Citation Potential',
        'Academic Recognition',
      ]
    },
    {
      id: 5,
      title: 'ELITE INNOVATION & BEST PAPER AWARDS',
      subtitle: 'Recognition for Excellence',
      description:
        'Compete for prestigious awards recognizing outstanding research contributions, innovative solutions, and exceptional academic excellence in your field. Receive recognition and monetary rewards for your achievements.',
      icon: Trophy,
      color: 'from-yellow-600 to-yellow-800',
      image:
        'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/UNMISSABLE+BENEFITS+OF+JOINING+EGEIMRC2026/ELITE+INNOVATION+%26+BEST+PAPER.jpg',
      features: [
        'Best paper awards',
        'Innovation recognition',
        'Monetary prizes',
        'Certificate of excellence'
      ]
    },
    {
      id: 6,
      title: 'GROW BEYOND BOUNDARIES',
      subtitle: 'Expand Your Horizons',
      description:
        'Push the limits of your research and career. Discover new opportunities, collaborate on groundbreaking projects, and establish yourself as a leader in your field. Take your career to new heights.',
      icon: Mountain,
      color: 'from-teal-600 to-teal-800',
      image:
        'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/UNMISSABLE+BENEFITS+OF+JOINING+EGEIMRC2026/GROW+BEYOND+BOUNDARIES.jpg',
      features: [
        'Career advancement',
        'Research collaboration',
        'Leadership opportunities',
        'Global impact'
      ]
    }
  ]

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
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide'>
            <span className='text-yellow-400'>UNMISSABLE</span>{' '}
            <span className='text-white'>BENEFITS OF JOINING</span>{' '}
            <span className='text-yellow-400'>EGEIMRC2026</span>
          </h1>
          <p className='text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed'>
            Discover the exceptional opportunities that await you at our premier
            international conference
          </p>
        </div>

        {/* Benefits Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {benefits.map(benefit => (
            <div
              key={benefit.id}
              className='group relative overflow-hidden rounded-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer bg-white shadow-xl'
              onMouseEnter={() => setHoveredCard(benefit.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ minHeight: '400px' }}
            >
              {/* Image Container */}
              <div className='relative h-48 overflow-hidden'>
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
                {/* Image Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    benefit.color
                  } transition-opacity duration-300 ${
                    hoveredCard === benefit.id ? 'opacity-80' : 'opacity-60'
                  }`}
                />

                {/* Icon */}
                <div className='absolute top-4 left-4'>
                  <div className='bg-white/20 backdrop-blur-sm p-3 rounded-xl group-hover:bg-white/30 transition-all duration-300'>
                    <benefit.icon className='w-6 h-6 text-white' />
                  </div>
                </div>

                {/* Chevron */}
                <div className='absolute top-4 right-4'>
                  <ChevronRight
                    className={`w-6 h-6 text-white/70 transition-all duration-300 ${
                      hoveredCard === benefit.id
                        ? 'transform rotate-90 text-white'
                        : ''
                    }`}
                  />
                </div>
              </div>

              {/* Content Container */}
              <div className='p-6 h-[calc(100%-12rem)] flex flex-col'>
                {/* Title and Subtitle */}
                <div className='mb-4'>
                  <h3 className='text-lg md:text-xl font-bold text-gray-800 mb-2 leading-tight'>
                    {benefit.title}
                  </h3>
                  <p className='text-blue-600 font-semibold text-sm'>
                    {benefit.subtitle}
                  </p>
                </div>

                {/* Default state - Features */}
                <div
                  className={`flex-1 transition-all duration-500 ${
                    hoveredCard === benefit.id
                      ? 'opacity-0 transform translate-y-4 pointer-events-none'
                      : 'opacity-100 transform translate-y-0'
                  }`}
                >
                  <div className='grid grid-cols-2 gap-2'>
                    {benefit.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className='bg-gray-100 rounded-lg px-3 py-2 text-xs text-gray-700 font-medium text-center'
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover state - Description */}
                <div
                  className={`absolute inset-x-6 bottom-10 transition-all duration-500 ${
                    hoveredCard === benefit.id
                      ? 'opacity-100 transform translate-y-0'
                      : 'opacity-0 transform translate-y-4 pointer-events-none'
                  }`}
                >
                  <div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-l-4 border-blue-500'>
                    <p className='text-gray-700 text-sm leading-relaxed'>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Bar */}
        <div className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-6'>
          {[
            { number: '500+', label: 'Global Participants' },
            { number: '33+', label: 'Countries Represented' },
            { number: '200+', label: 'Research Papers' },
            { number: '25+', label: 'Keynote Speakers' }
          ].map((stat, index) => (
            <div
              key={index}
              className='text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300'
            >
              <div className='text-3xl md:text-4xl font-bold text-yellow-400 mb-2'>
                {stat.number}
              </div>
              <div className='text-white/80 text-sm md:text-base'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UnmissableBenefits
