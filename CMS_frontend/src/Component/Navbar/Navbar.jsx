import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Call for Papers', path: '/call-for-papers' },
    { label: 'Submissions', path: '/submissions' },
    { label: 'Registration', path: '/registration-details' },
    { label: 'Keynote Speakers', path: '/keynote-speakers' },
    { label: 'Publications', path: '/publications' },
    { label: 'Committee', path: '/committee' },
    { label: 'Event Schedule', path: '/past-events' }, // later it will be past events
    { label: 'Contact', path: '/contact' }
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-lg mb-10">
      <div className="container mx-auto px-4">
        <div className="flex w-full items-center justify-between h-12 md:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 mr-4">
            <div>
              <img
                src="/assets/EGE_logo.png"
                alt="Conference Logo"
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden w-full md:flex">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                    isActive
                      ? 'text-green-600 bg-green-100'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                      isActive
                        ? 'text-green-600 bg-green-100'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar