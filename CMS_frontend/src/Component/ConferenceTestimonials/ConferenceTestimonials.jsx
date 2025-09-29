import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import Marquee from 'react-fast-marquee'

const ConferenceTestimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Christina Ralph S. Daudiass',
      title: 'Chief Researcher',
      company: 'Global Tech Institute',
      message:
        "It's not possible to choose the 'boundless opportunities for growth' and 'collaborative research environment' that EGEIMRC2026 offers. The networking potential is extraordinary.",
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 2,
      name: 'Prof. Martyn Eng',
      title: 'Department Head',
      company: 'Innovation Research Center',
      message:
        'Everything was great. Thank you! The keynote sessions were incredibly insightful and the peer-to-peer learning opportunities exceeded my expectations.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 3,
      name: 'Dr. Zesty Deepvani',
      title: 'Senior Research Scientist',
      company: 'Advanced Materials Lab',
      message:
        'The conference provided an excellent platform for presenting cutting-edge research. The feedback from peers was invaluable for my ongoing projects.',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616c27de4cb?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 4,
      name: 'Prof. Scott Johnson',
      title: 'Director of Research',
      company: 'International Engineering Council',
      message:
        'Congratulations to EGEIMRC for the successful event! The organization was flawless and the quality of presentations was world-class.',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 5,
      name: 'Dr. Kai Kok Kim',
      title: 'Research Fellow',
      company: 'Sustainable Technology Institute',
      message:
        "I like the virtual attendance option offered at EGEIMRC2026. It made the conference accessible to researchers from around the globe who couldn't travel.",
      image:
        'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 6,
      name: 'Dr. Sarah Chen',
      title: 'Research Director',
      company: 'Future Tech Labs',
      message:
        'The interdisciplinary approach at EGEIMRC2026 opened new avenues for collaboration. I established partnerships that are already yielding results.',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 7,
      name: 'Prof. Ahmed Hassan',
      title: 'Department Chair',
      company: 'Middle East Research Institute',
      message:
        'Outstanding organization and content quality. The virtual platform was seamless and the networking opportunities exceeded expectations.',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 8,
      name: 'Dr. Maria Rodriguez',
      title: 'Senior Scientist',
      company: 'Innovation Hub Barcelona',
      message:
        'The poster sessions were incredibly well-organized. I received valuable feedback and made connections that will benefit my research for years.',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616c27de4cb?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 9,
      name: 'Dr. James Mitchell',
      title: 'Principal Investigator',
      company: 'Cambridge Research Center',
      message:
        'The quality of keynote speakers was exceptional. Each presentation provided fresh perspectives on current challenges in our field.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5
    },
    {
      id: 10,
      name: 'Dr. Lisa Park',
      title: 'Innovation Lead',
      company: 'Seoul Tech University',
      message:
        'EGEIMRC2026 provided the perfect platform to showcase our latest research. The audience engagement was remarkable.',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5
    }
  ]

  // Get cards per slide based on screen size
  const getCardsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 5 // xl screens
      if (window.innerWidth >= 1024) return 4 // lg screens
      if (window.innerWidth >= 768) return 2 // md screens
      return 1 // sm screens
    }
    return 4 // default for SSR
  }

  const [cardsPerSlide, setCardsPerSlide] = React.useState(getCardsPerSlide)

  // Update cards per slide on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setCardsPerSlide(getCardsPerSlide())
      setCurrentSlide(0) // Reset to first slide on resize
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = Math.ceil(testimonials.length / cardsPerSlide)

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides)
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
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide'>
            <span className='text-yellow-400'>WHAT ATTENDEES</span>{' '}
            <span className='text-white'>SAY ABOUT</span>{' '}
            <span className='text-yellow-400'>EGEIMRC2026</span>
          </h1>
          <p className='text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed'>
            Hear from our global community of researchers, academics, and
            industry professionals
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className='relative'>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group'
          >
            <ChevronLeft className='w-6 h-6 text-white group-hover:text-yellow-400' />
          </button>

          <button
            onClick={nextSlide}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group'
          >
            <ChevronRight className='w-6 h-6 text-white group-hover:text-yellow-400' />
          </button>

          {/* Testimonials Grid */}
          <div className='overflow-hidden'>
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className='w-full flex-shrink-0 flex'>
                  <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4'>
                    {testimonials
                      .slice(
                        slideIndex * cardsPerSlide,
                        (slideIndex + 1) * cardsPerSlide
                      )
                      .map(testimonial => (
                        <div key={testimonial.id} className='w-full'>
                          <div className='bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-4 xl:p-6 h-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden '>
                            {/* Quote Icon */}
                            <div className='absolute top-3 right-3 opacity-20'>
                              <Quote className='w-6 h-6 xl:w-8 xl:h-8 text-white' />
                            </div>

                            {/* Profile Section */}
                            <div className='flex items-center mb-3 xl:mb-4'>
                              
                              <div className='flex-1 min-w-0'>
                                <h3 className='text-white font-bold text-sm xl:text-lg leading-tight truncate'>
                                  {testimonial.name}
                                </h3>
                                <p className='text-white/80 text-xs xl:text-sm truncate'>
                                  {testimonial.title}
                                </p>
                                <p className='text-yellow-300 text-xs xl:text-sm font-medium truncate'>
                                  {testimonial.company}
                                </p>
                              </div>
                            </div>

                            {/* Rating */}
                            {/* <div className='flex mb-3 xl:mb-4'>
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className='w-4 h-4 xl:w-5 xl:h-5 text-yellow-400 fill-current'
                                />
                              ))}
                            </div> */}

                            {/* Message */}
                            <p className='text-white/90 text-xs xl:text-sm leading-relaxed mb-3 xl:mb-4 line-clamp-4'>
                              "{testimonial.message}"
                            </p>

                            {/* Decorative bottom border */}
                            <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600'></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Pagination Dots */}
        <div className='flex justify-center mt-8 space-x-2'>
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-yellow-400 w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        {/* Bottom Conference Images Section */}
        <div className='mt-10'>
           <Marquee
    gradient={false}
    speed={40}
    pauseOnHover={true}
    className="rounded-2xl overflow-hidden"
  >
    {[
      {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
        alt: "Conference networking",
      },
      {
        src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop",
        alt: "Keynote presentation",
      },
      {
        src: "https://images.unsplash.com/photo-1559223607-a43c990c692e?w=400&h=300&fit=crop",
        alt: "Research discussion",
      },
      {
        src: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=400&h=300&fit=crop",
        alt: "Panel session",
      },
      {
        src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
        alt: "Conference workshop",
      },
    ].map((image, i) => (
      <div key={i} className="relative h-32 md:h-48 w-72 flex-shrink-0 mx-2">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
      </div>
    ))}
  </Marquee>
        </div>
      </div>
    </div>
  )
}

export default ConferenceTestimonials
