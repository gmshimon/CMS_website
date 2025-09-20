import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Globe, 
  Send, 
  MessageSquare, 
  Users, 
  Calendar,
  Building2,
  User,
  FileText,
  Headphones
} from 'lucide-react'
import { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert('Message sent successfully!')
    setFormData({ name: '', email: '', subject: '', category: '', message: '' })
  }

  const contactInfo = [
    {
      icon: <Mail className='w-8 h-8' />,
      title: 'Email Address',
      details: ['info@eliteglobalexcellence.com', 'assistance@eliteglobalexcellence.com'],
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: <Phone className='w-8 h-8' />,
      title: 'Phone Numbers',
      details: ['+601111306130'],
      color: 'from-green-500 to-green-700'
    },
    {
      icon: <MapPin className='w-8 h-8' />,
      title: 'Conference Venue',
      details: ['Taman Universiti', 'Johor Bahru Malaysia'],
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: <Clock className='w-8 h-8' />,
      title: 'Office Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'GMT+8 (Malaysia Time)'],
      color: 'from-orange-500 to-orange-700'
    }
  ]

  // eslint-disable-next-line no-unused-vars
  const departments = [
    {
      title: 'General Inquiries',
      email: 'info@egeimrc2025.org',
      description: 'General questions about the conference',
      icon: <MessageSquare className='w-6 h-6' />
    },
    {
      title: 'Paper Submission',
      email: 'papers@egeimrc2025.org', 
      description: 'Questions about paper submission and review process',
      icon: <FileText className='w-6 h-6' />
    },
    {
      title: 'Registration Support',
      email: 'registration@egeimrc2025.org',
      description: 'Help with registration and payment issues',
      icon: <Users className='w-6 h-6' />
    },
    {
      title: 'Technical Support',
      email: 'tech@egeimrc2025.org',
      description: 'Website and technical assistance',
      icon: <Headphones className='w-6 h-6' />
    }
  ]

  const categories = [
    'General Inquiry',
    'Paper Submission', 
    'Registration',
    'Payment Issues',
    'Technical Support',
    'Venue Information',
    'Accommodation',
    'Other'
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'>
      <div className='container mx-auto px-6 py-12'>
        
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='text-yellow-500'>Contact</span>
            <span className='text-white'> Us</span>
          </h1>
          <p className='text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed'>
            Get in touch with the EGEIMRC2025 organizing committee. We're here to help with all your questions and concerns.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          {contactInfo.map((info, index) => (
            <div key={index} className='bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-all duration-300'>
              <div className={`bg-gradient-to-r ${info.color} p-6 text-center`}>
                <div className='text-white mb-3 flex justify-center'>
                  {info.icon}
                </div>
                <h3 className='text-white font-bold text-lg'>{info.title}</h3>
              </div>
              <div className='p-6'>
                {info.details.map((detail, idx) => (
                  <p key={idx} className='text-gray-700 text-center mb-1 font-semibold'>
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-1 gap-8 mb-16'>
          
          {/* Contact Form */}
          <div className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl'>
            <div className='bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl mb-8'>
              <h2 className='text-2xl font-bold text-white flex items-center'>
                <Send className='w-8 h-8 mr-3' />
                Send us a Message
              </h2>
              <p className='text-yellow-100 mt-2'>
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-gray-700 font-bold mb-2'>
                    <User className='w-4 h-4 inline mr-2' />
                    Full Name *
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                    placeholder='Enter your full name'
                  />
                </div>
                <div>
                  <label className='block text-gray-700 font-bold mb-2'>
                    <Mail className='w-4 h-4 inline mr-2' />
                    Email Address *
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                    placeholder='Enter your email'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-gray-700 font-bold mb-2'>
                    <MessageSquare className='w-4 h-4 inline mr-2' />
                    Subject *
                  </label>
                  <input
                    type='text'
                    name='subject'
                    value={formData.subject}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                    placeholder='Message subject'
                  />
                </div>
                <div>
                  <label className='block text-gray-700 font-bold mb-2'>
                    <Building2 className='w-4 h-4 inline mr-2' />
                    Category
                  </label>
                  <select
                    name='category'
                    value={formData.category}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  >
                    <option value=''>Select a category</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-gray-700 font-bold mb-2'>
                  <FileText className='w-4 h-4 inline mr-2' />
                  Message *
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none'
                  placeholder='Type your message here...'
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
                } text-white shadow-lg`}
              >
                {isSubmitting ? (
                  <div className='flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3'></div>
                    Sending...
                  </div>
                ) : (
                  <div className='flex items-center justify-center'>
                    <Send className='w-6 h-6 mr-3' />
                    Send Message
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Department Contacts */}
          {/* <div className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl'>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl mb-8'>
              <h2 className='text-2xl font-bold text-white flex items-center'>
                <Users className='w-8 h-8 mr-3' />
                Department Contacts
              </h2>
              <p className='text-blue-100 mt-2'>
                Contact specific departments for faster assistance
              </p>
            </div>

            <div className='space-y-4'>
              {departments.map((dept, index) => (
                <div key={index} className='border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-300 hover:shadow-lg'>
                  <div className='flex items-start'>
                    <div className='bg-blue-100 p-3 rounded-xl mr-4'>
                      <div className='text-blue-600'>
                        {dept.icon}
                      </div>
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-bold text-gray-800 mb-2'>{dept.title}</h3>
                      <p className='text-gray-600 mb-3'>{dept.description}</p>
                      <a 
                        href={`mailto:${dept.email}`}
                        className='text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors'
                      >
                        <Mail className='w-4 h-4 mr-2' />
                        {dept.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

        
            <div className='mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl'>
              <h4 className='text-lg font-bold text-gray-800 mb-3 flex items-center'>
                <Clock className='w-5 h-5 mr-2 text-yellow-600' />
                Response Time
              </h4>
              <ul className='text-gray-700 space-y-2'>
                <li>• General inquiries: Within 24 hours</li>
                <li>• Technical support: Within 12 hours</li>
                <li>• Urgent matters: Within 6 hours</li>
              </ul>
            </div>
          </div> */}
        </div>

        {/* Conference Information */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
            <div>
              <div className='bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-2xl mb-4 inline-block'>
                <Calendar className='w-12 h-12 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Conference Dates</h3>
              <p className='text-gray-600'>April 3 – 5, 2026</p>
            </div>
            <div>
              <div className='bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-2xl mb-4 inline-block'>
                <MapPin className='w-12 h-12 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Location</h3>
              <p className='text-gray-600'>Taman Universiti, Johor Bahru Malaysia</p>
            </div>
            <div>
              <div className='bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-2xl mb-4 inline-block'>
                <Globe className='w-12 h-12 text-white' />
              </div>
              <h3 className='text-xl font-bold text-gray-800 mb-2'>Website</h3>
              <p className='text-gray-600'>www.egeimrc2025.org</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ContactPage