import React, { useState } from 'react'
import {
  Users,
  GraduationCap,
  Settings,
  ClipboardList,
  Mic,
  MapPin,
  Mail,
  Globe,
  Award,
  BookOpen,
  Star
} from 'lucide-react'

const CommitteePage = () => {
  const [activeTab, setActiveTab] = useState('scientific')

  const tabs = [
    { id: 'scientific', label: 'Scientific Committee', icon: BookOpen, color: 'yellow' },
    { id: 'technical', label: 'Technical Committee', icon: Settings, color: 'blue' },
    { id: 'registration', label: 'Registration Committee', icon: ClipboardList, color: 'green' },
    { id: 'moderator', label: 'Session Moderators', icon: Mic, color: 'purple' }
  ]

  const committees = {
    scientific: {
      title: 'Scientific Committee',
      description: 'Distinguished researchers and academicians overseeing the scientific quality and peer review process.',
      members: [
        {
          name: 'Dr. Sarah Johnson',
          title: 'Committee Chair',
          university: 'Massachusetts Institute of Technology',
          country: 'United States',
          expertise: 'Artificial Intelligence & Machine Learning',
          email: 's.johnson@mit.edu',
          website: 'https://mit.edu/~sjohnson',
          image: 'https://images.unsplash.com/photo-1494790108755-2616c35d20a1?w=300&h=300&fit=crop&crop=face',
          achievements: ['IEEE Fellow', '150+ Publications', 'Best Paper Award 2023'],
          bio: 'Leading researcher in AI with over 20 years of experience in machine learning and neural networks.'
        },
        {
          name: 'Prof. Ahmed Hassan',
          title: 'Vice Chair',
          university: 'University of Oxford',
          country: 'United Kingdom',
          expertise: 'Sustainable Engineering & Climate Tech',
          email: 'a.hassan@oxford.ac.uk',
          website: 'https://oxford.ac.uk/~hassan',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
          achievements: ['Royal Society Fellow', '200+ Citations', 'Climate Innovation Award'],
          bio: 'Renowned expert in sustainable engineering solutions and environmental technology.'
        },
        {
          name: 'Dr. Li Chen',
          title: 'Scientific Secretary',
          university: 'Stanford University',
          country: 'United States',
          expertise: 'Computer Vision & Robotics',
          email: 'l.chen@stanford.edu',
          website: 'https://stanford.edu/~lchen',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
          achievements: ['ACM Distinguished Scientist', '80+ Publications', 'Innovation Excellence Award'],
          bio: 'Expert in computer vision and robotic systems with focus on autonomous navigation.'
        },
        {
          name: 'Prof. Maria Rodriguez',
          title: 'Review Coordinator',
          university: 'ETH Zurich',
          country: 'Switzerland',
          expertise: 'Biomedical Engineering & Healthcare IT',
          email: 'm.rodriguez@ethz.ch',
          website: 'https://ethz.ch/~mrodriguez',
          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
          achievements: ['Swiss National Science Fellow', '120+ Publications', 'Healthcare Innovation Award'],
          bio: 'Pioneer in biomedical engineering applications and digital healthcare solutions.'
        },
        {
          name: 'Dr. James Wilson',
          title: 'Quality Assurance',
          university: 'Cambridge University',
          country: 'United Kingdom',
          expertise: 'Data Science & Analytics',
          email: 'j.wilson@cam.ac.uk',
          website: 'https://cam.ac.uk/~jwilson',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
          achievements: ['Data Science Excellence Award', '90+ Publications', 'Industry Partnership Medal'],
          bio: 'Leading expert in big data analytics and statistical modeling for engineering applications.'
        },
        {
          name: 'Prof. Yuki Tanaka',
          title: 'International Liaison',
          university: 'University of Tokyo',
          country: 'Japan',
          expertise: 'IoT & Smart Systems',
          email: 'y.tanaka@u-tokyo.ac.jp',
          website: 'https://u-tokyo.ac.jp/~tanaka',
          image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=300&fit=crop&crop=face',
          achievements: ['IoT Innovation Award', '110+ Publications', 'Japan Science Medal'],
          bio: 'International authority on Internet of Things and smart city technologies.'
        }
      ]
    },
    technical: {
      title: 'Technical Committee',
      description: 'Technical experts ensuring smooth conference operations and technology infrastructure.',
      members: [
        {
          name: 'Dr. Michael Brown',
          title: 'Technical Chair',
          university: 'Georgia Institute of Technology',
          country: 'United States',
          expertise: 'Systems Engineering & Infrastructure',
          email: 'm.brown@gatech.edu',
          website: 'https://gatech.edu/~mbrown',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
          achievements: ['IEEE Senior Member', 'Tech Innovation Award', '15+ Years Experience'],
          bio: 'Systems engineering expert with extensive experience in conference technology management.'
        },
        {
          name: 'Dr. Elena Popov',
          title: 'AV Technology Lead',
          university: 'Technical University of Munich',
          country: 'Germany',
          expertise: 'Multimedia Systems & Broadcasting',
          email: 'e.popov@tum.de',
          website: 'https://tum.de/~epopov',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
          achievements: ['Media Technology Expert', 'Conference AV Specialist', 'Tech Excellence Award'],
          bio: 'Specialist in multimedia systems and live streaming technology for academic conferences.'
        },
        {
          name: 'Dr. Raj Patel',
          title: 'IT Infrastructure',
          university: 'Indian Institute of Technology Delhi',
          country: 'India',
          expertise: 'Network Security & Cloud Computing',
          email: 'r.patel@iitd.ac.in',
          website: 'https://iitd.ac.in/~rpatel',
          image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
          achievements: ['Cloud Security Certification', 'Network Expert', 'IT Excellence Award'],
          bio: 'Expert in secure network infrastructure and cloud-based conference management systems.'
        },
        {
          name: 'Dr. Sophie Laurent',
          title: 'Digital Platform Manager',
          university: 'Sorbonne University',
          country: 'France',
          expertise: 'Web Technologies & User Experience',
          email: 's.laurent@sorbonne.fr',
          website: 'https://sorbonne.fr/~slaurent',
          image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
          achievements: ['UX Design Expert', 'Web Platform Specialist', 'Digital Innovation Award'],
          bio: 'Specialist in creating user-friendly digital platforms for academic conferences.'
        }
      ]
    },
    registration: {
      title: 'Registration Committee',
      description: 'Dedicated team managing participant registration, accommodation, and logistical arrangements.',
      members: [
        {
          name: 'Ms. Jennifer Adams',
          title: 'Registration Chair',
          university: 'Conference Management Services',
          country: 'United States',
          expertise: 'Event Management & Logistics',
          email: 'j.adams@conference-services.com',
          website: 'https://conference-services.com/jadams',
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
          achievements: ['Certified Event Manager', '50+ Conferences', 'Excellence in Service Award'],
          bio: 'Professional event manager with extensive experience in academic conference logistics.'
        },
        {
          name: 'Mr. David Kim',
          title: 'Accommodation Coordinator',
          university: 'Seoul National University',
          country: 'South Korea',
          expertise: 'Hospitality Management & Tourism',
          email: 'd.kim@snu.ac.kr',
          website: 'https://snu.ac.kr/~dkim',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
          achievements: ['Hospitality Excellence', 'Tourism Management Expert', 'Service Quality Award'],
          bio: 'Hospitality management expert specializing in academic conference accommodation services.'
        },
        {
          name: 'Ms. Anna Müller',
          title: 'Visa & Travel Coordinator',
          university: 'University of Vienna',
          country: 'Austria',
          expertise: 'International Relations & Travel Management',
          email: 'a.mueller@univie.ac.at',
          website: 'https://univie.ac.at/~amueller',
          image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=300&fit=crop&crop=face',
          achievements: ['International Mobility Expert', 'Visa Processing Specialist', 'Cultural Exchange Award'],
          bio: 'International relations expert facilitating seamless travel arrangements for global participants.'
        }
      ]
    },
    moderator: {
      title: 'Session Moderators',
      description: 'Experienced professionals moderating technical sessions and panel discussions.',
      members: [
        {
          name: 'Prof. Robert Anderson',
          title: 'Keynote Session Moderator',
          university: 'Harvard University',
          country: 'United States',
          expertise: 'Technology Innovation & Strategy',
          email: 'r.anderson@harvard.edu',
          website: 'https://harvard.edu/~randerson',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
          achievements: ['Innovation Leadership Award', 'Strategic Planning Expert', 'Industry Connector'],
          bio: 'Technology strategy expert with experience moderating high-profile academic and industry sessions.'
        },
        {
          name: 'Dr. Fatima Al-Zahra',
          title: 'AI Track Moderator',
          university: 'King Abdulaziz University',
          country: 'Saudi Arabia',
          expertise: 'Artificial Intelligence & Ethics',
          email: 'f.alzahra@kau.edu.sa',
          website: 'https://kau.edu.sa/~falzahra',
          image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
          achievements: ['AI Ethics Pioneer', 'Women in Tech Award', 'Research Excellence Medal'],
          bio: 'Leading researcher in AI ethics and responsible technology development.'
        },
        {
          name: 'Prof. Carlos Santos',
          title: 'Engineering Track Moderator',
          university: 'University of São Paulo',
          country: 'Brazil',
          expertise: 'Civil & Environmental Engineering',
          email: 'c.santos@usp.br',
          website: 'https://usp.br/~csantos',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
          achievements: ['Engineering Excellence Award', 'Sustainability Pioneer', 'Infrastructure Expert'],
          bio: 'Civil engineering expert with focus on sustainable infrastructure and environmental protection.'
        },
        {
          name: 'Dr. Priya Sharma',
          title: 'Business Track Moderator',
          university: 'Indian Institute of Management',
          country: 'India',
          expertise: 'Digital Business Transformation',
          email: 'p.sharma@iim.ac.in',
          website: 'https://iim.ac.in/~psharma',
          image: 'https://images.unsplash.com/photo-1494790108755-2616c35d20a1?w=300&h=300&fit=crop&crop=face',
          achievements: ['Digital Transformation Expert', 'Business Innovation Award', 'Leadership Excellence'],
          bio: 'Business transformation expert specializing in digital innovation and strategic management.'
        }
      ]
    }
  }

  const getColorClasses = (color) => {
    const colors = {
      yellow: {
        bg: 'bg-yellow-500/20 border-yellow-500/30',
        text: 'text-yellow-400',
        hover: 'hover:bg-yellow-500/30',
        active: 'bg-yellow-500/30 text-yellow-300'
      },
      blue: {
        bg: 'bg-blue-500/20 border-blue-500/30',
        text: 'text-blue-400',
        hover: 'hover:bg-blue-500/30',
        active: 'bg-blue-500/30 text-blue-300'
      },
      green: {
        bg: 'bg-green-500/20 border-green-500/30',
        text: 'text-green-400',
        hover: 'hover:bg-green-500/30',
        active: 'bg-green-500/30 text-green-300'
      },
      purple: {
        bg: 'bg-purple-500/20 border-purple-500/30',
        text: 'text-purple-400',
        hover: 'hover:bg-purple-500/30',
        active: 'bg-purple-500/30 text-purple-300'
      }
    }
    return colors[color] || colors.yellow
  }

  const currentTab = tabs.find(tab => tab.id === activeTab)
  const currentCommittee = committees[activeTab]

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
              Committee Members
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Meet our distinguished committee members who ensure the success and quality of EGEIMRC2025. 
              Our committees comprise renowned experts from leading universities and institutions worldwide.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {tabs.map((tab) => {
                const colors = getColorClasses(tab.color)
                const TabIcon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 md:px-6 py-3 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
                      activeTab === tab.id 
                        ? colors.active 
                        : `bg-white/10 border-white/20 text-white/80 ${colors.hover}`
                    }`}
                  >
                    <TabIcon className="w-5 h-5" />
                    <span className="font-medium text-sm md:text-base">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Committee Header */}
          <div className="mb-12 text-center">
            <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full border backdrop-blur-sm ${getColorClasses(currentTab.color).bg}`}>
              <currentTab.icon className={`w-6 h-6 ${getColorClasses(currentTab.color).text}`} />
              <h2 className="text-2xl font-bold text-white">{currentCommittee.title}</h2>
            </div>
            <p className="text-white/70 mt-4 max-w-2xl mx-auto">{currentCommittee.description}</p>
          </div>

          {/* Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCommittee.members.map((member, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              >
                {/* Member Photo */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-colors duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {member.title.includes('Chair') && (
                    <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                      <Award className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className={`text-sm font-semibold mb-2 ${getColorClasses(currentTab.color).text}`}>
                    {member.title}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-1 text-white/70 mb-2">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-sm">{member.university}</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1 text-white/60 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{member.country}</span>
                  </div>

                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getColorClasses(currentTab.color).bg} ${getColorClasses(currentTab.color).text}`}>
                    {member.expertise}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-white/70 text-sm leading-relaxed mb-4 text-center">
                  {member.bio}
                </p>

                {/* Achievements */}
                <div className="mb-4">
                  <div className="flex flex-wrap justify-center gap-1">
                    {member.achievements.map((achievement, achievementIndex) => (
                      <div
                        key={achievementIndex}
                        className="flex items-center space-x-1 bg-white/5 rounded-full px-2 py-1"
                      >
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs text-white/60">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Links */}
                <div className="flex justify-center space-x-3 pt-4 border-t border-white/10">
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors duration-300 group"
                  >
                    <Mail className="w-4 h-4 text-white/60 group-hover:text-white" />
                  </a>
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors duration-300 group"
                  >
                    <Globe className="w-4 h-4 text-white/60 group-hover:text-white" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Committee Statistics */}
          <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Committee Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {tabs.map((tab) => {
                const colors = getColorClasses(tab.color)
                const TabIcon = tab.icon
                return (
                  <div key={tab.id} className="text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${colors.bg}`}>
                      <TabIcon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {committees[tab.id].members.length}
                    </div>
                    <div className="text-white/60 text-sm">{tab.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommitteePage