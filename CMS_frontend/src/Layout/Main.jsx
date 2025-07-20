import React, { useState } from 'react';
import { Outlet } from 'react-router';

const Main = () => {
      // Mobile menu state
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
     const navItems = [
    'Home',
    'About',
    'Call for Papers',
    'Submissions',
    'Registration',
    'Keynote Speakers',
    'Publications',
    'Committee',
    'Archives',
    'Contact'
  ]
    return (
        <div>
               <nav className='relative z-50 bg-white/95 backdrop-blur-sm shadow-lg'>
                      <div className='container mx-auto px-4'>
                        <div className='flex items-center justify-between h-16'>
                          {/* Logo */}
                          <div className='flex items-center space-x-3'>
                            <div className='w-12 h-12 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full flex items-center justify-center'>
                              <span className='text-white font-bold text-sm'>EGE</span>
                            </div>
                            <div className='hidden md:block'>
                              <h1 className='text-xl font-bold text-gray-800'>
                                ELITE GLOBAL
                              </h1>
                              <p className='text-sm text-orange-500 font-semibold'>
                                EXCELLENCE
                              </p>
                            </div>
                          </div>
            
                          {/* Desktop Navigation */}
                          <div className='hidden lg:flex space-x-8'>
                            {navItems.map((item, index) => (
                              <button
                                key={item}
                                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                  index === 0
                                    ? 'text-green-600 bg-green-100 rounded-md'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md'
                                }`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
            
                          {/* Mobile Menu Button */}
                          <button
                            className='lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md'
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                          >
                            <svg
                              className='w-6 h-6'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 6h16M4 12h16M4 18h16'
                              />
                            </svg>
                          </button>
                        </div>
            
                        {/* Mobile Menu */}
                        {isMobileMenuOpen && (
                          <div className='lg:hidden py-4 border-t border-gray-200'>
                            <div className='grid grid-cols-2 gap-2'>
                              {navItems.map((item, index) => (
                                <button
                                  key={item}
                                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                                    index === 0
                                      ? 'text-green-600 bg-green-100'
                                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                  }`}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </nav>
            <Outlet/>
        </div>
    );
};

export default Main;