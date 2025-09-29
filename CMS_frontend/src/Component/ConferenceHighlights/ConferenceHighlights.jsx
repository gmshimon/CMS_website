import React, { useState, useEffect, useRef } from 'react'
import {
  Play,
  Pause,
  Volume2,
  Download,
  Users,
  Calendar,
  MapPin,
  Award
} from 'lucide-react'

const ConferenceHighlights = () => {
  const [countersVisible, setCountersVisible] = useState(false)
  const [animatedCounts, setAnimatedCounts] = useState({
    days: 0,
    workshops: 0,
    delegates: 0,
    speakers: 0,
    countries: 0
  })
  const sectionRef = useRef(null)

  const targetCounts = {
    days: 3,
    workshops: 4,
    delegates: 50,
    speakers: 5,
    countries: 33
  }

  // Intersection Observer for counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersVisible) {
          setCountersVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [countersVisible])

  const animateCounters = () => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setAnimatedCounts({
        days: Math.floor(targetCounts.days * progress),
        workshops: Math.floor(targetCounts.workshops * progress),
        delegates: Math.floor(targetCounts.delegates * progress),
        speakers: Math.floor(targetCounts.speakers * progress),
        countries: Math.floor(targetCounts.countries * progress)
      })

      if (step >= steps) {
        clearInterval(timer)
        setAnimatedCounts(targetCounts)
      }
    }, stepDuration)
  }

  const stats = [
    {
      value: animatedCounts.days,
      label: 'DAYS',
      subtitle: 'CONFERENCE',
      color: 'text-yellow-400',
      icon: Calendar
    },
    {
      value: animatedCounts.workshops.toString().padStart(2, '0'),
      label: '',
      subtitle: 'WORKSHOPS',
      color: 'text-yellow-400',
      icon: Users
    },
    {
      value: animatedCounts.delegates,
      label: '',
      subtitle: 'DELEGATES',
      color: 'text-yellow-400',
      icon: Users
    },
    {
      value: animatedCounts.speakers.toString().padStart(2, '0'),
      label: '',
      subtitle: 'SPEAKERS',
      color: 'text-yellow-400',
      icon: Award
    },
    {
      value: `${animatedCounts.countries}+`,
      label: '',
      subtitle: 'COUNTRIES',
      color: 'text-yellow-400',
      icon: MapPin
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900 relative overflow-hidden'>
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
        {/* What to Expect Section */}
        <div ref={sectionRef} className='text-center mb-16'>
          <h2 className='text-4xl md:text-6xl font-bold text-white mb-16 tracking-wider'>
            WHAT TO EXPECT
          </h2>

          {/* Statistics Grid */}
          <div className='grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 max-w-full mx-auto mb-20'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center group'>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20'>
                  {/* Icon */}
                  <stat.icon className='w-8 h-8 md:w-10 md:h-12 text-yellow-400 mx-auto mb-4 hover:scale-110 transition-transform duration-200' />

                  <div className='flex justify-center items-center'>
                    {/* Number */}
                    <div
                      className={`text-3xl md:text-5xl lg:text-5xl font-bold ${stat.color} mb-2 font-mono`}
                    >
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className='text-white font-bold text-sm md:text-base lg:text-lg tracking-wider ml-4'>
                      {stat.label}
                    </div>
                  </div>

                  {/* Subtitle */}
                  {stat.subtitle && (
                    <div className='text-white font-bold text-sm md:text-base lg:text-lg tracking-wider'>
                      {stat.subtitle}
                    </div>
                  )}
                </div>

                {/* Divider line (hidden on last item and mobile) */}
                {index < stats.length - 1 && (
                  <div className='hidden md:block absolute top-1/2 right-0 w-px h-16 bg-yellow-400/30 transform translate-x-1/2 -translate-y-1/2'></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Event Highlights Section */}
        <div className='mb-16'>
          <h2 className='text-4xl md:text-6xl font-bold text-white mb-16 text-center tracking-wider'>
            EVENT HIGHLIGHTS
          </h2>

          <div className='grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto'>
            {/* Conference Description */}
            <div className='bg-white/90 backdrop-blur-sm rounded-lg p-8 hover:bg-white/95 transition-all duration-300'>
              <h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-6'>
                Elite Global Excellence International Multidisciplinary Research
                Conference 2026 (EGEIMRC2026)
              </h3>

              <div className='text-gray-700 leading-relaxed space-y-4 text-sm md:text-base'>
                <p>
                  Elite Global Excellence International Multidisciplinary
                  Research Conference 2026 (EGEIMRC2026) Welcome to the Elite
                  Global Excellence International Multidisciplinary Research
                  Conference 2026 (EGEIMRC2026), where we unite brilliant minds
                  from across the globe to explore The Power of
                  Interdisciplinary Knowledge in Solving Complex Problems:
                  Bridging Science, Technology, Humanities and Beyond. This
                  theme captures the essence of collaboration, innovation, and
                  creativity, inviting researchers, scholars and visionaries to
                  combine their expertise and tackle the world's most pressing
                  challenges.
                </p>

                <p>
                  The Elite Global Excellence International Multidisciplinary
                  Research Conference 2026 (EGEIMRC2026) is a prestigious global
                  research event organized by Elite Global Excellence Sdn. Bhd.
                  With a mission to bring together scholars, researchers,
                  students and industry professionals from diverse academic and
                  professional fields, this conference serves as a powerful
                  platform for sharing knowledge, presenting research findings,
                  and exploring transformative ideas that address real-world
                  challenges. EGEIMRC2026 welcomes participants from all
                  disciplines and strongly encourages cross-field collaboration
                  to inspire innovation and progress.
                </p>
                <p className='font-semibold text-blue-800'>
                  Join us in redefining what's possible when intelligence meets
                  excellence.
                </p>
              </div>
            </div>

            {/* Video Player */}
            <div className='bg-gray-900 rounded-lg overflow-hidden shadow-2xl'>
              {/* Video Container */}
              <video
                src='https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/video/Elegant+Gloss+Logo+Reveal_1080p.mp4'
                className='w-full h-full'
                autoPlay
                muted
                loop
                playsInline
              ></video>
            </div>
          </div>

          {/* Download Brochure Button */}
          <div className='text-center mt-12'>
            <button className='bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto'>
              <Download className='w-5 h-5' />
              <span>Download Brochure</span>
            </button>
          </div>
        </div>
      </div>

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

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}

export default ConferenceHighlights
