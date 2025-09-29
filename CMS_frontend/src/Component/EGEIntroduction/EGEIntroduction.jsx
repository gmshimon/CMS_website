import { useState } from 'react'
import { Target, Eye, Award, X, Mail, Linkedin } from 'lucide-react'

// EGE Introduction Component
const EGEIntroduction = () => {
  const [selectedMember, setSelectedMember] = useState(null)

  const communityMembers = [
    {
      id: 1,
      name: 'Dr. Syed Hamid Hussain Madni',
      title: 'Founder and CEO',
      category: 'LEADERSHIP',
      image: 'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/Leadership+Pictures/Syed+Hamid+Hussain+Madni.png',
      bio: 'Dr. Syed Hamid Hussain Madni, Founder and CEO of Elite Global Excellence Sdn Bhd, is an accomplished academic leader and researcher with over 15 years of teaching and research experience. Currently serving as an Assistant Professor at the University of Southampton Malaysia, he holds a PhD in Computer Science from Universiti Teknologi Malaysia. With 40+ ISI/Scopus-indexed publications, an H-index of 17, and ground-breaking contributions in AI, IoT, Cloud Computing, Big Data and Cybersecurity, Dr. Madni has led 20+ national and international research projects and secured multiple research grants across Malaysia, Pakistan, and Saudi Arabia. A frequent keynote speaker and global collaborator, he continues to inspire innovation, foster academic excellence, and bridge the gap between research and real-world impact.',
      email: 'madni4all@yahoo.com',
      linkedin: 'https://www.linkedin.com/in/syed-hamid-hussain-madni-7b623b72',
      achievements: [
        'Published 40+ ISI/Scopus-indexed research articles with a cumulative impact factor of 50+.',
        'Holds an H-index of 17 and an i10-index of 23.',
        'Led and collaborated on 20+ national and international research projects.',
        'Secured 8+ competitive research grants across Malaysia, Pakistan, and Saudi Arabia.',
        'Expertise spanning AI, IoT, Cloud Computing, Big Data, Cybersecurity, Blockchain, E-Learning and E-Health.',
        'Regular keynote speaker and expert panellist at international universities and forums in Malaysia, Saudi Arabia, Iraq, India and Pakistan.',
        'Active reviewer, editorial board member and session chair for leading international journals and conferences.',
        'Organizer of numerous academic events, workshops and seminars through global associations and networks.'
      ]
    },
    {
      id: 2,
      name: 'Mr. Sajid Shah',
      title: 'Co-Founder',
      category: 'LEADERSHIP',
      image: 'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/Leadership+Pictures/Sajid+Shah+Leadership.jpg',
      bio: 'Mr. Sajid Shah, Co-Founder and Research & Development Director of Elite Global Excellence Sdn Bhd, is a dedicated software engineer and emerging researcher with expertise in Artificial Intelligence, Machine Learning, IoT and Cloud Computing. He is currently pursuing his Master of Philosophy (MPhil) in Computer Science at Universiti Teknologi Malaysia, where he also contributes as a lecturer and teaching assistant. With a strong academic foundation, Mr. Sajid Shah has published impactful research in ISI/Scopus-indexed journals, contributed to multi-national research projects, and worked as a research assistant on several funded projects in areas such as Industrial IoT and Multi-Omics data analysis. He has also earned recognition as a speaker, reviewer, and coordinator for prestigious international conferences. His passion lies in bridging research and innovation, developing real-world technological solutions, and fostering global academic collaborations through his leadership role at EGE.',
      email: 'sajidshah232@gmail.com',
      linkedin:
        'https://www.linkedin.com/in/sajid-shah-526338233/?originalSubdomain=my',
      achievements: [
        'Published multiple ISI/Scopus-indexed research articles, including work in Q1 and Q2 journals.',
        'Served as Vice Chairman of the 17th Postgraduate Annual Research Seminar (PARS2025) at UTM.',
        'Received Industry Choice Award and Best Presenter Award at the 8th International Undergraduate Research Conference (IURC 2024).',
        'Reviewer for renowned journals including PLOS One and Springer Discover Applied Sciences.',
        'Earned Dean’s List Awards for outstanding academic performance.',
        'Successfully led and contributed to multi-omics and Industrial IoT research projects funded by institutions in Malaysia and Saudi Arabia.',
        'Actively engaged in organizing and coordinating international conferences.'
      ]
    },
    {
      id: 3,
      name: 'Dr. Shahid Kamal',
      title: 'Director of Publications & Editorial Affairs',
      category: 'RESEARCH',
      image: 'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/Leadership+Pictures/Dr+Shahid+Kamal.png',
      bio: 'Dr. Shahid Kamal, Director of Publications & Editorial Affairs at Elite Global Excellence Sdn Bhd, is an Assistant Professor at the Faculty of Computing and Informatics, Multimedia University, Malaysia. He holds a Ph.D. in Computer Science with a specialization in Software Engineering from Universiti Teknologi Malaysia (UTM). With a strong academic and research background, he has authored a book, contributed multiple book chapters, and published extensively in peer-reviewed journals. His research interests include non-functional requirements (NFRs), semantic search optimization, and quality-centric API frameworks. In addition to his research contributions, Dr. Shahid Kamal actively serves as an Area Editor and reviewer for several ISI-indexed international journals, reflecting his commitment to advancing scholarly excellence and supporting the global research community.',
      email: 'shahid.kamal@mmu.edu.my',
      linkedin:
        'https://www.linkedin.com/in/shahid-kamal-3a646028/?originalSubdomain=my',
      achievements: [
        'Currently serving as an Assistant Professor at the Faculty of Computing and Informatics, Multimedia University, Malaysia.',
        'Authored a book and contributed multiple book chapters in the field of software engineering.',
        'Published numerous peer-reviewed research articles in ISI-indexed journals.',
        'Research expertise in Non-Functional Requirements (NFRs), semantic search optimization and quality-centric API frameworks.',
        'Serving as an Area Editor for international ISI-indexed journals.',
        'Active reviewer for multiple leading international journals and conferences.'
      ]
    },
    {
      id: 4,
      name: 'Dr. Muhammad Faheem',
      title: 'Director of Strategy & Planning',
      category: 'LEADERSHIP',
      image: 'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/Leadership+Pictures/Muhammad+Faheem.jpg',
      bio: 'We are honored to have Dr. Muhammad Faheem as the Director of Strategy & Planning at Elite Global Excellence. He is a Senior Scientist at VTT Technical Research Centre of Finland with a distinguished academic and professional career spanning institutions in Turkey, Pakistan, Malaysia, and Finland. Dr. Faheem has received multiple international accolades, including the Stanford Top 2% Scientist Award (2023–2024) and the Elsevier Highly Cited Scientist Award (2024). Actively engaged in global research networks, he serves on editorial boards of leading journals (Elsevier, PLOS ONE, Frontiers, Wiley, MDPI) and has chaired sessions at international IEEE conferences. His expertise covers cybersecurity, AI, machine learning, blockchain, smart grids, and IoT, with a focus on developing advanced digital solutions for sustainable and secure systems. At Elite Global Excellence, he plays a key role in shaping strategic directions and fostering impactful global collaborations.',
      email: 'muhammad.faheem@vtt.fi',
      linkedin: 'https://www.linkedin.com/in/muhammad-faheem-945b3457',
      achievements: [
        'Senior Scientist at VTT Technical Research Centre of Finland with international academic experience in Turkey, Pakistan, Malaysia and Finland.',
        'Recipient of the Stanford Top 2% Scientist Award (2023–2024) and Elsevier Highly Cited Scientist Award (2024).',
        'Serves on editorial boards of leading journals including Sustainable Futures (Elsevier), PLOS ONE, and Frontiers.',
        'Chaired sessions at prestigious conferences such as IEEE AIE2024 (Finland) and CAC2023 (Malaysia).',
        'Research expertise in AI, machine learning, blockchain, cybersecurity, IoT, and smart grids with practical industry applications.'
      ]
    },
    {
      id: 5,
      name: 'Dr. Shafi’i Muhammad Abdulhamid',
      title: 'Director of Training & Capacity Building',
      category: 'LEADERSHIP',
      image: 'https://conferencewebsiteglobal.s3.ap-southeast-2.amazonaws.com/Leadership+Pictures/Dr.+Shafii+Abdul+Hamid.jpg',
      bio: 'As the Director of Training & Capacity Building at Elite Global Excellence, Dr. Shafi’i Muhammad Abdulhamid, an Assistant Professor of Cybersecurity at the Community College of Qatar, brings unparalleled expertise from his pioneering role as Head of the first Department of Cyber Security Science at Nigeria’s Federal University of Technology, Minna, and a Ph.D. in Computer Science from the University of Technology Malaysia. Recognized among the World’s Top 2% Scientists by Stanford University in 2022 and 2024, with over 150 publications and nearly 5,000 citations, his research spans cloud security, digital forensics, and cybersecurity. A senior member of IEEE, IACSIT and other prestigious societies, and an editor for Springer’s Discover Computing journal, Dr. Shafi’i leverages his extensive academic and professional experience, including Huawei ICT Academy certifications and leadership in accreditation committees, to drive innovative training initiatives for the Elite Global Excellence.',
      email: 'shafii.abdulhamid@futminna.edu.ng',
      linkedin:
        'https://www.linkedin.com/in/shafi-i-muhammad-abddulhamid-phd-89a781179?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      achievements: [
        'Recognized among the World’s Top 2% Scientists by Stanford University in 2022 and 2024.',
        'Over 150 publications with nearly 5,000 citations.',
        'Assistant Professor of Cybersecurity at the Community College of Qatar.',
        'Former Head of the first Department of Cyber Security Science at Nigeria’s Federal University of Technology, Minna.',
        'Research expertise in cloud security, digital forensics, and cybersecurity.',
        'Senior member of IEEE, IACSIT and other prestigious societies.',
        'Editor for Springer’s Discover Computing journal.',
        'Huawei ICT Academy certifications and leadership in accreditation committees.'
      ]
    }
  ]

  const closeBioModal = () => {
    setSelectedMember(null)
  }

  return (
    <div className='space-y-16'>
      {/* About Section */}
      <div className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl'>
        <div className='flex flex-col lg:flex-row items-center gap-8'>
          {/* Logo Section */}
          <div className='flex-shrink-0'>
            <img className='w-66 h-24' src='/assets/EGE_logo.png' alt='' />
          </div>

          {/* Content Section */}
          <div className='flex-1'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>
              <span className='text-yellow-500'>About</span> Elite Global
              Excellence
            </h2>
            <p className='text-gray-700 text-lg leading-relaxed text-justify'>
              Elite Global Excellence Sdn. Bhd is a Malaysian based
              forward-thinking organization dedicated to promoting research,
              innovation and cross-disciplinary collaboration on a global scale.
              Founded with the goal of creating meaningful opportunities for
              researchers, students and educators, EGE has quickly emerged as a
              trusted partner in the academic and research community. Our work
              revolves around organizing high-impact research conferences,
              fostering collaborations with educational institutions, and
              providing free educational workshops to empower educators
              worldwide. We take pride in our ability to connect people across
              borders, disciplines and cultures, creating a vibrant ecosystem
              where ideas flourish and innovation thrives.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className='grid md:grid-cols-2 gap-8'>
        {/* Mission */}
        <div className='bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl'>
          <div className='h-48 bg-gradient-to-br from-blue-500 to-blue-700 relative'>
            <div className='absolute inset-0 bg-black/20'></div>
            <img
              src='https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&crop=center'
              alt='Mission'
              className='w-full h-full object-cover mix-blend-overlay'
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center text-white'>
                <Target className='w-12 h-12 mx-auto mb-2' />
                <h3 className='text-2xl font-bold'>Mission</h3>
              </div>
            </div>
          </div>
          <div className='p-6'>
            <p className='text-gray-700 leading-relaxed'>
              To empower transformative research and foster global
              collaborations that catalyze innovation and spark advancements.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className='bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl'>
          <div className='h-48 bg-gradient-to-br from-purple-500 to-purple-700 relative'>
            <div className='absolute inset-0 bg-black/20'></div>
            <img
              src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=300&fit=crop&crop=center'
              alt='Vision'
              className='w-full h-full object-cover mix-blend-overlay'
            />
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-center text-white'>
                <Eye className='w-12 h-12 mx-auto mb-2' />
                <h3 className='text-2xl font-bold'>Vision</h3>
              </div>
            </div>
          </div>
          <div className='p-6'>
            <p className='text-gray-700 leading-relaxed'>
              Becoming the nexus of a worldwide network where pioneering ideas
              flourish into impactful realities, advancing the frontiers of
              research and innovations.
            </p>
          </div>
        </div>
      </div>

      {/* EGE Community */}
      <div className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
          <span className='text-yellow-500'>EGE</span> Leadership
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {communityMembers.map(member => (
            <div
              key={member.id}
              className='group relative bg-gradient-to-br from-teal-700 to-blue-900 rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg'
            >
              {/* Member Image */}
              <div className='relative overflow-hidden'>
                <img
                  src={member.image}
                  alt={member.name}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>

                {/* Category Badge */}
                <div className='absolute bottom-3 right-2'>
                  <span className='bg-black/40 text-white text-xs font-bold px-3 py-1 rounded-full'>
                    {member.category}
                  </span>
                </div>
              </div>

              {/* Member Info */}
              <div className='p-4 text-center text-white mb-10'>
                <h4 className='font-bold text-lg mb-1'>{member.name}</h4>
                <p className='text-white/80 text-sm mb-4'>{member.title}</p>
              </div>
              {/* View Bio Button */}
              <div className='absolute bottom-0 left-16 pb-2'>
                <button
                  onClick={() => setSelectedMember(member)}
                  className='bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-4 py-2 rounded-full transition-all duration-300 flex items-center justify-center mx-auto relative butt'
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
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'>
            <div className='relative'>
              {/* Header */}
              <div className='bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white text-center relative'>
                <button
                  onClick={closeBioModal}
                  className='absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all duration-200'
                >
                  <X className='w-5 h-5' />
                </button>

                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className='w-42 h-44 rounded-full mx-auto mb-4 border-4 border-white/20'
                />
                <h3 className='text-2xl font-bold mb-2'>
                  {selectedMember.name}
                </h3>
                <p className='text-white/90 text-lg'>{selectedMember.title}</p>
                <span className='inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mt-3'>
                  {selectedMember.category}
                </span>
              </div>

              {/* Content */}
              <div className='p-8'>
                <div className='mb-6'>
                  <h4 className='text-xl font-bold text-gray-800 mb-3'>
                    Biography
                  </h4>
                  <p className='text-gray-700 leading-relaxed'>
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Achievements */}
                <div className='mb-6'>
                  <h4 className='text-xl font-bold text-gray-800 mb-3'>
                    Key Achievements
                  </h4>
                  <ul className='space-y-2'>
                    {selectedMember.achievements.map((achievement, index) => (
                      <li key={index} className='flex items-start'>
                        <Award className='w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0' />
                        <span className='text-gray-700'>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className='border-t pt-6'>
                  <h4 className='text-lg font-bold text-gray-800 mb-4'>
                    Contact Information
                  </h4>
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className='flex items-center bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg transition-colors duration-200'
                    >
                      <Mail className='w-4 h-4 mr-2' />
                      Email
                    </a>
                    <a
                      href={selectedMember.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200'
                    >
                      <Linkedin className='w-4 h-4 mr-2' />
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
