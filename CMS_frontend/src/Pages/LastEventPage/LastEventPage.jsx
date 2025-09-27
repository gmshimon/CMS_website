import React, { useState } from 'react'
import {
  Play,
  Calendar,
  MapPin,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Globe,
  Star,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText
} from 'lucide-react'

const AboutLastEventPage = () => {
  const [activeTab, setActiveTab] = useState('conference')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Sample images for the gallery
  const eventImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      title: 'Opening Ceremony',
      description: 'Distinguished guests at the inaugural session'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=600&fit=crop',
      title: 'Keynote Speaker',
      description: 'Dr. Sarah Johnson delivering the main keynote'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
      title: 'Panel Discussion',
      description: 'Expert panel on AI and Future Technologies'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&h=600&fit=crop',
      title: 'Networking Session',
      description: 'Participants engaging in productive discussions'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop',
      title: 'Award Ceremony',
      description: 'Recognizing outstanding research contributions'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop',
      title: 'Workshop Session',
      description: 'Hands-on AI and Machine Learning workshop'
    }
  ]

  const eventStats = [
    { icon: Users, value: '850+', label: 'Participants' },
    { icon: Globe, value: '45', label: 'Countries' },
    { icon: BookOpen, value: '320', label: 'Research Papers' },
    { icon: Award, value: '25', label: 'Awards Given' },
    { icon: Users, value: '80', label: 'Speakers' },
    { icon: TrendingUp, value: '95%', label: 'Satisfaction Rate' }
  ]

  const keyHighlights = [
    {
      title: 'Distinguished Keynote Speakers',
      description:
        'World-renowned experts from leading universities and tech companies shared cutting-edge insights.',
      items: [
        'Dr. Sarah Johnson - MIT',
        'Prof. Ahmed Hassan - Oxford',
        'Dr. Lisa Chen - Google AI'
      ]
    },
    {
      title: 'Innovative Research Presentations',
      description:
        'Breakthrough research across multiple disciplines was presented and discussed.',
      items: [
        '320 peer-reviewed papers',
        '15 technical sessions',
        'Best paper awards'
      ]
    },
    {
      title: 'Interactive Workshops',
      description:
        'Hands-on sessions provided practical experience with latest technologies.',
      items: ['AI/ML Workshop', 'Blockchain Applications', 'IoT Implementation']
    },
    {
      title: 'Global Networking',
      description:
        'Participants from 45 countries created valuable international connections.',
      items: [
        'Industry partnerships',
        'Research collaborations',
        'Student exchanges'
      ]
    }
  ]

  const cards = [
    {
      id: 1,
      category: 'Conference Proceedings',
      title: 'EGEIMRC 2024 Proceedings',
      subtitle:
        'The 4th International Conference on Emerging Smart Technologies and Applications',
      doi: 'DOI:10.1109/EGEIMRC202462850.2024',
      icon: FileText,
      bgColor: 'from-blue-600 to-blue-800',
      buttonText: 'Access Proceedings'
    },
    {
      id: 2,
      category: 'Program Book',
      title: 'EGEIMRC 2024 Program Book',
      subtitle:
        'The 4th International Conference on Emerging Smart Technologies and Applications',
      doi: 'DOI:10.1109/EGEIMRC202462850.2024',
      icon: BookOpen,
      bgColor: 'from-blue-600 to-blue-800',
      buttonText: 'Download Program'
    }
  ]
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % eventImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      prev => (prev - 1 + eventImages.length) % eventImages.length
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='absolute top-0 left-0 w-full h-full'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className='relative z-10 py-16 px-4'>
        {/* Header Section */}
        <div className='container mx-auto max-w-7xl'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 tracking-wider text-yellow-500'>
              EGEIMRC 2024
            </h1>
            <p className='text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8'>
              A remarkable success that brought together brilliant minds from
              around the world to explore the frontiers of engineering,
              innovation, and technology.
            </p>

            {/* Event Basic Info */}
            <div className='flex flex-wrap justify-center gap-6 text-white/90'>
              <div className='flex items-center space-x-2'>
                <Calendar className='w-5 h-5 text-yellow-400' />
                <span>March 15-17, 2024</span>
              </div>
              <div className='flex items-center space-x-2'>
                <MapPin className='w-5 h-5 text-yellow-400' />
                <span>Istanbul, Turkey</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Users className='w-5 h-5 text-yellow-400' />
                <span>850+ Participants</span>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className='mb-20'>
            <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20'>
              <h2 className='text-3xl font-bold text-white mb-6 text-center'>
                Event Highlights Video
              </h2>
              <div className='relative aspect-video bg-black rounded-xl overflow-hidden group cursor-pointer'>
                {!isVideoPlaying ? (
                  <>
                    <img
                      src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=675&fit=crop'
                      alt='Video Thumbnail'
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-300'>
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className='bg-yellow-500 hover:bg-yellow-400 rounded-full p-4 transform hover:scale-110 transition-all duration-300 shadow-2xl'
                      >
                        <Play
                          className='w-12 h-12 text-black ml-1'
                          fill='currentColor'
                        />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className='w-full h-full bg-gray-800 flex items-center justify-center'>
                    <p className='text-white text-lg'>
                      Video would play here in actual implementation
                    </p>
                  </div>
                )}
              </div>
              <p className='text-white/70 text-center mt-4'>
                Watch the complete highlights of EGEIMRC2024 featuring keynote
                speeches, panel discussions, and networking moments.
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <div className='mb-20'>
            <h2 className='text-3xl font-bold text-white mb-12 text-center'>
              Event Statistics
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
              {eventStats.map((stat, index) => (
                <div
                  key={index}
                  className='bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300'
                >
                  <stat.icon className='w-8 h-8 text-yellow-400 mx-auto mb-3' />
                  <div className='text-2xl font-bold text-white mb-1'>
                    {stat.value}
                  </div>
                  <div className='text-white/70 text-sm'>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          <div className='mb-20'>
            <h2 className='text-3xl font-bold text-white mb-12 text-center'>
              Photo Gallery
            </h2>
            <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20'>
              {/* Main Image Display */}
              <div className='relative mb-6'>
                <div className='aspect-video rounded-xl overflow-hidden'>
                  <img
                    src={eventImages[currentImageIndex].src}
                    alt={eventImages[currentImageIndex].title}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors duration-300'
                >
                  <ChevronLeft className='w-6 h-6 text-white' />
                </button>
                <button
                  onClick={nextImage}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors duration-300'
                >
                  <ChevronRight className='w-6 h-6 text-white' />
                </button>
              </div>

              {/* Image Info */}
              <div className='text-center mb-6'>
                <h3 className='text-xl font-bold text-white mb-2'>
                  {eventImages[currentImageIndex].title}
                </h3>
                <p className='text-white/70'>
                  {eventImages[currentImageIndex].description}
                </p>
              </div>

              {/* Thumbnail Navigation */}
              <div className='flex justify-center space-x-2 overflow-x-auto pb-2'>
                {eventImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'border-yellow-400'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className='w-full h-full object-cover'
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Schedule Section */}
          <div className='mb-20'>
            {/* <h2 className='text-3xl font-bold text-white mb-12 text-center'>
              Conference Schedule
            </h2> */}
            {/* Tabs */}
            <div className='flex justify-center mb-8 space-x-4'>
              <button
                onClick={() => setActiveTab('conference')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'conference'
                    ? 'bg-yellow-500 text-black shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                Conference Schedule
              </button>
              <button
                onClick={() => setActiveTab('event')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'event'
                    ? 'bg-yellow-500 text-black shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                Event Schedule
              </button>
            </div>
            {/*Conference Schedule */}
            {activeTab === 'conference' && (
              <div>
                {/* Day 1 */}
                <div className='mb-12'>
                  <div className='bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden'>
                    <div className='bg-yellow-500/20 px-8 py-4 border-b border-white/20'>
                      <h3 className='text-2xl font-bold text-yellow-400 flex items-center'>
                        <Calendar className='w-6 h-6 mr-3' />
                        Day 1 - March 15, 2024
                      </h3>
                      <p className='text-white/80 mt-2'>
                        Opening Ceremony & Keynote Sessions
                      </p>
                    </div>

                    <div className='p-8'>
                      <div className='grid gap-6'>
                        {/* Morning Session */}
                        <div className='bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300'>
                          <h4 className='text-lg font-bold text-white mb-4 flex items-center'>
                            <div className='w-3 h-3 rounded-full bg-yellow-400 mr-3'></div>
                            Morning Session (9:00 AM - 12:30 PM)
                          </h4>
                          <div className='space-y-4'>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                09:00
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Registration & Welcome Coffee
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Participant check-in and networking breakfast
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                10:00
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Opening Ceremony
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Welcome address by conference chairs and
                                  distinguished guests
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                11:00
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Keynote Speech I
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  <strong>Dr. Sarah Johnson (MIT):</strong> "The
                                  Future of AI in Engineering"
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                12:00
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Networking & Coffee Break
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Interactive networking session with
                                  refreshments
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Afternoon Session */}
                        <div className='bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300'>
                          <h4 className='text-lg font-bold text-white mb-4 flex items-center'>
                            <div className='w-3 h-3 rounded-full bg-blue-400 mr-3'></div>
                            Afternoon Session (2:00 PM - 6:00 PM)
                          </h4>
                          <div className='space-y-4'>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                14:00
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Technical Session I
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Computer Science & AI Research Presentations
                                  (8 papers)
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                15:30
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Panel Discussion
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  "Emerging Technologies and Their Impact on
                                  Society"
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                16:30
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Workshop Session
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Hands-on Machine Learning Workshop
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                18:00
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Welcome Reception
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Cocktail reception and cultural program
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 2 */}
                <div className='mb-12'>
                  <div className='bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden'>
                    <div className='bg-blue-500/20 px-8 py-4 border-b border-white/20'>
                      <h3 className='text-2xl font-bold text-blue-400 flex items-center'>
                        <Calendar className='w-6 h-6 mr-3' />
                        Day 2 - March 16, 2024
                      </h3>
                      <p className='text-white/80 mt-2'>
                        Research Sessions & Awards Ceremony
                      </p>
                    </div>

                    <div className='p-8'>
                      <div className='grid gap-6'>
                        {/* Morning Session Day 2 */}
                        <div className='bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300'>
                          <h4 className='text-lg font-bold text-white mb-4 flex items-center'>
                            <div className='w-3 h-3 rounded-full bg-green-400 mr-3'></div>
                            Morning Session (9:00 AM - 12:30 PM)
                          </h4>
                          <div className='space-y-4'>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                09:00
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Keynote Speech II
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  <strong>Prof. Ahmed Hassan (Oxford):</strong>{' '}
                                  "Sustainable Engineering for Climate Change"
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                10:00
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Technical Session II
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Engineering & Environmental Sciences (10
                                  papers)
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                11:30
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Coffee Break & Poster Session
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Interactive poster presentations (50+ posters)
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Afternoon Session Day 2 */}
                        <div className='bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300'>
                          <h4 className='text-lg font-bold text-white mb-4 flex items-center'>
                            <div className='w-3 h-3 rounded-full bg-purple-400 mr-3'></div>
                            Afternoon Session (2:00 PM - 7:00 PM)
                          </h4>
                          <div className='space-y-4'>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                14:00
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Technical Session III
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Business Innovation & Management (12 papers)
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                15:30
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Industry Session
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Technology Transfer and Commercialization
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                16:30
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Best Paper Awards
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Recognition of outstanding research
                                  contributions
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                17:30
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Closing Ceremony
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Conference wrap-up and announcement of next
                                  year
                                </p>
                              </div>
                            </div>
                            <div className='flex items-start space-x-4'>
                              <div className='text-yellow-400 font-mono text-sm min-w-[80px]'>
                                18:30
                              </div>
                              <div className='flex-1'>
                                <h5 className='font-semibold text-white'>
                                  Gala Dinner
                                </h5>
                                <p className='text-white/70 text-sm'>
                                  Celebration dinner with entertainment and
                                  networking
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 3 Preview */}
                <div className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 text-center'>
                  <h3 className='text-xl font-bold text-white mb-2'>
                    Day 3 - March 17, 2024
                  </h3>
                  <p className='text-white/80'>
                    Optional workshops, site visits, and departure arrangements
                  </p>
                </div>
              </div>
            )}

            {/* Event Schedule */}
            {activeTab === 'event' && (
              <div className='space-y-12'>
                {/* Example Event Schedule */}
                <div className='bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden'>
                  <div className='bg-blue-500/20 px-8 py-4 border-b border-white/20'>
                    <h3 className='text-2xl font-bold text-blue-400 flex items-center'>
                      <Calendar className='w-6 h-6 mr-3' />
                      Day 1 - Evening Events
                    </h3>
                    <p className='text-white/80 mt-2'>
                      Networking & Cultural Events
                    </p>
                  </div>

                  <div className='p-8 space-y-4'>
                    <div className='flex items-start space-x-4'>
                      <div className='text-blue-400 font-mono text-sm min-w-[80px]'>
                        19:00
                      </div>
                      <div>
                        <h5 className='font-semibold text-white'>
                          Welcome Dinner
                        </h5>
                        <p className='text-white/70 text-sm'>
                          Dinner with cultural performances
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start space-x-4'>
                      <div className='text-blue-400 font-mono text-sm min-w-[80px]'>
                        21:00
                      </div>
                      <div>
                        <h5 className='font-semibold text-white'>
                          Networking Night
                        </h5>
                        <p className='text-white/70 text-sm'>
                          Informal networking with live music
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add more days/events as needed */}
              </div>
            )}
          </div>

          {/* Key Highlights */}
          <div className='mb-20'>
            <h2 className='text-3xl font-bold text-white mb-12 text-center'>
              Key Highlights
            </h2>
            <div className='grid md:grid-cols-2 gap-6'>
              {keyHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className='bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300'
                >
                  <h3 className='text-xl font-bold text-yellow-400 mb-3'>
                    {highlight.title}
                  </h3>
                  <p className='text-white/80 mb-4 leading-relaxed'>
                    {highlight.description}
                  </p>
                  <ul className='space-y-2'>
                    {highlight.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className='flex items-center space-x-2'
                      >
                        <Star className='w-4 h-4 text-yellow-400 flex-shrink-0' />
                        <span className='text-white/70 text-sm'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Downloads & Links Section */}
          <div className='mb-20'>
            <h2 className='text-3xl font-bold text-white mb-12 text-center'>
              Resources & Downloads
            </h2>
            <div className='bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20'>
              <div className='grid md:grid-cols-3 gap-6'>
                <button className='bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg p-6 text-center transition-all duration-300 group'>
                  <Download className='w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300' />
                  <h3 className='font-bold text-white mb-2'>
                    Conference Proceedings
                  </h3>
                  <p className='text-white/70 text-sm'>
                    Download all published papers
                  </p>
                </button>

                <button className='bg-blue-500/20 hover:bg-blue-500/30 rounded-lg p-6 text-center transition-all duration-300 group'>
                  <BookOpen className='w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300' />
                  <h3 className='font-bold text-white mb-2'>Photo Album</h3>
                  <p className='text-white/70 text-sm'>
                    Complete event photo collection
                  </p>
                </button>

                <button className='bg-green-500/20 hover:bg-green-500/30 rounded-lg p-6 text-center transition-all duration-300 group'>
                  <ExternalLink className='w-8 h-8 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300' />
                  <h3 className='font-bold text-white mb-2'>
                    Presentation Slides
                  </h3>
                  <p className='text-white/70 text-sm'>
                    Access keynote presentations
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className='text-center'>
            <div className='bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30'>
              <h2 className='text-3xl font-bold text-white mb-4'>
                Join Us for EGEIMRC 2025
              </h2>
              <p className='text-white/80 mb-6 max-w-2xl mx-auto'>
                Building on the tremendous success of 2024, we're excited to
                announce EGEIMRC 2025. Be part of the next chapter in
                engineering and technology innovation.
              </p>
              <button className='bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg'>
                Register for 2025 →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='relative pb-10'>
        <div className='relative z-10 container mx-auto max-w-7xl'>
          {/* Cards Container */}
          <div className='space-y-8'>
            {cards.map(card => (
              <div key={card.id} className='w-full'>
                {/* Category Header */}
                <div className='mb-4'>
                  <h2 className='text-2xl md:text-3xl font-bold text-white mb-2'>
                    {card.category}
                  </h2>
                  <div className='w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600'></div>
                </div>

                {/* Main Card */}
                <div className=' backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]'>
                  <div className='flex flex-col md:flex-row'>
                    {/* Left Side - Icon Section */}
                    <div
                      className={`bg-blue-900 flex items-center justify-center md:w-64`}
                    >
                      <div className='text-center'>
                        <div className='text-yellow-300 text-2xl md:text-3xl font-bold mb-2'>
                          EGEIMRC
                        </div>
                        <div className='text-yellow-300 text-xl md:text-2xl font-bold mb-1'>
                          2024
                        </div>
                        <div className='text-white text-lg md:text-xl font-semibold'>
                          {card.category.split(' ')[1]}
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Content Section */}
                    <div className='flex-1 lg:px-12 lg:py-6 bg-white/95'>
                      <div className='h-full flex flex-col justify-between'>
                        {/* Content */}
                        <div>
                          <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 leading-tight'>
                            {card.title}
                          </h3>
                          <p className='text-gray-600 text-lg md:text-xl mb-2 leading-relaxed'>
                            {card.subtitle}
                          </p>
                          <div className='bg-blue-50 rounded-xl p-2 border-l-4 border-blue-500 mb-6'>
                            <p className='text-blue-800 font-mono text-sm md:text-base'>
                              {card.doi}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info Section */}
          {/* <div className='mt-16 text-center'>
            <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                Need Help Accessing Materials?
              </h3>
              <p className='text-white/80 text-lg mb-6'>
                Contact our technical support team for assistance with downloads
                and access issues.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button className='bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105'>
                  Contact Support
                </button>
                <button className='bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105'>
                  FAQ
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default AboutLastEventPage
