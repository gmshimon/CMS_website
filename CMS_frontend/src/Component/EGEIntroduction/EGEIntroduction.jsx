import React, { useState } from 'react'
import { Building, Target, Eye, Users, Award, Globe, MapPin, Calendar, X, ExternalLink, Mail, Linkedin } from 'lucide-react'

// EGE Introduction Component
const EGEIntroduction = () => {
  const [selectedMember, setSelectedMember] = useState(null)

  const communityMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Chief Executive Officer",
      category: "LEADERSHIP",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b830?w=300&h=300&fit=crop&crop=face",
      bio: "Dr. Sarah Johnson brings over 15 years of experience in academic leadership and research management. She holds a Ph.D. in Educational Technology from Stanford University and has published over 50 research papers in international journals. Under her leadership, Elite Global Excellence has grown to become a leading platform for international research collaboration.",
      email: "sarah.johnson@ege.org",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      achievements: [
        "Founded 3 successful research initiatives",
        "Published 50+ research papers",
        "Winner of Global Education Leadership Award 2023",
        "Keynote speaker at 25+ international conferences"
      ]
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      title: "Vice President of Research",
      category: "RESEARCH",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Professor Michael Chen is a distinguished researcher in Artificial Intelligence and Machine Learning with over 20 years of academic experience. He has supervised 45+ Ph.D. students and has been instrumental in establishing international research partnerships across 30+ countries.",
      email: "michael.chen@ege.org",
      linkedin: "https://linkedin.com/in/michaelchen",
      achievements: [
        "Supervised 45+ Ph.D. students",
        "Established partnerships in 30+ countries",
        "AI Research Excellence Award recipient",
        "Editorial board member of 8 international journals"
      ]
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Head of International Relations",
      category: "INTERNATIONAL",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      bio: "Dr. Emily Rodriguez specializes in building global academic networks and fostering international collaborations. She has successfully organized 100+ international conferences and workshops, connecting researchers from diverse cultural and academic backgrounds.",
      email: "emily.rodriguez@ege.org",
      linkedin: "https://linkedin.com/in/emilyrodriguez",
      achievements: [
        "Organized 100+ international conferences",
        "Built networks across 50+ countries",
        "Cultural Ambassador Award 2022",
        "Fluent in 6 languages"
      ]
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      title: "Senior Research Director",
      category: "RESEARCH",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Dr. James Wilson is a renowned expert in sustainable technology and green innovation. His research focuses on environmental sustainability and clean energy solutions. He has led multiple international research projects funded by global organizations.",
      email: "james.wilson@ege.org",
      linkedin: "https://linkedin.com/in/jameswilson",
      achievements: [
        "Led 20+ international research projects",
        "Expert in sustainable technology",
        "Green Innovation Award winner",
        "Published 40+ peer-reviewed papers"
      ]
    },
    {
      id: 5,
      name: "Dr. Lisa Thompson",
      title: "Decision Sciences Manager",
      category: "ANALYTICS",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
      bio: "Dr. Lisa Thompson specializes in decision sciences, data analytics, and strategic planning. She has developed innovative methodologies for research impact assessment and has helped hundreds of researchers optimize their research strategies.",
      email: "lisa.thompson@ege.org",
      linkedin: "https://linkedin.com/in/lisathompson",
      achievements: [
        "Developed innovative research methodologies",
        "Strategic advisor to 500+ researchers",
        "Data Analytics Excellence Award",
        "Expert in decision sciences"
      ]
    }
  ]

  const closeBioModal = () => {
    setSelectedMember(null)
  }

  return (
    <div className="space-y-16">
      {/* About Section */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl p-8 text-center shadow-lg">
              <div className="text-white mb-4">
                <Building className="w-12 h-12 mx-auto mb-2" />
                <div className="text-2xl font-bold">EGE</div>
              </div>
              <div className="text-blue-800 font-bold text-lg">ELITE GLOBAL</div>
              <div className="text-orange-600 font-bold">EXCELLENCE</div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <span className="text-yellow-500">About</span> Elite Global Excellence
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Elite Global Excellence is a pioneering research and innovation Centre based in Johor Bahru, Malaysia with a focus on promoting research and innovations. As a pioneering research and innovation organization, we take pride in providing opportunities that connect individuals and organizations across the world through Research & Academics Collaborations, International Research Conferences and Research Projects, fostering an environment where excellence is not just a goal, but a way of life.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
          <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&crop=center"
              alt="Mission"
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Target className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">Mission</h3>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">
              To empower transformative research and foster global collaborations that catalyze innovation and spark advancements.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
          <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=300&fit=crop&crop=center"
              alt="Vision"
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Eye className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">Vision</h3>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">
              Becoming the nexus of a worldwide network where pioneering ideas flourish into impactful realities, advancing the frontiers of research and innovations.
            </p>
          </div>
        </div>
      </div>

      {/* EGE Community */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-yellow-500">EGE</span> Community
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {communityMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-gradient-to-br from-teal-400 to-blue-600 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
            >
              {/* Member Image */}
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {member.category}
                  </span>
                </div>
              </div>

              {/* Member Info */}
              <div className="p-4 text-center text-white">
                <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                <p className="text-white/80 text-sm mb-4">{member.title}</p>
                
                {/* View Bio Button */}
                <button
                  onClick={() => setSelectedMember(member)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 flex items-center justify-center mx-auto"
                >
                  View Bio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bio Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white text-center relative">
                <button
                  onClick={closeBioModal}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <img 
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20"
                />
                <h3 className="text-2xl font-bold mb-2">{selectedMember.name}</h3>
                <p className="text-white/90 text-lg">{selectedMember.title}</p>
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mt-3">
                  {selectedMember.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Biography</h4>
                  <p className="text-gray-700 leading-relaxed">{selectedMember.bio}</p>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {selectedMember.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h4>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href={`mailto:${selectedMember.email}`}
                      className="flex items-center bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                    <a 
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
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

export default EGEIntroduction