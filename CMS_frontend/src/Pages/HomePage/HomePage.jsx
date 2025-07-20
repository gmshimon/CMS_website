import React, { useState, useEffect } from 'react'
import {
  ChevronDown,
  Calendar,
  MapPin,
  Users,
  Award,
  BookOpen
} from 'lucide-react'
import { useNavigate } from 'react-router'

const HomePage = () => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })



  // Calculate countdown
  useEffect(() => {
    const targetDate = new Date('2025-11-21T00:00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        )
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const navigate = useNavigate()


  const features = [
    {
      icon: Users,
      title: 'Global Network',
      description: 'Connect with researchers worldwide'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Cutting-edge research presentations'
    },
    {
      icon: BookOpen,
      title: 'Knowledge',
      description: 'Learn from industry experts'
    }
  ]

  return (
    <>
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

        {/* Navigation */}
     

        {/* Hero Section */}
        <div className='relative z-10 container mx-auto px-4 pt-12 pb-20'>
          {/* Main Title */}
          <div className='text-center mb-8 animate-fade-in'>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight'>
              Elite Global Excellence
            </h1>
            <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-yellow-400 mb-4'>
              International Multidisciplinary Research Conference 2025
            </h2>
            <h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-yellow-400 mb-8'>
              (EGEIMRC2025)
            </h3>

            <p className='text-lg md:text-xl lg:text-2xl text-white/90 italic font-light mb-12 max-w-4xl mx-auto leading-relaxed'>
              "AI-Driven Innovation: Bridging Science, Society, and Technology"
            </p>
          </div>

          {/* Conference Details */}
          <div className='bg-white/90 backdrop-blur-sm rounded-lg p-6 mb-12 max-w-4xl mx-auto'>
            <div className='flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8'>
              <div className='flex items-center space-x-2'>
                <Calendar className='w-6 h-6 text-blue-600' />
                <span className='text-lg font-semibold text-gray-800'>
                  November 21st - 23rd 2025
                </span>
              </div>
              <div className='flex items-center space-x-2'>
                <MapPin className='w-6 h-6 text-blue-600' />
                <span className='text-lg font-semibold text-blue-600'>
                  UTM Skudai, JB MALAYSIA
                </span>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto mb-12'>
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' }
            ].map((item, index) => (
              <div key={index} className='text-center'>
                <div className='bg-white rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mx-auto mb-3 shadow-lg transform hover:scale-105 transition-transform duration-200'>
                  <div>
                    <div className='text-2xl md:text-4xl font-bold text-gray-800'>
                      {item.value}
                    </div>
                    <div className='text-sm md:text-lg text-teal-600 font-semibold'>
                      {item.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className='text-center mb-12'>
            <h3 className='text-2xl md:text-3xl font-bold text-white mb-8'>
              Fuel your research journey—Register now!
            </h3>
            <button
            onClick={()=>{
                navigate('/login')
            }}
             className='btn btn-lg bg-yellow-500 hover:bg-yellow-400 text-black font-bold border-none px-12 py-4 text-xl rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl'>
              Register
            </button>
          </div>

          {/* Features Section */}
          <div className='grid md:grid-cols-3 gap-8 mt-20'>
            {features.map((feature, index) => (
              <div key={index} className='text-center group'>
                <div className='bg-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105'>
                  <feature.icon className='w-12 h-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200' />
                  <h4 className='text-xl font-bold text-white mb-3'>
                    {feature.title}
                  </h4>
                  <p className='text-white/80'>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
            <ChevronDown className='w-8 h-8 text-white/60' />
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}</style>
      </div>
    </>
  )
}

export default HomePage
