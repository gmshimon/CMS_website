import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

const VideoTestimonials = () => {
  const [isPlaying, setIsPlaying] = useState({})
  const [isMuted, setIsMuted] = useState({})
  const [durations, setDurations] = useState({})
  const videoRefs = useRef({})

  const testimonials = [
    {
      id: 1,
      title: 'Welcome Message from Conference Chair',
      thumbnail:
        'https://images.unsplash.com/photo-1494790108755-2616c79e2bf1?w=400&h=300&fit=crop&crop=face',
      videoUrl:
        'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/video/Background+Video.mp4'
    },
    {
      id: 2,
      title: 'AI Research Insights', 
      thumbnail:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face',
      videoUrl:
        'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/video/Background+Video.mp4'
    },
    {
      id: 3,
      title: 'Industry Innovation Spotlight',
      thumbnail:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face',
      videoUrl:
        'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/video/Background+Video.mp4'
    },
    {
      id: 4,
      title: 'Global Collaboration Vision',
      thumbnail:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face',
      videoUrl:
        'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/video/Background+Video.mp4'
    },
    {
      id: 5,
      title: 'Future of Technology',
      thumbnail:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop&crop=face',
      videoUrl:
        'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/video/Background+Video.mp4'
    }
  ]

  const togglePlay = id => {
    const videoEl = videoRefs.current[id]
    if (!videoEl) return

    if (videoEl.paused) {
      videoEl.play()
      setIsPlaying(prev => ({ ...prev, [id]: true }))
    } else {
      videoEl.pause()
      setIsPlaying(prev => ({ ...prev, [id]: false }))
    }
  }

  const toggleMute = id => {
    const videoEl = videoRefs.current[id]
    if (!videoEl) return
    const newMuted = !videoEl.muted
    videoEl.muted = newMuted
    setIsMuted(prev => ({ ...prev, [id]: newMuted }))
  }

  const handleLoadedMetadata = (id, e) => {
    const seconds = e.target.duration
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0')
    setDurations(prev => ({ ...prev, [id]: `${minutes}:${secs}` }))
  }

  return (
    <div className='bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-16 px-4 relative'>
      <div className='container mx-auto max-w-7xl'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-bold text-white'>
            <span className='text-yellow-400'>Experience Shared:</span> Insights
            from Around the World
          </h1>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev'
          }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 }, // 2 cards on tablets/desktops
            0: { slidesPerView: 1 } // 1 card on mobile
          }}
          className='max-w-6xl'
          onSlideChange={() => {
            // Stop all videos when slide changes
            Object.keys(videoRefs.current).forEach(id => {
              const videoEl = videoRefs.current[id]
              if (videoEl) {
                videoEl.pause()
                videoEl.currentTime = 0 // reset to start
              }
            })
            setIsPlaying({}) // reset play state
          }}
        >
          {testimonials.map(video => (
            <SwiperSlide key={video.id}>
              <div className='bg-gray-800 rounded-2xl overflow-hidden shadow-md'>
                <div className='relative aspect-video bg-black'>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                      isPlaying[video.id] ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <video
                    ref={el => (videoRefs.current[video.id] = el)}
                    src={video.videoUrl}
                    poster={!isPlaying[video.id] ? video.thumbnail : undefined} // only show poster if not playing
                    muted={isMuted[video.id] || false}
                    onLoadedMetadata={e => handleLoadedMetadata(video.id, e)}
                    className='w-full h-full object-cover'
                  />

                  {/* Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30' />

                  {/* Play/Pause Button */}
                  <button
                    onClick={() => togglePlay(video.id)}
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 p-4 rounded-full'
                  >
                    {isPlaying[video.id] ? (
                      <Pause className='w-8 h-8' />
                    ) : (
                      <Play className='w-8 h-8 ml-1' />
                    )}
                  </button>

                  {/* Controls */}
                  <div className='absolute bottom-4 left-4 right-4 flex items-center justify-between'>
                    <div className='text-white text-sm bg-black/50 px-3 py-1 rounded-full'>
                      {durations[video.id] || '--:--'}
                    </div>
                    <button
                      onClick={() => toggleMute(video.id)}
                      className='bg-black/50 text-white p-2 rounded-full'
                    >
                      {isMuted[video.id] ? (
                        <VolumeX className='w-4 h-4' />
                      ) : (
                        <Volume2 className='w-4 h-4' />
                      )}
                    </button>
                  </div>

                  {/* Title */}
                  <div className='absolute top-4 left-4 right-4'>
                    <h3 className='text-white text-lg font-bold'>
                      {video.title}
                    </h3>
                  </div>
                </div>

                {/* Speaker Info */}
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* External Navigation Buttons */}
        <button className='swiper-prev absolute left-40 top-2/3 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/40'>
          ❮
        </button>
        <button className='swiper-next absolute right-40 top-2/3 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/40'>
          ❯
        </button>
      </div>
    </div>
  )
}

export default VideoTestimonials
