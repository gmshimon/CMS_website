import  { useState } from 'react'
import { ChevronDown, ChevronRight, BookOpen, Users, Award, Target } from 'lucide-react'

const ConferenceTracks = () => {
  const [expandedTrack, setExpandedTrack] = useState(null)

  const tracks = [
    {
      id: 1,
      title: "Computer Science & Information Technology",
      icon: BookOpen,
      subtopics: [
        "Artificial Intelligence & Machine Learning",
        "Natural Language Processing",
        "Computer Vision & Image Processing",
        "Data Science & Big Data Analytics",
        "Cybersecurity & Blockchain",
        "Internet of Things (IoT) & AIoT",
        "Human-Computer Interaction",
        "Cloud & Edge Computing",
        "Software Engineering",
        "Quantum Computing"
      ]
    },
    {
      id: 2,
      title: "Business, Management & Finance",
      icon: Target,
      subtopics: [
        "Digital Transformation & AI in Business",
        "Financial Technology & Fintech Innovation",
        "Supply Chain Management & Optimization",
        "Strategic Management & Leadership",
        "Marketing Analytics & Consumer Behavior",
        "Entrepreneurship & Innovation Management",
        "Risk Management & Financial Modeling",
        "E-commerce & Digital Marketing",
        "Human Resource Management",
        "Sustainable Business Practices"
      ]
    },
    {
      id: 3,
      title: "Civil & Environmental Engineering",
      icon: Award,
      subtopics: [
        "Smart Cities & Urban Planning",
        "Sustainable Infrastructure Development",
        "Environmental Monitoring & Protection",
        "Climate Change & Adaptation Strategies",
        "Water Resources Management",
        "Geotechnical & Structural Engineering",
        "Transportation Systems & Mobility",
        "Green Building & Construction Technology",
        "Disaster Risk Management",
        "Renewable Energy Systems"
      ]
    },
    {
      id: 4,
      title: "Social Sciences & Humanities",
      icon: Users,
      subtopics: [
        "AI Ethics & Society",
        "Digital Humanities & Cultural Studies",
        "Psychology & Behavioral Sciences",
        "Education Technology & Learning Analytics",
        "Communication & Media Studies",
        "Political Science & Governance",
        "Sociology & Social Innovation",
        "Philosophy & Technology",
        "Anthropology & Digital Culture",
        "Linguistics & Language Technology"
      ]
    },
    {
      id: 5,
      title: "Mechanical & Industrial Engineering",
      icon: Target,
      subtopics: [
        "Industry 4.0 & Smart Manufacturing",
        "Robotics & Automation",
        "Advanced Materials & Nanotechnology",
        "Energy Systems & Thermal Engineering",
        "Manufacturing Processes & Quality Control",
        "Mechanical Design & CAD/CAM",
        "Operations Research & Optimization",
        "Supply Chain & Logistics Engineering",
        "Maintenance & Reliability Engineering",
        "Additive Manufacturing & 3D Printing"
      ]
    },
    {
      id: 6,
      title: "Electrical & Electronics Engineering",
      icon: Award,
      subtopics: [
        "Power Systems & Smart Grid Technology",
        "Electronic Circuits & VLSI Design",
        "Signal Processing & Communications",
        "Control Systems & Automation",
        "Renewable Energy & Power Electronics",
        "Embedded Systems & Microcontrollers",
        "Wireless Networks & 5G Technology",
        "Sensors & Instrumentation",
        "Electromagnetic Engineering",
        "Biomedical Electronics"
      ]
    },
    {
      id: 7,
      title: "Health & Biomedical Sciences",
      icon: Users,
      subtopics: [
        "AI in Healthcare & Medical Diagnosis",
        "Biomedical Engineering & Medical Devices",
        "Precision Medicine & Genomics",
        "Health Informatics & Digital Health",
        "Pharmaceutical Sciences & Drug Discovery",
        "Public Health & Epidemiology",
        "Medical Imaging & Radiology",
        "Telemedicine & Remote Healthcare",
        "Biotechnology & Bioengineering",
        "Clinical Research & Evidence-Based Medicine"
      ]
    }
  ]

  const toggleTrack = (trackId) => {
    setExpandedTrack(expandedTrack === trackId ? null : trackId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10'>
        <div
          className='absolute top-0 left-0 w-full h-full'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-wider">
            <span className="text-yellow-400">Conference</span>{" "}
            <span className="text-white">Main Tracks</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-6xl mx-auto leading-relaxed">
            Explore the core pillars of EGEIMRC2025—where AI meets innovation across disciplines. From healthcare to education, 
            law to engineering, discover the cutting-edge themes driving impactful research and real-world solutions.
          </p>
        </div>

        {/* Tracks Accordion */}
        <div className="max-w-7xl mx-auto space-y-2">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              {/* Track Header */}
              <button
                onClick={() => toggleTrack(track.id)}
                className="w-full px-6 md:px-6 py-4 md:py-2 flex items-center justify-between text-left hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-yellow-400/20 p-3 rounded-lg">
                    <track.icon className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-white pr-4">
                    {track.title}
                  </h3>
                </div>
                
                <div className="flex-shrink-0">
                  {expandedTrack === track.id ? (
                    <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 transform transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 transform transition-transform duration-200" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedTrack === track.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8">
                    <div className="grid md:grid-cols-2 gap-4">
                      {track.subtopics.map((subtopic, subIndex) => (
                        <div 
                          key={subIndex}
                          className="flex items-center space-x-3 py-2 hover:bg-blue-50 rounded-lg px-3 transition-colors duration-200 group"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 group-hover:bg-yellow-500 transition-colors duration-200"></div>
                          <span className="text-gray-800 text-sm md:text-base font-medium leading-relaxed">
                            {subtopic}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Track Statistics */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span>{track.subtopics.length} Subtopics</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-yellow-600" />
                          <span>Expert Speakers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-green-600" />
                          <span>Research Papers Welcome</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Submit Your Research?
            </h3>
            <p className="text-white/90 mb-8 leading-relaxed">
              Join researchers from around the world in presenting cutting-edge work across these multidisciplinary tracks. 
              Submit your abstract and be part of the conversation shaping tomorrow's innovations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg">
                Submit Abstract
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200">
                Download Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}

export default ConferenceTracks