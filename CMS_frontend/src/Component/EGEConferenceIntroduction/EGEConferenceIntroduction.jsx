import {
  Users,
  Award,
  Globe,
  Calendar,
  ExternalLink,
  Target,
  Lightbulb,
  Network,
  Leaf,
  Rocket
} from 'lucide-react'
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
      description: 'Scopus and Web of Science Index Publications.',
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
      title:
        'Conference Theme: The Power of Interdisciplinary Knowledge in Solving Complex Problems: Bridging Science, Technology, Humanities and Beyond.',
      content: `EGEIMRC2026 “The Power of Interdisciplinary Knowledge in Solving Complex Problems: Bridging Science, Technology, Humanities and Beyond“ reflects the vital role of interdisciplinary collaboration in addressing today’s complex global challenges. It captures the essence of collaboration, innovation and creativity, inviting researchers, scholars, and industry professionals to combine their expertise and tackle the world's most pressing challenges.<br/>
In today’s fast-evolving world, no single field of study holds all the answers. Climate change, global health crises, technological disruptions and social inequalities demand solutions that transcend traditional boundaries. By weaving together insights from science, technology, humanities and other disciplines, we unlock new perspectives and ground-breaking ideas. <br/>
Our theme celebrates the beauty of diverse perspectives coming together. It encourages us to break down silos, embrace collaboration, and create solutions that are holistic, inclusive and forward-thinking. Whether it’s developing clean energy technologies, addressing global poverty, or fostering cultural understanding, interdisciplinary approaches light the way toward a better future.
`,
      backgroundImage:
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop&crop=center'
    },
    objectives: {
      title: 'Conference Objectives',
      content: `(i)	To Promote Interdisciplinary Collaboration
Facilitate meaningful interaction among researchers, scholars, and professionals from diverse academic and industry backgrounds to encourage the integration of knowledge and expertise across disciplines.<br/><br/>

(ii)	To Provide a Global Platform for Research Exchange
Offer an international stage where participants from different countries can share their research findings, experiences, and innovations, fostering a more inclusive and culturally diverse research environment.<br/><br/>

(iii)	To Support the Dissemination of Cutting-edge Knowledge
Enable the presentation and discussion of the latest developments, emerging technologies and innovative solutions that address both local and global challenges across various fields.<br/>

(iv)	To Encourage the Application of Emerging Technologies Across Fields
Highlight the role and potential of modern tools such as artificial intelligence, data analytics, and digital platforms in enhancing research, problem-solving and development across multiple domains.<br/><br/>

(v)	To Inspire Young Researchers and Students
Engage postgraduate students, early-career researchers, and young professionals by providing a supportive platform for presenting their work, receiving feedback and learning from experienced experts
`,
      backgroundImage:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&crop=center'
    },
    impact: {
      title: 'Global Impact',
      content: `The Elite Global Excellence International Multidisciplinary Research Conference 2026 (EGEIMRC2026) is more than an academic gathering—it is a global movement that empowers scholars, innovators and changemakers to shape a better future. By uniting voices from diverse disciplines and cultures, the conference sparks collaborations that transcend borders, generating solutions with real-world impact. From advancing sustainable technologies and tackling climate challenges to reimagining education and driving social progress, EGEIMRC2026 creates ripples that extend far beyond the conference halls. Every idea shared, partnership forged and innovation presented at this platform has the potential to inspire action, transform communities, and contribute to a more inclusive, sustainable and prosperous world.`,
      backgroundImage:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&crop=center'
    },
    researchers: {
      title: 'Opportunities for Participants',
      content: `At the Elite Global Excellence International Multidisciplinary Research Conference 2026 (EGEIMRC2026), we are committed to creating an enriching and impactful experience for every participant. The conference offers a wide spectrum of opportunities designed to empower researchers, educators and professionals at all career stages. Participants can engage through keynote presentations, panel discussions, research paper presentations, poster sessions and hands-on workshops, while also having the chance to initiate collaborative projects that extend beyond the event.  Beyond presentations, attendees gain exclusive access to global experts and thought leaders, staying at the forefront of cutting-edge research and innovations across disciplines. The conference is not only a platform to showcase knowledge but also a gateway to networking, mentorship, interdisciplinary collaboration and long-term partnerships. By participating, researchers expand their professional horizons, strengthen their academic credentials and contribute to shaping solutions that address pressing global challenges.`,
      backgroundImage:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center'
    },
    students: {
      title: 'Opportunities for Students',
      content: `Students gain invaluable experience through our undergraduate research conference (EGEIURC), mentorship programs, research presentation opportunities, networking with industry professionals, and access to scholarship programs. We provide dedicated platforms for emerging researchers to showcase their work and connect with potential supervisors and collaborators.`,
      backgroundImage:
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop&crop=center'
    },
    collaboration: {
      title: 'Interdisciplinary Collaboration',
      content: `EGEIMRC2026 promotes interdisciplinary collaboration by bringing together experts from diverse academic fields, industries and cultural backgrounds to exchange knowledge and co-create innovative solutions. The conference recognizes that today’s global challenges whether in health, technology, environment, business or society cannot be solved in isolation. By fostering dialogue between scientists, engineers, social scientists, educators, policymakers and industry leaders, EGEIMRC2026 creates a vibrant ecosystem where ideas intersect and new perspectives emerge.<br/>

Through joint research presentations, interactive panels, and collaborative workshops, participants gain the opportunity to break down disciplinary silos, spark cross-cutting innovations, and form partnerships that lead to long-term projects. Whether it’s leveraging technology to improve healthcare, integrating humanities into sustainable development, or combining business insights with environmental science, the conference empowers participants to expand their horizons and generate holistic, impactful solutions. At its heart, EGEIMRC2026 is a celebration of collective intelligence demonstrating that true progress happens when disciplines converge and work together toward shared goals.
`,
      backgroundImage:
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop&crop=center'
    },
    sdgs: {
      title: 'Sustainable Development Goals (SDGs)',
      content: `The theme of EGEIMRC2026 strongly supports several United Nations Sustainable Development Goals (SDGs), which serve as a global blueprint for a sustainable and equitable world by 2030. Specifically, it aligns with:<br/>
•	SDG 4: Quality Education – By fostering interdisciplinary learning, we promote inclusive and innovative education that equips individuals with the skills to solve complex problems.<br/>
•	SDG 9: Industry, Innovation, and Infrastructure – Integrating science, technology, and humanities drives cutting-edge innovations and sustainable infrastructure.<br/>
•	SDG 17: Partnerships for the Goals – Collaboration across disciplines strengthens global partnerships, uniting diverse stakeholders to achieve shared objectives.<br/>
•	SDG 13: Climate Action – Interdisciplinary efforts are key to developing holistic strategies to combat climate change and its impacts.<br/><br/>

This conference is a call to action—an invitation to dream big, think creatively, and work together. At EGEIMRC2026, we will explore how interdisciplinary knowledge can transform challenges into opportunities, paving the way for a brighter, more sustainable world. Join us in this exciting journey to bridge disciplines, inspire innovation and shape a future that benefits all of humanity!
`,
      backgroundImage:
        'https://images.unsplash.com/photo-1569163139394-de44cb2b5890?w=800&h=400&fit=crop&crop=center'
    },
    innovation: {
      title: 'Innovation & Emerging Technologies',
      content: `We focus on cutting-edge innovations including artificial intelligence, machine learning, biotechnology, renewable energy, digital health, smart infrastructure and advanced data analytics, providing participants with insights into the technologies shaping the future. At EGEIMRC2026, innovation is not just about showcasing the latest advancements, it is about exploring how these breakthroughs can be harnessed responsibly to solve pressing global challenges.<br/>
Through keynote sessions, panel discussions and research presentations, participants gain exposure to transformative technologies that drive progress across multiple disciplines. The conference encourages researchers, technologists, entrepreneurs and policymakers to come together to evaluate emerging tools, debate their ethical implications, and envision their potential impact on industries and societies worldwide. By highlighting real-world applications from AI-driven healthcare solutions to sustainable energy systems, EGEIMRC2026 provides a unique platform to connect ideas with action.
`,
      backgroundImage:
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop&crop=center'
    }
  }

  const conferenceFeatures = [
    {
      title: 'EGEIMRC - International Multidisciplinary Research Conference',
      description:
        'Our flagship conference brings together researchers from diverse disciplines to share innovative research and foster collaboration.',
      image:
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop&crop=center',
      features: [
        'Multidisciplinary Research',
        'Global Participation',
        'IEEE Publications',
        'Best Paper Awards'
      ]
    },
    {
      title: 'EGEIURC - International Undergraduate Research Conference',
      description:
        'Dedicated platform for undergraduate students to present their research and connect with the global academic community.',
      image:
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop&crop=center',
      features: [
        'Student Focus',
        'Mentorship Programs',
        'Research Guidance',
        'Future Leaders'
      ]
    },
    {
      title: 'Specialized Domain Conferences',
      description:
        'Domain-specific conferences in AI, Healthcare, Sustainability, and other emerging research areas.',
      image:
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop&crop=center',
      features: [
        'Specialized Topics',
        'Expert Panels',
        'Industry Insights',
        'Innovation Showcase'
      ]
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
            <span className='text-yellow-500 block md:inline'> 2026</span>
          </h1>
          <p className='text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed'>
            Elite Global Excellence International Multidisciplinary Research
            Conference 2025 (EGEIMRC2025)
          </p>
        </div>

        {/* Interactive Section */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl'>
          <div className='flex flex-col lg:flex-row min-h-[600px]'>
            {/* Sidebar Navigation */}
            <div className='lg:w-1/3 bg-white p-6'>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>
                Conference Highlights
              </h3>
              <div className='space-y-2'>
                {navigationItems.map(item => (
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
                style={{
                  backgroundImage: `url(${sectionContent[activeSection]?.backgroundImage})`
                }}
              />
              <div className='relative z-10 bg-gradient-to-r from-gray-800/90 to-gray-900/90 h-full'>
                <div className='p-8 md:p-12 flex flex-col justify-center h-full'>
                  <h2 className='text-3xl md:text-3xl font-bold text-yellow-400 mb-6'>
                    {sectionContent[activeSection]?.title}
                  </h2>
                  <p className='text-white/90 text-lg text-justify leading-relaxed' dangerouslySetInnerHTML={{
    __html: sectionContent[activeSection]?.content
  }}/>
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
        {/* <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white'>
          <h3 className='text-3xl md:text-4xl font-bold mb-6'>
            Conference Impact
          </h3>
          <p className='text-lg md:text-xl leading-relaxed mb-8 max-w-4xl mx-auto'>
            Our conferences have facilitated groundbreaking research
            collaborations, launched innovative projects, and created a global
            network of researchers committed to excellence and innovation.
          </p>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-yellow-300 mb-2'>
                5000+
              </div>
              <div className='text-white/90'>Papers Published</div>
            </div>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-yellow-300 mb-2'>
                100+
              </div>
              <div className='text-white/90'>Conferences Organized</div>
            </div>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-yellow-300 mb-2'>
                25000+
              </div>
              <div className='text-white/90'>Participants</div>
            </div>
            <div>
              <div className='text-3xl md:text-4xl font-bold text-yellow-300 mb-2'>
                80+
              </div>
              <div className='text-white/90'>Countries Reached</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default EGEConferenceIntroduction
