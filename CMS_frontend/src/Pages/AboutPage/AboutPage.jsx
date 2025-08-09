import { useState } from "react"
import EGEConferenceIntroduction from "../../Component/EGEConferenceIntroduction/EGEConferenceIntroduction"
import EGEIntroduction from "../../Component/EGEIntroduction/EGEIntroduction"
import { Building, Calendar } from "lucide-react"

// Main About Page Component
const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('introduction')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden py-16 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wider text-white">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Discover Elite Global Excellence and our commitment to fostering international research collaboration
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 inline-flex">
            <button
              onClick={() => setActiveTab('introduction')}
              className={`flex items-center px-6 py-4 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'introduction'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Building className="w-5 h-5 mr-2" />
              EGE Introduction
            </button>
            <button
              onClick={() => setActiveTab('conference')}
              className={`flex items-center px-6 py-4 rounded-full font-bold transition-all duration-300 ${
                activeTab === 'conference'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Calendar className="w-5 h-5 mr-2" />
              EGE Conference Introduction
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500">
          {activeTab === 'introduction' && <EGEIntroduction />}
          {activeTab === 'conference' && <EGEConferenceIntroduction />}
        </div>
      </div>
    </div>
  )
}

export default AboutPage