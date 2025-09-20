import { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Users,
  Award,
  Computer,
  BatteryPlus,
  Earth,
  Building2,
  Component,
  Vegan,
  Factory
} from 'lucide-react'
import { MdScience,MdOutlinePsychology,MdOutlineEmojiTransportation   } from "react-icons/md";
import { GiRevolt } from "react-icons/gi";
import { RiGovernmentFill } from "react-icons/ri";

const ConferenceTracks = () => {
  const [expandedTrack, setExpandedTrack] = useState(null)

  const tracks = [
    {
      id: 1,
      title: 'Science, Technology & Engineering',
      icon: MdScience,
      subtopics: [
        'Aerospace & Automotive Engineering',
        'Artificial Intelligence, Machine Learning & Deep Learning',
        'Data Science & Data Analytics ',
        'Chemical & Materials Engineering',
        'Civil, Structural & Environmental Engineering',
        'Electrical, Electronics & Communication Engineering',
        'Internet of Things (IoT) & Smart Systems',
        'Mechanical & Industrial Engineering',
        'Quantum Computing & Emerging Technologies',
        'Renewable Energy & Sustainable Engineering',
        'Robotics ',
        'Automation & Control Systems'
      ]
    },
    {
      id: 2,
      title: 'Information & Communication Technology (ICT)',
      icon: Computer,
      subtopics: [
        '5G & Next-Generation Networks',
        'Blockchain Technology & Cryptography',
        'Cloud Computing & Big Data Analytics',
        'Cybersecurity & Privacy',
        'Digital Transformation & Society',
        'Human-Computer Interaction (HCI)',
        'ICT for Development (ICT4D)',
        'Information Systems & Knowledge Management',
        'Software Engineering & Application Development',
        'Virtual, Augmented & Mixed Reality'
      ]
    },
    {
      id: 3,
      title: 'Health, Medicine & Life Sciences',
      icon: BatteryPlus,
      subtopics: [
        'Biomedical Engineering & Biotechnology',
        'Healthcare Policy & Management',
        'Medical Imaging & Diagnostics',
        'Mental Health & Psychology',
        'Nursing & Clinical Care',
        'Nutrition & Food Sciences',
        'Pharmaceuticals & Drug Development',
        'Precision Medicine & Genomics',
        'Public Health & Epidemiology',
        'Telemedicine & Digital Health'
      ]
    },
    {
      id: 4,
      title: 'Environmental & Earth Sciences',
      icon: Earth,
      subtopics: [
        'Agriculture, Forestry & Aquaculture',
        'Biodiversity & Conservation',
        'Climate Change & Sustainability',
        'Disaster Risk Reduction & Management',
        'Environmental Policy & Governance',
        'Environmental Pollution & Remediation',
        'Geology, Geophysics & Geoinformatics',
        'Renewable Energy & Green Technologies',
        'Urban Planning & Smart Cities',
        'Water Resources & Hydrology'
      ]
    },
    {
      id: 5,
      title: 'Social Sciences & Humanities',
      icon: GiRevolt,
      subtopics: [
        'Communication, Media & Journalism',
        'Economics, Development Studies & Global Trade',
        'Education, Pedagogy & Teacher Training',
        'Gender Studies & Social Justice',
        'History, Archaeology & Heritage Preservation',
        'Law, Human Rights & International Relations',
        'Linguistics, Literature & Languages',
        'Political Science, Governance & Public Policy',
        'Psychology, Counselling & Behavioural Studies',
        'Sociology, Anthropology & Cultural Studies'
      ]
    },
    {
      id: 6,
      title: 'Business, Management & Economics',
      icon: Building2,
      subtopics: [
        'Strategic Management & Leadership',
        'Entrepreneurship & Innovation',
        'Digital Business & E-Commerce',
        'Banking, Finance & Investment',
        'Supply Chain & Operations Management',
        'Marketing, Consumer Behaviour & Branding',
        'International Business & Trade',
        'Corporate Social Responsibility & Ethics',
        'Tourism, Hospitality & Event Management',
        'Human Resource Management & Organisational Behaviour'
      ]
    },
    {
      id: 7,
      title: 'Arts, Design & Creative Industries',
      icon: Component,
      subtopics: [
        'Architecture & Interior Design',
        'Art History & Criticism',
        'Creative Writing & Literary Arts',
        'Fashion Design & Textile Studies',
        'Film, Television & Digital Media',
        'Fine Arts, Painting & Sculpture',
        'Game Design & Interactive Media',
        'Graphic Design & Multimedia Arts',
        'Performing Arts (Music, Dance, Theatre)',
        'Photography, Visual Arts & Storytelling'
      ]
    },
    {
      id: 8,
      title: 'Education, Learning & Pedagogy',
      icon: BookOpen ,
      subtopics: [
        'Assessment, Testing & Evaluation',
        'Curriculum Development & Instructional Design',
        'Early Childhood Education',
        'Educational Technology & E-Learning',
        'Global Education Policies & Reforms',
        'Higher Education & University Management',
        'Inclusive & Special Needs Education',
        'Lifelong Learning & Adult Education',
        'STEM Education & Innovative Teaching Methods',
        'Teacher Professional Development'
      ]
    },
    {
      id: 9,
      title: 'Agriculture, Food & Rural Development',
      icon: Vegan,
      subtopics: [
        'Agricultural Economics & Policy',
        'Climate-Resilient Farming',
        'Crop Science & Soil Management',
        'Fisheries & Aquaculture Technology',
        'Food Safety & Quality',
        'Livestock Production & Veterinary Science',
        'Post-Harvest Technology & Food Processing',
        'Rural Development & Poverty Alleviation',
        'Smart Farming & AgriTech',
        'Sustainable Agriculture Practices'
      ]
    },
    {
      id: 10,
      title: 'Energy, Power & Industrial Innovation',
      icon: Factory,
      subtopics: [
        'Renewable Energy Systems (Solar, Wind, Hydro)',
        'Energy Storage & Battery Technologies',
        'Nuclear Energy & Safety',
        'Oil, Gas & Petrochemical Innovations',
        'Smart Grids & Power Distribution',
        'Energy Efficiency & Conservation',
        'Industrial Automation & Industry 4.0',
        'Sustainable Manufacturing Technologies',
        'Industrial Safety & Risk Management',
        'Circular Economy & Waste-to-Energy Solutions'
      ]
    },
    {
      id: 11,
      title: 'Policy & Governance ',
      icon: RiGovernmentFill,
      subtopics: [
        'Intellectual Property Rights (IPR)',
        'Human Rights & Social Justice',
        'Public Administration & Governance',
        'Anti-Corruption, Ethics & Transparency'
      ]
    },
    {
      id: 12,
      title: 'Psychology, Behaviour & Society',
      icon: MdOutlinePsychology ,
      subtopics: [
        'Social & Behavioural Psychology',
        'Cognitive Neuroscience & Brain Studies',
        'Developmental & Educational Psychology',
        'Industrial & Organisational Psychology',
        'Counselling & Mental Health Interventions',
        'Cross-Cultural Psychology',
        'Health Psychology & Behavioural Medicine',
        'Personality & Individual Differences',
        'Positive Psychology & Well-being',
        'Forensic Psychology & Crime Behaviour'
      ]
    },
    {
      id: 13,
      title: 'Transport, Logistics & Infrastructure',
      icon: MdOutlineEmojiTransportation ,
      subtopics: [
        'Intelligent Transportation Systems (ITS)',
        'Sustainable Urban Mobility',
        'Aviation & Aeronautical Systems',
        'Marine & Shipping Logistics',
        'Railway Systems & High-Speed Transport',
        'Supply Chain Digitalisation',
        'Freight Management & Warehousing',
        'Public Transport Policy & Planning',
        'Road Safety & Traffic Management',
        'Infrastructure Development & Maintenance'
      ]
    }
  ]

  const toggleTrack = trackId => {
    setExpandedTrack(expandedTrack === trackId ? null : trackId)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div
          className='absolute top-0 left-0 w-full h-full'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className='relative z-10 container mx-auto px-4 py-20'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-6xl font-bold mb-8 tracking-wider'>
            <span className='text-yellow-400'>Conference</span>{' '}
            <span className='text-white'>Main Tracks</span>
          </h2>
          <p className='text-lg md:text-xl text-white/90 max-w-6xl mx-auto leading-relaxed'>
            Explore the core pillars of EGEIMRC2026—where diverse disciplines
            converge to shape the future. From science and technology to health,
            business, education, social sciences, law, engineering and beyond,
            discover the cutting-edge themes driving impactful research and
            real-world solutions.
          </p>
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

        {/* Call to Action */}
        <div className='text-center mt-16'>
          <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20'>
            <h3 className='text-2xl md:text-3xl font-bold text-white mb-4'>
              Ready to Submit Your Research?
            </h3>
            <p className='text-white/90 mb-8 leading-relaxed'>
              Join researchers from around the world in presenting cutting-edge
              work across these multidisciplinary tracks. Submit your abstract
              and be part of the conversation shaping tomorrow's innovations.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg'>
                Submit Abstract
              </button>
              <button className='bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200'>
                Download Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

export default ConferenceTracks
