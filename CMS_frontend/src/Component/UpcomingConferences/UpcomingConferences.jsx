import { Calendar, MapPin } from 'lucide-react'

const UpcomingConferences = () => {
  const conference = {
    id: 1,
    title: 'Elite Global Excellence International',
    subtitle: 'Undergraduate Research Conference 2026',
    shortName: 'EGEIURC2026',
    date: 'November 4-7, 2027',
    fullDate: '2026-03-15T00:00:00',
    location: 'Kuala Lumpur, Malaysia',
    description:
      'Join the premier international undergraduate research conference featuring cutting-edge research presentations, networking opportunities, and academic excellence.',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop&crop=center',
    participants: '800+',
    countries: '45+',
    papers: '300+',
    highlights: [
      'Undergraduate Research',
      'Global Networking',
      'IEEE Publication',
      'Best Paper Awards'
    ]
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
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 tracking-wider'>
            Upcoming Conferences
          </h1>
          <p className='text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed'>
            Be part of our upcoming international gatherings where knowledge
            meets opportunity—bringing together scholars, professionals, and
            innovators from diverse fields to exchange ideas, showcase research,
            and build collaborations that shape a better future.
          </p>
        </div>

        {/* Main Conference Slider */}
        <div className='relative mb-12'>
          <div className='overflow-hidden rounded-3xl shadow-2xl'>
            <div className='flex transition-transform duration-700 ease-in-out'>
              <div
                key={conference.id}
                className='w-full flex-shrink-0 relative'
              >
                {/* Background Image */}
                <div
                  className='h-96 md:h-[500px] bg-cover bg-center relative'
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${conference.image})`
                  }}
                >
                  {/* Content Overlay */}
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='text-center max-w-4xl px-6'>
                      {/* Conference Title */}
                      <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-4'>
                        <span className='text-yellow-400'>
                          {conference.title}
                        </span>
                      </h2>
                      <h3 className='text-xl md:text-3xl lg:text-4xl font-bold text-white mb-6'>
                        {conference.subtitle}
                      </h3>
                      <div className='text-lg md:text-2xl font-bold text-yellow-400 mb-8'>
                        ({conference.shortName})
                      </div>

                      {/* Conference Details */}
                      <div className='flex flex-col md:flex-row items-center justify-center gap-6 mb-8'>
                        <div className='flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                          <Calendar className='w-5 h-5 text-yellow-400 mr-2' />
                          <span className='text-white font-semibold'>
                            {conference.date}
                          </span>
                        </div>
                        <div className='flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2'>
                          <MapPin className='w-5 h-5 text-yellow-400 mr-2' />
                          <span className='text-white font-semibold'>
                            {conference.location}
                          </span>
                        </div>
                      </div>

                      {/* Register Button */}
                      <a href="http://vgw4k0og4cw48oww0k4sw400.31.97.71.226.sslip.io/register" target='_blank'>
                        <button className='bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg'>
                        Register Now
                      </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingConferences
