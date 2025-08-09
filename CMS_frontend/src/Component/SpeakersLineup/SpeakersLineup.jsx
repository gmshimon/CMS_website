import { useState, useRef } from 'react'
import { X, MapPin, Award, ExternalLink } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/autoplay'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'
// import required modules
import { EffectCards } from 'swiper/modules'
const SpeakersLineup = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null)

  const swiperRef = useRef(null)

  // Mock speakers data - replace with your actual data
  const speakers = [
    {
      id: 1,
      name: 'Dr. Anika Grant',
      title: 'Board Advisor for Ecosystem and Former Chief Innovation',
      company: 'Tech Innovation Labs',
      image: '/api/placeholder/300/400',
      location: 'Silicon Valley, USA',
      expertise: ['AI Ethics', 'Innovation Strategy', 'Digital Transformation'],
      bio: 'Dr. Anika Grant is a visionary leader in AI ethics and innovation strategy with over 15 years of experience in transforming how organizations approach artificial intelligence. As a former Chief Innovation Officer and current Board Advisor, she has guided numerous Fortune 500 companies through digital transformation initiatives.',
      achievements: [
        'Led AI transformation for 50+ global companies',
        'Published 25+ research papers on AI ethics',
        'Keynote speaker at 100+ international conferences',
        'Founded the Global AI Ethics Initiative'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        website: '#'
      }
    },
    {
      id: 2,
      name: 'Prof. Marcus Chen',
      title: 'Director of AI Research Institute',
      company: 'Stanford University',
      image: '/api/placeholder/300/400',
      location: 'Stanford, USA',
      expertise: ['Machine Learning', 'Neural Networks', 'Computer Vision'],
      bio: 'Professor Marcus Chen is a renowned AI researcher and educator, leading breakthrough research in machine learning and neural networks. His work has been instrumental in advancing computer vision technologies used in autonomous vehicles and medical diagnostics.',
      achievements: [
        '30+ years in AI research and development',
        'Author of 150+ peer-reviewed publications',
        'Received the Turing Award for AI contributions',
        'Mentored 200+ PhD students worldwide'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        website: '#'
      }
    },
    {
      id: 3,
      name: 'Dr. Sarah Williams',
      title: 'Chief Technology Officer',
      company: 'Global Health AI',
      image: '/api/placeholder/300/400',
      location: 'London, UK',
      expertise: ['Healthcare AI', 'Medical Imaging', 'Precision Medicine'],
      bio: 'Dr. Sarah Williams pioneers the application of AI in healthcare, focusing on medical imaging and precision medicine. Her innovative solutions have improved diagnostic accuracy and patient outcomes in hospitals worldwide.',
      achievements: [
        'Developed AI systems used in 500+ hospitals',
        'Reduced diagnostic errors by 40% through AI',
        'Led $50M healthcare AI research initiatives',
        'Winner of Healthcare Innovation Award 2024'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        website: '#'
      }
    },
    {
      id: 4,
      name: 'Dr. Raj Patel',
      title: 'Senior Research Scientist',
      company: 'Google DeepMind',
      image: '/api/placeholder/300/400',
      location: 'Mumbai, India',
      expertise: ['Deep Learning', 'Natural Language Processing', 'Robotics'],
      bio: 'Dr. Raj Patel is a leading researcher in deep learning and natural language processing at Google DeepMind. His contributions to conversational AI and robotics have shaped the next generation of intelligent systems.',
      achievements: [
        'Core contributor to GPT and BERT models',
        '40+ patents in AI and machine learning',
        'Founding member of AI for Social Good initiative',
        'IEEE Fellow and ACM Distinguished Scientist'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        website: '#'
      }
    },
    {
      id: 5,
      name: 'Prof. Lisa Zhang',
      title: 'Director of Quantum AI Lab',
      company: 'MIT',
      image: '/api/placeholder/300/400',
      location: 'Boston, USA',
      expertise: ['Quantum Computing', 'AI Algorithms', 'Cryptography'],
      bio: 'Professor Lisa Zhang leads groundbreaking research at the intersection of quantum computing and artificial intelligence. Her work is paving the way for the next generation of quantum-powered AI systems.',
      achievements: [
        'Pioneer in quantum machine learning',
        'Developed first quantum neural networks',
        '75+ publications in top-tier journals',
        'Recipient of the Quantum Excellence Award'
      ],
      social: {
        linkedin: '#',
        twitter: '#',
        website: '#'
      }
    }
  ]

  const openSpeakerBio = speaker => {
    setSelectedSpeaker(speaker)
    document.body.style.overflow = 'hidden'
  }

  const closeSpeakerBio = () => {
    setSelectedSpeaker(null)
    document.body.style.overflow = 'unset'
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
          <h2 className='text-4xl md:text-6xl font-bold text-white mb-8 tracking-wider'>
            <span className='text-yellow-400'>SPEAKERS</span> LINE-UP
          </h2>
          <p className='text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8'>
            Be inspired by a diverse line-up of experts sharing breakthrough
            knowledge, real-world applications, and visionary approaches to
            tomorrow's challenges.
          </p>
          <button className='bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg'>
            Check Out Speakers
          </button>
        </div>

        {/* Speaker Slider */}
        <div className='relative mb-16'>
          {/* Navigation arrows */}

          <Swiper
            effect='coverflow'
            loop={false}
            centeredSlides
            spaceBetween={5}
            modules={[Autoplay, EffectCoverflow]}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 }
            }}
            onSwiper={swiper => {
              swiperRef.current = swiper
            }}
            className='w-full py-10'
          >
            {speakers.map(speaker => (
              <SwiperSlide
                key={speaker.id}
                className='flex justify-center items-center'
              >
                <div
                  onClick={() => openSpeakerBio(speaker)}
                  className='cursor-pointer p-6 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors duration-300 shadow-lg w-full max-w-xs'
                >
                  {/* Top section with initials */}
                  <div className='h-48 w-full rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                    <span className='text-white text-7xl font-bold'>
                      {speaker.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </span>
                  </div>
                  {/* Name, title and company */}
                  <div className='mt-4 text-center'>
                    <h3 className='text-xl font-semibold text-white'>
                      {speaker.name}
                    </h3>
                    <p className='text-sm text-blue-300'>{speaker.title}</p>
                    <p className='text-sm text-gray-400'>{speaker.company}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Speaker Bio Modal */}
      {selectedSpeaker && (
        <div className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative'>
            {/* Close Button */}
            <button
              onClick={closeSpeakerBio}
              className='absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200'
            >
              <X className='w-6 h-6 text-gray-600' />
            </button>

            <div className='grid md:grid-cols-2 gap-8 p-8'>
              {/* Speaker Image */}
              <div className='space-y-6'>
                <div className='aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                  <div className='text-white text-8xl font-bold'>
                    {selectedSpeaker.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3 text-gray-600'>
                    <MapPin className='w-5 h-5 text-blue-600' />
                    <span>{selectedSpeaker.location}</span>
                  </div>
                  <div className='flex items-center space-x-3 text-gray-600'>
                    <Award className='w-5 h-5 text-yellow-600' />
                    <span>{selectedSpeaker.company}</span>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div>
                  <h4 className='font-bold text-gray-800 mb-3'>Expertise</h4>
                  <div className='flex flex-wrap gap-2'>
                    {selectedSpeaker.expertise.map((skill, index) => (
                      <span
                        key={index}
                        className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Speaker Details */}
              <div className='space-y-6'>
                <div>
                  <h2 className='text-3xl font-bold text-gray-800 mb-2'>
                    {selectedSpeaker.name}
                  </h2>
                  <p className='text-xl text-blue-600 font-semibold mb-1'>
                    {selectedSpeaker.title}
                  </p>
                  <p className='text-gray-600'>{selectedSpeaker.company}</p>
                </div>

                {/* Bio */}
                <div>
                  <h3 className='text-xl font-bold text-gray-800 mb-3'>
                    Biography
                  </h3>
                  <p className='text-gray-700 leading-relaxed'>
                    {selectedSpeaker.bio}
                  </p>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className='text-xl font-bold text-gray-800 mb-3'>
                    Key Achievements
                  </h3>
                  <ul className='space-y-2'>
                    {selectedSpeaker.achievements.map((achievement, index) => (
                      <li key={index} className='flex items-start space-x-2'>
                        <Award className='w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0' />
                        <span className='text-gray-700'>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Links */}
                <div className='flex space-x-4 pt-4'>
                  {Object.entries(selectedSpeaker.social).map(
                    ([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        className='bg-gray-100 hover:bg-gray-200 rounded-full p-3 transition-colors duration-200'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='w-5 h-5 text-gray-600' />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

export default SpeakersLineup
