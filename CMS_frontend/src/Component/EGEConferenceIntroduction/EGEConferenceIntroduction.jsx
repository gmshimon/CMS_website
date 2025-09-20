import { Users, Award, Globe, Calendar, ExternalLink, Target, Lightbulb, Network, Leaf, Rocket } from 'lucide-react'
import { useState } from 'react'

const EGEConferenceIntroduction = () => {
  const [activeSection, setActiveSection] = useState('theme')

  const conferenceHighlights = [
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting researchers from over 50 countries worldwide',
      stats: '50+ Countries'
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Leading academics, researchers, and industry professionals',
      stats: '1000+ Experts'
    },
    {
      icon: Award,
      title: 'Quality Publications',
      description: 'IEEE Xplore and SCOPUS indexed proceedings',
      stats: '100% Indexed'
    },
    {
      icon: Calendar,
      title: 'Annual Events',
      description: 'Multiple international conferences throughout the year',
      stats: '12+ Events/Year'
    }
  ]

  const navigationItems = [
    {
      id: 'theme',
      title: 'Conference Theme',
      icon: Lightbulb,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'objectives',
      title: 'Objectives',
      icon: Target,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'impact',
      title: 'Global Impact',
      icon: Globe,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'researchers',
      title: 'Opportunities for Researchers',
      icon: Users,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'students',
      title: 'Opportunities for Students',
      icon: Award,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'collaboration',
      title: 'Interdisciplinary Collaboration',
      icon: Network,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'sdgs',
      title: 'Sustainable Development Goals (SDGs)',
      icon: Leaf,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'innovation',
      title: 'Innovation & Emerging Technologies',
      icon: Rocket,
      bgColor: 'bg-orange-500'
    }
  ]

  const sectionContent = {
    theme: {
      title: "AI-Driven Innovation: Bridging Science, Society, and Technology",
      content: `AI-Driven Innovation: Bridging Science, Society, and Technology reflects the core mission of EGEIMRC2025—to explore how Artificial Intelligence is reshaping the boundaries of scientific inquiry, societal advancement, and technological evolution. As AI increasingly permeates every aspect of life, from personalized healthcare and sustainable agriculture to smart governance and digital education, it becomes a unifying force that connects disciplines, empowers communities, and drives global innovation. This theme emphasizes the transformative role of AI not only as a tool for automation or data analysis, but as a catalyst for meaningful, ethical, and inclusive progress. Through multidisciplinary dialogue and collaboration, EGEIMRC2025 invites researchers, professionals, and changemakers to showcase how AI can bridge gaps between research and real-world impact—fostering a smarter, more sustainable, and equitable future.`,
      backgroundImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&crop=center"
    },
    objectives: {
      title: "Conference Objectives",
      content: `Our primary objectives include fostering interdisciplinary research collaboration, advancing AI applications across multiple domains, promoting ethical AI development, and creating platforms for knowledge exchange between academia and industry. We aim to facilitate groundbreaking research discussions, establish new partnerships, and provide networking opportunities for researchers at all career stages.`,
      backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&crop=center"
    },
    impact: {
      title: "Global Impact",
      content: `EGEIMRC2025 creates lasting global impact through research dissemination, policy influence, and technology transfer. Our conferences have contributed to breakthrough innovations in AI applications, influenced international research agendas, and created a worldwide network of collaborating researchers committed to solving global challenges through artificial intelligence.`,
      backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&crop=center"
    },
    researchers: {
      title: "Opportunities for Researchers",
      content: `We offer extensive opportunities for researchers including keynote presentations, panel discussions, research paper presentations, poster sessions, workshop facilitation, and collaborative project initiation. Researchers benefit from peer review processes, publication opportunities in indexed journals, and access to cutting-edge research findings from global experts.`,
      backgroundImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center"
    },
    students: {
      title: "Opportunities for Students",
      content: `Students gain invaluable experience through our undergraduate research conference (EGEIURC), mentorship programs, research presentation opportunities, networking with industry professionals, and access to scholarship programs. We provide dedicated platforms for emerging researchers to showcase their work and connect with potential supervisors and collaborators.`,
      backgroundImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop&crop=center"
    },
    collaboration: {
      title: "Interdisciplinary Collaboration",
      content: `EGEIMRC2025 promotes interdisciplinary collaboration by bringing together experts from computer science, engineering, medicine, social sciences, economics, law, and humanities. We facilitate cross-disciplinary workshops, collaborative research sessions, and joint project development opportunities that leverage AI to address complex global challenges.`,
      backgroundImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop&crop=center"
    },
    sdgs: {
      title: "Sustainable Development Goals (SDGs)",
      content: `Our conference directly contributes to achieving UN Sustainable Development Goals through AI-driven solutions for poverty reduction, quality education, gender equality, sustainable cities, climate action, and partnerships for goals. We showcase research that demonstrates how artificial intelligence can accelerate progress toward global sustainability targets.`,
      backgroundImage: "https://images.unsplash.com/photo-1569163139394-de44cb2b5890?w=800&h=400&fit=crop&crop=center"
    },
    innovation: {
      title: "Innovation & Emerging Technologies",
      content: `We focus on cutting-edge innovations including machine learning advances, quantum computing applications, blockchain integration, IoT systems, robotics, natural language processing, computer vision, and emerging AI paradigms. Our platform showcases breakthrough technologies that are reshaping industries and society.`,
      backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&crop=center"
    }
  }

  const conferenceFeatures = [
    {
      title: 'EGEIMRC - International Multidisciplinary Research Conference',
      description: 'Our flagship conference brings together researchers from diverse disciplines to share innovative research and foster collaboration.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop&crop=center',
      features: ['Multidisciplinary Research', 'Global Participation', 'IEEE Publications', 'Best Paper Awards']
    },
    {
      title: 'EGEIURC - International Undergraduate Research Conference',
      description: 'Dedicated platform for undergraduate students to present their research and connect with the global academic community.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop&crop=center',
      features: ['Student Focus', 'Mentorship Programs', 'Research Guidance', 'Future Leaders']
    },
    {
      title: 'Specialized Domain Conferences',
      description: 'Domain-specific conferences in AI, Healthcare, Sustainability, and other emerging research areas.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop&crop=center',
      features: ['Specialized Topics', 'Expert Panels', 'Industry Insights', 'Innovation Showcase']
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'>
      <div className='space-y-16 p-6 md:p-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='text-yellow-500'>EGE</span>
            <span className='text-white'>IMRC</span>
            <span className='text-yellow-500 block md:inline'> 2025</span>
          </h1>
          <p className='text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed'>
            Elite Global Excellence International Multidisciplinary Research Conference 2025 (EGEIMRC2025)
          </p>
        </div>

        {/* Interactive Section */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl'>
          <div className='flex flex-col lg:flex-row min-h-[600px]'>
            {/* Sidebar Navigation */}
            <div className='lg:w-1/3 bg-white p-6'>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>Conference Topics</h3>
              <div className='space-y-2'>
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left p-4 rounded-lg font-medium transition-all duration-300 flex items-center ${
                      activeSection === item.id
                        ? item.id === 'theme' 
                          ? 'bg-green-500 text-white shadow-lg transform scale-105'
                          : 'bg-orange-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className='w-5 h-5 mr-3 flex-shrink-0' />
                    <span className='text-sm md:text-base'>{item.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className='lg:w-2/3 relative'>
              <div 
                className='absolute inset-0 bg-cover bg-center opacity-30'
                style={{ backgroundImage: `url(${sectionContent[activeSection]?.backgroundImage})` }}
              />
              <div className='relative z-10 bg-gradient-to-r from-gray-800/90 to-gray-900/90 h-full'>
                <div className='p-8 md:p-12 flex flex-col justify-center h-full'>
                  <h2 className='text-3xl md:text-4xl font-bold text-yellow-400 mb-6'>
                    {sectionContent[activeSection]?.title}
                  </h2>
                  <p className='text-white/90 text-lg leading-relaxed'>
                    {sectionContent[activeSection]?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conference Highlights */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {conferenceHighlights.map((highlight, index) => (
            <div
              key={index}
              className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 transform hover:scale-105'
            >
              <div className='bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-4 w-fit mx-auto mb-4'>
                <highlight.icon className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white mb-3'>
                {highlight.title}
              </h3>
              <p className='text-white/70 text-sm mb-4 leading-relaxed'>
                {highlight.description}
              </p>
              <div className='text-yellow-400 font-bold text-lg'>
                {highlight.stats}
              </div>
            </div>
          ))}
        </div>

        {/* Conference Features */}
        <div className='space-y-8'>
          {conferenceFeatures.map((feature, index) => (
            <div
              key={index}
              className={`bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              } lg:flex`}
            >
              <div className='lg:w-1/2'>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className='w-full h-64 lg:h-full object-cover'
                />
              </div>

              <div className='lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center'>
                <h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-4'>
                  {feature.title}
                </h3>
                <p className='text-gray-700 text-lg leading-relaxed mb-6'>
                  {feature.description}
                </p>

                <div className='grid grid-cols-2 gap-4 mb-6'>
                  {feature.features.map((item, idx) => (
                    <div key={idx} className='flex items-center'>
                      <div className='w-2 h-2 bg-yellow-500 rounded-full mr-3'></div>
                      <span className='text-gray-700 font-medium'>{item}</span>
                    </div>
                  ))}
                </div>

                <button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 flex items-center w-fit'>
                  Learn More
                  <ExternalLink className='w-4 h-4 ml-2' />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Conference Impact */}
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white'>
          <h3 className='text-3xl md:text-4xl font-bold mb-6'>
            Conference Impact
          </h3>
          <p className='text-lg md:text-xl leading-relaxed mb-8 max-w-4xl mx-auto'>
            Our conferences have facilitated groundbreaking research collaborations, launched innovative projects, and created a global network of researchers committed to excellence and innovation.
          </p>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-yellow-300 mb-2'>5000+</div>
              <div className='text-white/90'>Papers Published</div>
            </div>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-yellow-300 mb-2'>100+</div>
              <div className='text-white/90'>Conferences Organized</div>
            </div>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-yellow-300 mb-2'>25000+</div>
              <div className='text-white/90'>Participants</div>
            </div>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-yellow-300 mb-2'>80+</div>
              <div className='text-white/90'>Countries Reached</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EGEConferenceIntroduction