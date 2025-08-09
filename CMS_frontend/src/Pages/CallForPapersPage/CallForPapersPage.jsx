import React, { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Users,
  Award,
  Target
} from 'lucide-react'

const CallForPapersPage = () => {
  const [expandedTrack, setExpandedTrack] = useState(null)

  const tracks = [
    {
      id: 1,
      title: 'Computer Science & Information Technology',
      icon: BookOpen,
      subtopics: [
        'Artificial Intelligence & Machine Learning',
        'Natural Language Processing',
        'Computer Vision & Image Processing',
        'Data Science & Big Data Analytics',
        'Cybersecurity & Blockchain',
        'Internet of Things (IoT) & AIoT',
        'Human-Computer Interaction',
        'Cloud & Edge Computing',
        'Software Engineering',
        'Quantum Computing'
      ]
    },
    {
      id: 2,
      title: 'Business, Management & Finance',
      icon: Target,
      subtopics: [
        'Digital Transformation & AI in Business',
        'Financial Technology & Fintech Innovation',
        'Supply Chain Management & Optimization',
        'Strategic Management & Leadership',
        'Marketing Analytics & Consumer Behavior',
        'Entrepreneurship & Innovation Management',
        'Risk Management & Financial Modeling',
        'E-commerce & Digital Marketing',
        'Human Resource Management',
        'Sustainable Business Practices'
      ]
    },
    {
      id: 3,
      title: 'Civil & Environmental Engineering',
      icon: Award,
      subtopics: [
        'Smart Cities & Urban Planning',
        'Sustainable Infrastructure Development',
        'Environmental Monitoring & Protection',
        'Climate Change & Adaptation Strategies',
        'Water Resources Management',
        'Geotechnical & Structural Engineering',
        'Transportation Systems & Mobility',
        'Green Building & Construction Technology',
        'Disaster Risk Management',
        'Renewable Energy Systems'
      ]
    },
    {
      id: 4,
      title: 'Social Sciences & Humanities',
      icon: Users,
      subtopics: [
        'AI Ethics & Society',
        'Digital Humanities & Cultural Studies',
        'Psychology & Behavioral Sciences',
        'Education Technology & Learning Analytics',
        'Communication & Media Studies',
        'Political Science & Governance',
        'Sociology & Social Innovation',
        'Philosophy & Technology',
        'Anthropology & Digital Culture',
        'Linguistics & Language Technology'
      ]
    },
    {
      id: 5,
      title: 'Mechanical & Industrial Engineering',
      icon: Target,
      subtopics: [
        'Industry 4.0 & Smart Manufacturing',
        'Robotics & Automation',
        'Advanced Materials & Nanotechnology',
        'Energy Systems & Thermal Engineering',
        'Manufacturing Processes & Quality Control',
        'Mechanical Design & CAD/CAM',
        'Operations Research & Optimization',
        'Supply Chain & Logistics Engineering',
        'Maintenance & Reliability Engineering',
        'Additive Manufacturing & 3D Printing'
      ]
    },
    {
      id: 6,
      title: 'Electrical & Electronics Engineering',
      icon: Award,
      subtopics: [
        'Power Systems & Smart Grid Technology',
        'Electronic Circuits & VLSI Design',
        'Signal Processing & Communications',
        'Control Systems & Automation',
        'Renewable Energy & Power Electronics',
        'Embedded Systems & Microcontrollers',
        'Wireless Networks & 5G Technology',
        'Sensors & Instrumentation',
        'Electromagnetic Engineering',
        'Biomedical Electronics'
      ]
    },
    {
      id: 7,
      title: 'Health & Biomedical Sciences',
      icon: Users,
      subtopics: [
        'AI in Healthcare & Medical Diagnosis',
        'Biomedical Engineering & Medical Devices',
        'Precision Medicine & Genomics',
        'Health Informatics & Digital Health',
        'Pharmaceutical Sciences & Drug Discovery',
        'Public Health & Epidemiology',
        'Medical Imaging & Radiology',
        'Telemedicine & Remote Healthcare',
        'Biotechnology & Bioengineering',
        'Clinical Research & Evidence-Based Medicine'
      ]
    }
  ]

  const toggleTrack = trackId => {
    setExpandedTrack(expandedTrack === trackId ? null : trackId)
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
          <h1 className='text-4xl md:text-6xl font-bold mb-6 tracking-wider text-yellow-500'>
            Call For Papers
          </h1>
          <p className='text-lg md:text-xl text-justify text-white/80 max-w-3xl mx-auto leading-relaxed'>
            EGEIMRC2025 offers a diverse array of session tracks designed to
            provide comprehensive insights and foster discussions across various
            disciplines. We invite researchers, academicians and professionals
            to submit their papers. Topics of interest include but are not
            limited to:
          </p>
        </div>
      </div>

      {/* Tracks Accordion */}
      <div className='max-w-7xl mx-auto space-y-2'>
        {tracks.map((track, index) => (
          <div
            key={index}
            className='bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300'
          >
            {/* Track Header */}
            <button
              onClick={() => toggleTrack(track.id)}
              className='w-full px-6 md:px-6 py-4 md:py-2 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200'
            >
              <div className='flex items-center space-x-4'>
                <div className='bg-yellow-400/20 p-3 rounded-lg'>
                  <track.icon className='w-6 h-6 md:w-8 md:h-8 text-yellow-400' />
                </div>
                <h3 className='text-lg md:text-2xl font-bold text-white pr-4'>
                  {track.title}
                </h3>
              </div>

              <div className='flex-shrink-0'>
                {expandedTrack === track.id ? (
                  <ChevronDown className='w-6 h-6 md:w-8 md:h-8 text-yellow-400 transform transition-transform duration-200' />
                ) : (
                  <ChevronRight className='w-6 h-6 md:w-8 md:h-8 text-yellow-400 transform transition-transform duration-200' />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedTrack === track.id
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className='px-6 md:px-8 pb-6 md:pb-8'>
                <div className='bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8'>
                  <div className='grid md:grid-cols-2 gap-4'>
                    {track.subtopics.map((subtopic, subIndex) => (
                      <div
                        key={subIndex}
                        className='flex items-center space-x-3 py-2 hover:bg-blue-50 rounded-lg px-3 transition-colors duration-200 group'
                      >
                        <div className='w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 group-hover:bg-yellow-500 transition-colors duration-200'></div>
                        <span className='text-gray-800 text-sm md:text-base font-medium leading-relaxed'>
                          {subtopic}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Track Statistics */}
                  <div className='mt-6 pt-6 border-t border-gray-200'>
                    <div className='flex flex-wrap gap-4 text-sm text-gray-600'>
                      <div className='flex items-center space-x-2'>
                        <Users className='w-4 h-4 text-blue-600' />
                        <span>{track.subtopics.length} Subtopics</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Award className='w-4 h-4 text-yellow-600' />
                        <span>Expert Speakers</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <BookOpen className='w-4 h-4 text-green-600' />
                        <span>Research Papers Welcome</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CallForPapersPage
