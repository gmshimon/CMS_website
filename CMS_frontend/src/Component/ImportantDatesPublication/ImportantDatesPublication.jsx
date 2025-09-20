import { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  Award,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react'
import Marquee from 'react-fast-marquee'

const ImportantDatesPublication = () => {
  const [timeRemaining, setTimeRemaining] = useState({})

  // Important dates data
  const importantDates = [
    {
      id: 1,
      title: 'Early Bird Registration',
      date: 'Saturday, 15 October 2025',
      fullDate: '2025-10-15T23:59:59',
      icon: Users,
      color: 'bg-green-500',
      description: 'Get the best rates for conference registration'
    },
    {
      id: 2,
      title: 'Abstract submission',
      date: 'Tuesday, 31 October 2025',
      fullDate: '2025-10-31T23:59:59',
      icon: AlertCircle,
      color: 'bg-blue-500',
      description: 'Submit your research abstract'
    },
    {
      id: 3,
      title: 'Normal Registration',
      date: 'Friday, 15 November 2025',
      fullDate: '2025-11-15T23:59:59',
      icon: Calendar,
      color: 'bg-orange-500',
      description: 'Standard registration deadline'
    },
    {
      id: 4,
      title: 'Full paper submission',
      date: 'Friday, 15 November 2025',
      fullDate: '2025-11-15T23:59:59',
      icon: Award,
      color: 'bg-purple-500',
      description: 'Submit your complete research paper'
    },
    {
      id: 5,
      title: 'Conference Date',
      date: 'November 21st - 23rd 2025',
      fullDate: '2025-11-21T00:00:00',
      icon: CheckCircle,
      color: 'bg-red-500',
      description: 'The main conference event'
    }
  ]

  // Partner logos data
  const partners = [
    {
      name: 'City University pakistan',
      logo: '/Collaborators Logos/City University pakistan.png'
    },
    {
      name: 'Fatima-Jinnah-Women-University',
      logo: '/Collaborators Logos/Fatima-Jinnah-Women-University-logo.png'
    },
    {
      name: 'federal university of technology minna',
      logo: '/Collaborators Logos/federal university of technology minna.png'
    },
    {
      name: 'Fedral University DUTSE',
      logo: '/Collaborators Logos/Fedral University DUTSE.jpeg'
    },
    {
      name: 'Gift University Logo',
      logo: '/Collaborators Logos/Gift University Logo.webp'
    },
    {
      name: 'Great St.petersburg Polytechnic University',
      logo: '/Collaborators Logos/Great St.petersburg Polytechnic University.jpg'
    },
    { name: 'UTM', logo: '/Collaborators Logos/LOGO-UTM.png' },
    {
      name: 'Mehran University',
      logo: '/Collaborators Logos/Mehran University.png'
    },
    {
      name: 'Multi media university',
      logo: '/Collaborators Logos/Multi media university.jpeg'
    },
    { name: 'NUST', logo: '/Collaborators Logos/NUST-logo.png' },
    {
      name: 'Pak Austria University',
      logo: '/Collaborators Logos/Pak Austria University.png'
    },
    {
      name: 'Soft Skill Academy indinesi',
      logo: '/Collaborators Logos/Soft Skill Academy indinesia.jpeg'
    },
    {
      name: 'Telkom University indonesia',
      logo: '/Collaborators Logos/Telkom University indonesia.png'
    },
    {
      name: 'Universit of Faisalaabad',
      logo: '/Collaborators Logos/Universit of Faisalaabad.png'
    },
    {
      name: 'university of baghdad',
      logo: '/Collaborators Logos/university of baghdad.png'
    },
    {
      name: 'University of Cape Coast',
      logo: '/Collaborators Logos/University of Cape Coast.png'
    },
    {
      name: 'University of Mosul',
      logo: '/Collaborators Logos/University of Mosul.png'
    },
    {
      name: 'Unoiversity of Sargodha',
      logo: '/Collaborators Logos/Unoiversity of Sargodha.jpg'
    },
    {
      name: 'VTT Technical Research Center of Finland',
      logo: '/Collaborators Logos/VTT Technical Research Center of Finland.png'
    }
  ]

  // Calculate time remaining for each date
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()

      const newTimeRemaining = {}
      importantDates.forEach(item => {
        const targetDate = new Date(item.fullDate)
        const difference = targetDate - now

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24))
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          )

          newTimeRemaining[item.id] = { days, hours, minutes }
        } else {
          newTimeRemaining[item.id] = null // Past date
        }
      })

      setTimeRemaining(newTimeRemaining)
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const getDateStatus = dateId => {
    const remaining = timeRemaining[dateId]
    if (!remaining) return 'past'
    if (remaining.days <= 7) return 'urgent'
    if (remaining.days <= 30) return 'soon'
    return 'normal'
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
        {/* Important Dates Section */}
        <div className='mb-20'>
          {/* Header */}
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-6xl font-bold mb-4 tracking-wider'>
              <span className='text-yellow-400'>Important</span>{' '}
              <span className='text-white'>Dates</span>
            </h2>
            <p className='text-lg md:text-xl text-white/90 max-w-2xl mx-auto'>
              Stay ahead and mark your calendar!
            </p>
          </div>

          {/* Dates Timeline */}
          <div className='max-w-6xl mx-auto space-y-4'>
            {importantDates.map((item, index) => {
              const status = getDateStatus(item.id)
              const remaining = timeRemaining[item.id]

              return (
                <div
                  key={item.id}
                  className={`bg-yellow-400 backdrop-blur-sm rounded-lg p-4 md:p-6 transform hover:scale-102 transition-all duration-300 shadow-lg hover:shadow-xl ${
                    status === 'past' ? 'opacity-60' : ''
                  }`}
                >
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                    {/* Left Side - Title and Icon */}
                    <div className='flex items-center space-x-4 mb-4 md:mb-0'>
                      <div className={`${item.color} p-3 rounded-lg shadow-md`}>
                        <item.icon className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <h3 className='text-lg md:text-xl font-bold text-gray-800'>
                          {item.title}
                        </h3>
                        <p className='text-gray-700 text-sm md:text-base'>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Date and Countdown */}
                    <div className='text-right'>
                      <div className='text-xl md:text-2xl font-bold text-gray-800 italic mb-2'>
                        {item.date}
                      </div>

                      {/* Countdown Timer */}
                      {remaining && (
                        <div className='flex items-center justify-end space-x-4'>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              status === 'urgent'
                                ? 'bg-red-500 text-white'
                                : status === 'soon'
                                ? 'bg-orange-500 text-white'
                                : 'bg-green-500 text-white'
                            }`}
                          >
                            {remaining.days}d {remaining.hours}h{' '}
                            {remaining.minutes}m left
                          </div>
                          <Clock className='w-4 h-4 text-gray-600' />
                        </div>
                      )}

                      {!remaining && (
                        <div className='px-3 py-1 bg-gray-500 text-white rounded-full text-xs font-bold inline-flex items-center'>
                          <CheckCircle className='w-3 h-3 mr-1' />
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {/* Call to Action */}
        <div className='text-center mt-16'>
          <div className='bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 max-w-6xl mx-auto'>
            <h3 className='text-2xl md:text-3xl font-bold text-black mb-4'>
              Don't Miss These Important Deadlines!
            </h3>
            <p className='text-black/80 mb-6 leading-relaxed'>
              Register early and submit your research to be part of this
              prestigious international conference.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-black hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg'>
                Register Now
              </button>
              <button className='bg-transparent border-2 border-black hover:bg-black hover:text-white text-black font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200'>
                Submit Paper
              </button>
            </div>
          </div>
        </div>
        {/* Publication Section */}
        <div className='mt-20'>
          {/* Header */}
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-6xl font-bold text-yellow-400 mb-8 tracking-wider'>
              Publication
            </h2>
            <div className='max-w-6xl mx-auto'>
              <p className='text-lg md:text-xl text-white/90 leading-relaxed'>
                All submitted papers will undergo a rigorous peer-review process
                and will be evaluated based on originality, technical quality,
                research depth, contribution to the field and overall
                readability. Accepted high-quality papers will be considered for
                publication in well-reputed, high-impact factor journals,
                aligned with the specific discipline of desire paper.{' '}
                {/* <span className='text-yellow-400 font-bold'>
                  IEEE Xplore (Indexed by SCOPUS)
                </span>
                . */}
              </p>
            </div>
          </div>

          {/* Publication Benefits */}
          <div className='grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16'>
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/15 transition-all duration-300'>
              <Award className='w-12 h-12 text-yellow-400 mx-auto mb-4' />
              <h3 className='text-xl font-bold text-white mb-3'>IEEE Xplore</h3>
              <p className='text-white/80'>
                Web of Science (Publish in Prestigious Web of Science Index
                Journal){' '}
              </p>
            </div>
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/15 transition-all duration-300'>
              <CheckCircle className='w-12 h-12 text-green-400 mx-auto mb-4' />
              <h3 className='text-xl font-bold text-white mb-3'>
                SCOPUS Indexed
              </h3>
              <p className='text-white/80'>
                Indexed in SCOPUS database for global reach
              </p>
            </div>
            <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/15 transition-all duration-300'>
              <Users className='w-12 h-12 text-blue-400 mx-auto mb-4' />
              <h3 className='text-xl font-bold text-white mb-3'>Peer Review</h3>
              <p className='text-white/80'>
                Rigorous peer review process ensures quality
              </p>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div>
          <div className='bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-7xl mx-auto'>
            <h3 className='text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8'>
              Our Partners & Sponsors
            </h3>

            {/* Partners Grid */}
            <Marquee pauseOnHover={false} gradient={false} speed={40}>
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className='group bg-white rounded-lg p-4  transition-all duration-300 transform mt-2 flex items-center justify-center h-24 mx-4 min-w-[120px]'
                >
                  <img
                    className='h-16 object-contain'
                    src={partner.logo}
                    alt=''
                  />
                  {/* <div className='text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors duration-200'>
                    {partner.logo}
                  </div> */}
                </div>
              ))}
            </Marquee>

            {/* Partnership Call to Action */}
            <div className='text-center mt-8 pt-8 border-t border-gray-200'>
              <p className='text-gray-600 mb-4'>
                Interested in becoming a partner??
              </p>
              <a href='https://forms.gle/v55KdZNj5JB2HxaC8' target='_blank'>
                <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg'>
                  Collaborate With US
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  )
}

export default ImportantDatesPublication
