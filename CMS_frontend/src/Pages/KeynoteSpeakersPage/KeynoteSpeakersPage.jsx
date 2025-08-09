import React, { useState } from 'react'
import {
  Star,
  Award,
  BookOpen,
  Users,
  Globe,
  Calendar,
  Clock,
  MapPin,
  Mail,
  ExternalLink,
  X,
  ChevronRight,
  Mic,
  GraduationCap,
  Building
} from 'lucide-react'

const KeynoteSpeakersPage = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const speakers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Director of AI Research',
      company: 'Massachusetts Institute of Technology',
      country: 'United States',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c35d20a1?w=400&h=400&fit=crop&crop=face',
      keynoteTitle: 'The Future of Artificial Intelligence in Engineering',
      date: 'March 15, 2025',
      time: '09:00 AM',
      venue: 'Main Auditorium',
      shortBio: 'Leading AI researcher with 20+ years of experience in machine learning and neural networks.',
      fullBio: 'Dr. Sarah Johnson is a renowned researcher and Director of AI Research at MIT. With over 20 years of experience in artificial intelligence, machine learning, and neural networks, she has published more than 150 peer-reviewed papers and holds 25 patents. Her groundbreaking work in deep learning architectures has revolutionized computer vision and natural language processing. She has led multiple multi-million dollar research projects funded by NSF, DARPA, and major tech companies.',
      achievements: [
        'IEEE Fellow since 2018',
        '150+ peer-reviewed publications',
        'H-index: 65',
        'Best Paper Award at ICML 2023',
        'MIT Excellence in Teaching Award',
        '25 patents in AI technologies'
      ],
      expertise: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing', 'Robotics'],
      education: [
        'Ph.D. in Computer Science, Stanford University',
        'M.S. in Artificial Intelligence, Carnegie Mellon University',
        'B.S. in Computer Engineering, UC Berkeley'
      ],
      contact: {
        email: 's.johnson@mit.edu',
        website: 'https://mit.edu/~sjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnsonai'
      },
      recentWork: 'Currently leading a $10M NSF project on ethical AI development and deployment in critical infrastructure systems.'
    },
    {
      id: 2,
      name: 'Prof. Ahmed Hassan',
      title: 'Professor of Sustainable Engineering',
      company: 'University of Oxford',
      country: 'United Kingdom',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      keynoteTitle: 'Sustainable Engineering Solutions for Climate Change',
      date: 'March 15, 2025',
      time: '02:00 PM',
      venue: 'Main Auditorium',
      shortBio: 'World-renowned expert in sustainable engineering and environmental technology solutions.',
      fullBio: 'Professor Ahmed Hassan is a leading authority on sustainable engineering and climate change mitigation strategies. As a Professor at the University of Oxford, he has dedicated his career to developing innovative engineering solutions for environmental challenges. His research spans renewable energy systems, carbon capture technologies, and sustainable infrastructure development. He has advised governments and international organizations on climate policy and has been instrumental in developing the UK\'s net-zero strategy.',
      achievements: [
        'Royal Society Fellow',
        '200+ research publications',
        'Climate Innovation Award 2024',
        'UN Climate Advisory Board Member',
        'Oxford Teaching Excellence Award',
        'Commander of the British Empire (CBE)'
      ],
      expertise: ['Sustainable Engineering', 'Climate Technology', 'Renewable Energy', 'Carbon Capture', 'Green Infrastructure'],
      education: [
        'Ph.D. in Environmental Engineering, Imperial College London',
        'M.Eng. in Chemical Engineering, Cambridge University',
        'B.Eng. in Civil Engineering, Cairo University'
      ],
      contact: {
        email: 'a.hassan@oxford.ac.uk',
        website: 'https://oxford.ac.uk/~hassan',
        linkedin: 'https://linkedin.com/in/ahmedhassan-oxford'
      },
      recentWork: 'Leading the Oxford Climate Engineering Initiative, a £50M program developing next-generation carbon capture and storage technologies.'
    },
    {
      id: 3,
      name: 'Dr. Lisa Chen',
      title: 'VP of Innovation',
      company: 'Google DeepMind',
      country: 'United States',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      keynoteTitle: 'AI-Powered Innovation in Industry 4.0',
      date: 'March 16, 2025',
      time: '09:00 AM',
      venue: 'Main Auditorium',
      shortBio: 'Innovation leader driving AI transformation across industries with focus on practical applications.',
      fullBio: 'Dr. Lisa Chen serves as Vice President of Innovation at Google DeepMind, where she leads strategic initiatives in applying artificial intelligence to real-world industrial challenges. With a background spanning both academia and industry, she has been instrumental in translating cutting-edge AI research into practical solutions that drive Industry 4.0 transformation. Her work has influenced AI deployment strategies across manufacturing, healthcare, and autonomous systems.',
      achievements: [
        'Google Distinguished Engineer',
        'Forbes 40 Under 40 in Technology',
        'ACM Grace Hopper Award',
        '80+ patents in AI applications',
        'MIT Technology Review Innovator',
        'World Economic Forum Young Global Leader'
      ],
      expertise: ['Applied AI', 'Industry 4.0', 'Computer Vision', 'Autonomous Systems', 'Machine Learning'],
      education: [
        'Ph.D. in Computer Science, MIT',
        'M.S. in Robotics, Carnegie Mellon University',
        'B.S. in Electrical Engineering, UC Berkeley'
      ],
      contact: {
        email: 'l.chen@google.com',
        website: 'https://research.google/people/LisaChen',
        linkedin: 'https://linkedin.com/in/lisachen-ai'
      },
      recentWork: 'Spearheading Google\'s AI for Manufacturing initiative, deploying machine learning solutions across global supply chains.'
    },
    {
      id: 4,
      name: 'Prof. Maria Rodriguez',
      title: 'Chair of Biomedical Engineering',
      company: 'ETH Zurich',
      country: 'Switzerland',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      keynoteTitle: 'Digital Health Revolution: AI in Healthcare',
      date: 'March 16, 2025',
      time: '02:00 PM',
      venue: 'Main Auditorium',
      shortBio: 'Pioneer in biomedical engineering and digital health technologies transforming patient care.',
      fullBio: 'Professor Maria Rodriguez is the Chair of Biomedical Engineering at ETH Zurich and a pioneer in digital health technologies. Her interdisciplinary research combines engineering principles with medical science to develop innovative healthcare solutions. She has led breakthrough research in medical imaging, wearable health devices, and AI-powered diagnostic systems. Her work has directly contributed to improving patient outcomes and making healthcare more accessible globally.',
      achievements: [
        'Swiss National Science Fellow',
        'European Research Council Advanced Grant',
        '120+ peer-reviewed publications',
        'Healthcare Innovation Award 2023',
        'IEEE Engineering in Medicine Award',
        'Founder of 3 successful healthtech startups'
      ],
      expertise: ['Biomedical Engineering', 'Digital Health', 'Medical Imaging', 'Wearable Technology', 'AI in Healthcare'],
      education: [
        'Ph.D. in Biomedical Engineering, Johns Hopkins University',
        'M.S. in Electrical Engineering, Stanford University',
        'B.S. in Bioengineering, Universidad Politécnica de Madrid'
      ],
      contact: {
        email: 'm.rodriguez@ethz.ch',
        website: 'https://ethz.ch/~mrodriguez',
        linkedin: 'https://linkedin.com/in/maria-rodriguez-ethz'
      },
      recentWork: 'Directing the Digital Health Innovation Lab at ETH Zurich, developing AI-powered diagnostic tools for early disease detection.'
    },
    {
      id: 5,
      name: 'Dr. Raj Patel',
      title: 'Chief Technology Officer',
      company: 'Tesla',
      country: 'United States',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
      keynoteTitle: 'Autonomous Systems and the Future of Transportation',
      date: 'March 17, 2025',
      time: '09:00 AM',
      venue: 'Main Auditorium',
      shortBio: 'Technology leader driving autonomous vehicle innovation and sustainable transportation solutions.',
      fullBio: 'Dr. Raj Patel serves as Chief Technology Officer at Tesla, where he oversees the development of autonomous driving technologies and sustainable transportation systems. With extensive experience in both automotive engineering and artificial intelligence, he has been instrumental in advancing Tesla\'s Full Self-Driving capabilities. His work spans computer vision, sensor fusion, and real-time decision-making systems that enable safe autonomous operation.',
      achievements: [
        'Tesla Exceptional Achievement Award',
        'Automotive News 40 Under 40',
        '45 patents in autonomous systems',
        'SAE International Outstanding Engineer',
        'IIT Delhi Distinguished Alumnus',
        'NHTSA Safety Innovation Recognition'
      ],
      expertise: ['Autonomous Systems', 'Computer Vision', 'Sensor Fusion', 'Automotive Engineering', 'Machine Learning'],
      education: [
        'Ph.D. in Electrical Engineering, MIT',
        'M.Tech. in Computer Science, IIT Delhi',
        'B.Tech. in Electronics Engineering, IIT Bombay'
      ],
      contact: {
        email: 'r.patel@tesla.com',
        website: 'https://tesla.com/raj-patel',
        linkedin: 'https://linkedin.com/in/rajpatel-tesla'
      },
      recentWork: 'Leading Tesla\'s next-generation Autopilot development, focusing on full autonomy and neural network optimization.'
    },
    {
      id: 6,
      name: 'Prof. Yuki Tanaka',
      title: 'Director of Smart Cities Research',
      company: 'University of Tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face',
      keynoteTitle: 'Smart Cities: IoT and Urban Innovation',
      date: 'March 17, 2025',
      time: '02:00 PM',
      venue: 'Main Auditorium',
      shortBio: 'Leading researcher in IoT technologies and smart city development with focus on urban sustainability.',
      fullBio: 'Professor Yuki Tanaka is the Director of Smart Cities Research at the University of Tokyo and a leading authority on Internet of Things (IoT) technologies and urban innovation. His research focuses on developing intelligent urban infrastructure that enhances quality of life while promoting sustainability. He has collaborated with major Japanese cities to implement smart city solutions and has advised the Japanese government on digital transformation initiatives.',
      achievements: [
        'Japan Science Medal recipient',
        'IoT Innovation Award 2023',
        '110+ research publications',
        'Smart City Pioneer Recognition',
        'University of Tokyo Excellence Prize',
        'IEEE IoT Outstanding Contribution Award'
      ],
      expertise: ['Internet of Things', 'Smart Cities', 'Urban Computing', 'Sensor Networks', 'Sustainable Technology'],
      education: [
        'Ph.D. in Information Science, University of Tokyo',
        'M.Eng. in Computer Science, Kyoto University',
        'B.Eng. in Electrical Engineering, Tokyo Institute of Technology'
      ],
      contact: {
        email: 'y.tanaka@u-tokyo.ac.jp',
        website: 'https://u-tokyo.ac.jp/~tanaka',
        linkedin: 'https://linkedin.com/in/yuki-tanaka-tokyo'
      },
      recentWork: 'Leading the Tokyo 2030 Smart City Initiative, developing integrated IoT solutions for urban challenges including traffic, energy, and waste management.'
    }
  ]

  const openModal = (speaker) => {
    setSelectedSpeaker(speaker)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedSpeaker(null)
    setIsModalOpen(false)
    document.body.style.overflow = 'unset'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative z-10 py-16 px-4">
        {/* Header */}
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wider text-yellow-500">
              Keynote Speakers
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Join us for inspiring presentations from world-renowned experts who are shaping the future of engineering, 
              technology, and innovation across diverse disciplines.
            </p>
          </div>

          {/* Speakers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker) => (
              <div
                key={speaker.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              >
                {/* Speaker Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Country Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Globe className="w-3 h-3 text-white" />
                    <span className="text-xs text-white font-medium">{speaker.country}</span>
                  </div>

                  {/* View Bio Button */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <button
                      onClick={() => openModal(speaker)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <span>View Bio</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Speaker Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">{speaker.name}</h3>
                    <p className="text-yellow-400 font-semibold text-sm mb-1">{speaker.title}</p>
                    <p className="text-white/70 text-sm flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      {speaker.company}
                    </p>
                  </div>

                  {/* Keynote Title */}
                  <div className="mb-4 p-3 bg-white/5 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Mic className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                      <p className="text-white font-medium text-sm leading-relaxed">
                        {speaker.keynoteTitle}
                      </p>
                    </div>
                  </div>

                  {/* Schedule Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <Calendar className="w-4 h-4 text-yellow-400" />
                      <span>{formatDate(speaker.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span>{speaker.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <MapPin className="w-4 h-4 text-yellow-400" />
                      <span>{speaker.venue}</span>
                    </div>
                  </div>

                  {/* Short Bio */}
                  <p className="text-white/70 text-sm leading-relaxed">
                    {speaker.shortBio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            {/* Modal Header */}
            <div className="relative">
              <div className="aspect-[3/1] overflow-hidden rounded-t-2xl">
                <img
                  src={selectedSpeaker.image}
                  alt={selectedSpeaker.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              </div>
              
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-colors duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Speaker Header Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{selectedSpeaker.name}</h2>
                <p className="text-yellow-400 font-semibold text-lg mb-1">{selectedSpeaker.title}</p>
                <p className="text-white/80 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  {selectedSpeaker.company}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Keynote Session Info */}
              <div className="bg-white/5 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Mic className="w-5 h-5 mr-2 text-yellow-400" />
                  Keynote Session
                </h3>
                <h4 className="text-lg font-semibold text-yellow-400 mb-4">{selectedSpeaker.keynoteTitle}</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 text-white/70">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{formatDate(selectedSpeaker.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{selectedSpeaker.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70">
                    <MapPin className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{selectedSpeaker.venue}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Biography */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-yellow-400" />
                      Biography
                    </h3>
                    <p className="text-white/80 leading-relaxed">{selectedSpeaker.fullBio}</p>
                  </div>

                  {/* Recent Work */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-yellow-400" />
                      Current Research
                    </h3>
                    <p className="text-white/80 leading-relaxed">{selectedSpeaker.recentWork}</p>
                  </div>

                  {/* Contact */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-yellow-400" />
                      Contact
                    </h3>
                    <div className="space-y-2">
                      <a
                        href={`mailto:${selectedSpeaker.contact.email}`}
                        className="flex items-center space-x-2 text-white/70 hover:text-yellow-400 transition-colors duration-300"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{selectedSpeaker.contact.email}</span>
                      </a>
                      <a
                        href={selectedSpeaker.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white/70 hover:text-yellow-400 transition-colors duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Personal Website</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Education */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2 text-yellow-400" />
                      Education
                    </h3>
                    <ul className="space-y-2">
                      {selectedSpeaker.education.map((degree, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{degree}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpeaker.expertise.map((area, index) => (
                        <span
                          key={index}
                          className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium border border-yellow-500/30"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-yellow-400" />
                      Key Achievements
                    </h3>
                    <ul className="space-y-2">
                      {selectedSpeaker.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KeynoteSpeakersPage