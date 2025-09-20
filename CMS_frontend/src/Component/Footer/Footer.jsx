import { NavLink } from 'react-router-dom'
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTelegramPlane,
  FaWhatsapp,
  FaLinkedinIn
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
const Footer = () => {
  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Call for Papers', to: '/call-for-papers' },
    { label: 'Submissions', to: '/submissions' },
    { label: 'Registration', to: '/registration-details' }
  ]

  const conferenceLinks = [
    { label: 'Keynote Speakers', to: '/keynote-speakers' },
    { label: 'Publications', to: '/publications' },
    { label: 'Committee', to: '/committee' },
    { label: 'Past Events', path: '/past-events' },
    { label: 'Contact', to: '/contact' }
  ]

  return (
    <footer className='relative mt-16'>
      {/* Top border in theme */}
      <div className='h-1 w-full bg-[rgb(61,43,137)]' />

      <div className='bg-white/95 backdrop-blur-sm'>
        <div className='container mx-auto px-4 py-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
            {/* Brand */}
            <div>
              <div className='flex items-center space-x-3'>
                <img src='/assets/EGE_logo.png' alt='' />
              </div>
              <p className='mt-4 text-sm text-gray-600 leading-relaxed'>
                Elite Global Excellence (EGE) advances research and
                collaboration worldwide. Join us to share ideas, publish quality
                work, and build lasting connections.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3
                className='text-sm font-semibold tracking-wide uppercase'
                style={{ color: 'rgb(61,43,137)' }}
              >
                Quick Links
              </h3>
              <ul className='mt-4 space-y-2'>
                {quickLinks.map(l => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      className='px-2 py-1 rounded transition'
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? '#EDEAFF' : 'transparent',
                        color: isActive ? 'rgb(61,43,137)' : '#4B4B4B'
                      })}
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conference Links */}
            <div>
              <h3
                className='text-sm font-semibold tracking-wide uppercase'
                style={{ color: 'rgb(61,43,137)' }}
              >
                Conference
              </h3>
              <ul className='mt-4 space-y-2'>
                {conferenceLinks.map(l => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      className='px-2 py-1 rounded transition'
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? '#EDEAFF' : 'transparent',
                        color: isActive ? 'rgb(61,43,137)' : '#4B4B4B'
                      })}
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3
                className='text-sm font-semibold tracking-wide uppercase'
                style={{ color: 'rgb(61,43,137)' }}
              >
                Stay Updated
              </h3>
              <p className='mt-4 text-sm text-gray-600'>
                Get the latest announcements and deadlines straight to your
                inbox.
              </p>
              <form
                onSubmit={e => {
                  e.preventDefault()
                }}
                className='mt-4'
              >
                <div className='flex items-stretch'>
                  <input
                    type='email'
                    required
                    placeholder='you@example.com'
                    className='w-full rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2'
                    style={{
                      borderColor: 'rgb(61,43,137)',
                      focusRingColor: 'rgb(61,43,137)'
                    }}
                  />
                  <button
                    type='submit'
                    className='rounded-r-md px-4 py-2 text-sm font-semibold text-white transition'
                    style={{
                      backgroundColor: 'rgb(61,43,137)'
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              {/* Social Media Icons */}
              <div className='mt-6'>
                <div className='flex flex-wrap gap-4 justify-center lg:justify-start'>
                  {[
                    {
                      name: 'Facebook',
                      color: 'bg-blue-600',
                      icon: <FaFacebookF />,
                      link: 'https://www.facebook.com/Eliteglobalexcellence'
                    },
                    {
                      name: 'Instagram',
                      color: 'bg-gradient-to-tr from-pink-500 to-yellow-400',
                      icon: <FaInstagram />,
                      link: 'https://www.instagram.com/eliteglobalexcellence?igsh=MWZubDNzdnJuYmt4Yw=='
                    },
                    {
                      name: 'Twitter',
                      color: 'bg-black',
                      icon: <FaXTwitter />,
                      link: 'https://twitter.com/'
                    },
                    {
                      name: 'TikTok',
                      color: 'bg-black',
                      icon: <FaTiktok />,
                      link: 'https://www.tiktok.com/@eliteglobalexcellence?_t=ZS-8zjLvUNVZ8D&_r=1'
                    },
                    {
                      name: 'YouTube',
                      color: 'bg-red-600',
                      icon: <FaYoutube />,
                      link: 'https://www.youtube.com/@eliteglobalexcellence'
                    },
                    {
                      name: 'Telegram',
                      color: 'bg-sky-500',
                      icon: <FaTelegramPlane />,
                      link: 'https://t.me/+soo_r8rFs29mMjU9'
                    },
                    {
                      name: 'WhatsApp',
                      color: 'bg-green-500',
                      icon: <FaWhatsapp />,
                      link: 'https://wa.me/+60 11-2116 6164' // ✅ replace with your number
                    },
                    {
                      name: 'LinkedIn',
                      color: 'bg-blue-700',
                      icon: <FaLinkedinIn />,
                      link: 'https://www.linkedin.com/company/elite-global-excellence/'
                    }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`w-12 h-12 ${social.color} text-white text-xl rounded-lg flex items-center justify-center 
                    shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer`}
                      title={social.name}
                    >
                      <span className='text-4xl'>{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='border-t' style={{ borderColor: '#E0E0E0' }}>
          <div className='container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-3'>
            <p className='text-xs text-gray-500'>
              © {new Date().getFullYear()} Elite Global Excellence. All rights
              reserved.
            </p>
            <div className='flex items-center gap-4 text-xs'>
              <NavLink
                to='/privacy'
                className='hover:underline'
                style={{ color: 'rgb(61,43,137)' }}
              >
                Privacy
              </NavLink>
              <NavLink
                to='/terms'
                className='hover:underline'
                style={{ color: 'rgb(61,43,137)' }}
              >
                Terms
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
