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
    {
      id: 'executive',
      label: 'Executive Committee',
      icon: BookOpen,
      color: 'yellow',
      count: 53
    },
    {
      id: 'scientific',
      label: 'Scientific Committee',
      icon: BookOpen,
      color: 'yellow',
      count: 53
    },
    {
      id: 'technical',
      label: 'Technical Committee',
      icon: Settings,
      color: 'blue'
    },
    {
      id: 'registration',
      label: 'Registration Committee',
      icon: ClipboardList,
      color: 'green'
    },
    { id: 'moderator', label: 'Session Moderators', icon: Mic, color: 'purple' }
  ]

  const committees = {
    executive: {
      title: 'Executive Committee',
      description: '',
      members: [
        {
          name: 'Prof. Madya Dr. Norma Bt Alias',
          title: 'Conference Advisor',
          university: 'Universiti Teknologi Malaysia',
          country: 'Malaysia',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Prof. Madya Dr. Norma Bt Alias.jpg',
          achievements: [],
          bio: 'We are proud to have Associate Professor Dr. Norma Bt Alias as the Main Conference Advisor for EGEIMRC2026. She holds a Ph.D. in Industrial Computing from Universiti Kebangsaan Malaysia (UKM) and is widely recognized for her contributions in high-performance computing, big data analytics, and interdisciplinary research towards Industry 5.0. With extensive experience in organizing international conferences, serving on editorial boards, and mentoring future-ready educators and researchers, Dr. Norma brings invaluable expertise and guidance to the success of this global event.'
        },
        {
          name: 'Prof. Dr. Siti Zaiton Bt. Mohd Hashim',
          title: 'Conference Advisor',
          university: 'Universiti Teknologi Malaysia',
          country: 'Malaysia',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Prof Siti Zaiton.jpg',
          achievements: [],
          bio: `As a Conference Advisor, Prof. Dr. Siti Zaiton brings exceptional academic leadership, research insight, and innovative vision to guide the conference towards achieving excellence in knowledge sharing and global collaboration.
Prof. Dr. Siti Zaiton Bt. Mohd Hashim is a distinguished Professor at the Faculty of Computing, Universiti Teknologi Malaysia (UTM), where she also serves as the Deputy Dean of Research and Innovation. She holds a B.Sc. in Computer Science from the University of Hartford (USA), an M.Sc. in Computing from the University of Bradford (UK), and a Ph.D. in Soft Computing from The University of Sheffield (UK).

With a strong academic and research background, Prof. Dr. Siti Zaiton is an Associate Member of the UTM Big Data Centre of Excellence (UTM-BDC) and has successfully supervised or co-supervised over 20 Master’s and 40 Ph.D. students. She has authored and co-authored more than 120 publications in reputable journals and conferences, achieving an H-index of 24 with over 3,000 citations.
Her research expertise spans artificial intelligence, soft computing, and machine learning, making significant contributions to advancing intelligent systems and computational methodologies.
`
        },
        {
          name: 'Prof. Madya Dr. Azurah Bte A Samah',
          title: 'Chairman',
          university: 'University of Southampton Malaysia',
          country: 'Malaysia',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Syed Hamid Hussain Madni.png',
          achievements: [],
          bio: `We are honored to have Dr. Syed Hamid Hussain Madni, Founder and CEO of Elite Global Excellence Sdn Bhd, serving as the Chairman of EGEIMRC2026. An accomplished academic leader and researcher with over 15 years of teaching and research experience, Dr. Madni is currently an Assistant Professor at the University of Southampton Malaysia. Holding a Ph.D. in Computer Science from Universiti Teknologi Malaysia, he has published over 40 ISI/Scopus-indexed papers, with notable contributions in AI, IoT, Cloud Computing, Big Data, and Cybersecurity. With extensive experience leading research projects, securing grants, and delivering keynote addresses worldwide, Dr. Madni brings visionary leadership to the conference, fostering innovation, collaboration, and impactful knowledge exchange on a global scale.
`
        },
        {
          name: 'Mr. Sajid Shah',
          title: 'Vice Chairman',
          university: 'Universiti Teknologi Malaysia',
          country: 'Malaysia',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Sajid Shah Leadership.jpg',
          achievements: [],
          bio: `We are pleased to introduce Mr. Sajid Shah, Co-Founder and Research & Development Director of Elite Global Excellence Sdn Bhd, as the Vice Chairman of EGEIMRC2026. An emerging researcher and dedicated software engineer, he specializes in Artificial Intelligence, Machine Learning, IoT, and Cloud Computing. Currently pursuing his MPhil in Computer Science at Universiti Teknologi Malaysia, Mr. Shah has contributed to ISI/Scopus-indexed publications, multi-national research projects, and funded initiatives in Industrial IoT and Multi-Omics data analysis. Recognized as a speaker, reviewer, and coordinator in international conferences, he brings innovative vision and strong academic leadership to his role, supporting the mission of EGEIMRC2026 in advancing research and global collaboration.
`
        },
        {
          name: 'Dr. Ayuba John',
          title: 'Secretary',
          university: 'Federal University Dutse',
          country: 'Nigeria',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Dr Ayuba Jhon.jpg',
          achievements: [],
          bio: `We are delighted to have Dr. Ayuba John serving as the Conference Secretary for EGEIMRC2026. He obtained his Ph.D. in Computer Science from Universiti Teknologi Malaysia (UTM) in 2025, following his M.Eng. in Computer Engineering from the University of Benin, Nigeria, and B.Eng. in Computer Engineering from the University of Maiduguri, Nigeria. With professional experience as a Transmission Engineer at the National Control Centre (Transmission Company of Nigeria) and as a member of the Nigerian Society of Engineers (NSE), Dr. John brings both academic and industry expertise. Currently a lecturer at the Federal University Dutse, his research focuses on cybersecurity, machine learning, and wireless sensor networks, making him a valuable contributor to the success and organization of EGEIMRC2026.
`
        },
        {
          name: 'Dr. Zuriahati Binti Mohd Yunos',
          title: 'Vice Secretary',
          university: 'Universiti Teknologi Malaysia',
          country: 'Malaysia',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Dr. Zuriahati Binti Mohd Yunos.jpg',
          achievements: [],
          bio: `
`
        },
        {
          name: 'Dr. Ekaterina Shevchu',
          title: 'Head of Publicity, Promotion & Marketing Committee',
          university: 'Peter the Great St. Petersburg Polytechnic University',
          country: 'Russia',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Dr. Ekaterina Shevchu.png',
          achievements: [],
          bio: `
          Dr. Ekaterina Shevchuk is an accomplished researcher and academic affiliated with Peter the Great St. Petersburg Polytechnic University, specializing in marketing, digital branding, customer experience, and interdisciplinary communication. With a prolific record of publications spanning international journals, conference proceedings, and books, she has made significant contributions to digital marketing, brand management, and innovative promotion strategies. Her extensive experience in research dissemination and engagement makes her an ideal leader for the Publicity, Promotion & Marketing Committee of EGEIMRC2026, where she drives strategic visibility, outreach, and promotion of the conference to a global audience.
`
        },
        {
          name: 'Dr. Nelli Kozlova',
          title: 'Director of Publicity, Promotion & Marketing Committee',
          university: 'Peter the Great St. Petersburg Polytechnic University',
          country: 'Russia',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Dr. Nelli Kozlova.jpg',
          achievements: [],
          bio: `
         
`
        },
        {
          name: 'Dr. Muhammad Asim Siddique',
          title: 'Director of Publicity, Promotion & Marketing Committee',
          university: 'University of Punjab',
          country: 'Pakistan',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/DR. MUHAMMAD ASIM SIDDIQUE.jpg',
          achievements: [],
          bio: `
          Dr. Muhammad Asim Siddique, a distinguished digital media expert and General Manager at SAMAA TV, holds a PhD in Software Engineering and brings extensive expertise in digital media strategies, content creation, and technology-driven innovation. With a robust background in digital media production, content writing, social media management, data analysis, and digital marketing, he is a thought leader in IT, AI revolution, economic trends, and security issues. As the Head of the Multimedia Committee for the Elite Global Excellence International Multidisciplinary Research Conference 2026 (EGEIMRC2026), Dr. Siddique is poised to drive impactful multimedia initiatives, fostering collaboration and innovation across diverse disciplines.
         
`
        },
        {
          name: 'Dr. Hadi Susanto',
          title: 'Head of Logistics, Food and Drinks Committee',
          university: 'Telkom University',
          country: 'Indonesia',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Dr. Hadi Susanto.jpg',
          achievements: [],
          bio: `
          Dr. Hadi Susanto, a distinguished industrial engineer, holds a PhD in Industrial Management from National Taiwan University of Science and Technology (NTUST), complemented by a dual-degree Master’s (MBA and MT) from NTUST and Institut Teknologi Bandung (ITB), graduating with a perfect 4.0 GPA in just seven months as the fastest Indonesian graduate at NTUST. A recipient of prestigious scholarships, including Taiwan Tech’s full scholarship and DIKTI’s Beasiswa Unggulan, he excels in optimization, location routing, vehicle routing, shelf space allocation, and queueing theory, with proven leadership in student organizations and international cultural exhibitions. As Head of the Logistics, Food, and Drinks Committee for the Elite Global Excellence International Multidisciplinary Research Conference 2026 (EGEIMRC2026), Dr. Hadi leverages his exceptional organizational skills, target-oriented approach, and expertise to ensure seamless operations, fostering collaboration and elevating the conference experience through his commitment to sharing knowledge for societal advancement.
         
`
        },
        {
          name: 'Prof. Dr. Abdul Rauf Bhatti ',
          title: 'Head of Logistics, Food and Drinks Committee',
          university: 'Government College University Faisalabad (GCUF),',
          country: 'Pakistan',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Dr Abdurauf Bhatti.jpg',
          achievements: [],
          bio: `
          We are privileged to have Prof. Dr. Abdul Rauf Bhatti, Professor of Electrical Engineering and Dean, Faculty of Engineering & Technology at Government College University Faisalabad (GCUF), serving as the Head of the Technical Program Committee for EGEIMRC2026. He earned his Ph.D. in Electrical Engineering with distinction from Universiti Teknologi Malaysia (UTM) in 2017 and has since been recognized with numerous national and international awards, including Best Teacher and Outstanding Researcher at GCUF, Most Downloaded Paper by Wiley Online Library, and Best Paper at the IEEE International Conference on Power and Energy in Malaysia. Ranked among the World’s Top 2% Scientists (2024), Dr. Bhatti has published extensively with over 80 research articles, an h-index of 25, and more than 2,700 citations. His expertise spans electrical energy management, electric vehicle charging, solar photovoltaics, forecasting, artificial intelligence, and renewable energy, bringing exceptional technical depth and leadership to the success of EGEIMRC2026.
         
`
        },
        {
          name: 'Associate Prof. Dr. Yousra Abdul Alsahib S.Aldeen ',
          title: 'Head of Publication Committee',
          university: 'University of Baghdad (UOB)',
          country: 'Iraq',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Dr Yusra.png',
          achievements: [],
          bio: `
          Associate Prof. Dr. Yousra Abdul Alsahib S. Aldeen, Associate Dean for Scientific Affairs and Graduate Studies at the College of Science for Women, University of Baghdad, is a distinguished scholar in computer networks, cloud privacy, IoT, and smart cities. With over 16 publications and international research recognition, she brings extensive expertise in privacy-preserving data mining, cloud security, and emerging technologies. As Head of the Publication Committee at EGEIMRC2026, she plays a vital role in ensuring high-quality research dissemination through indexed journals and conference proceedings.
         
`
        },
        {
          name: 'Dr. Zeeshan Anjum Memon',
          title: 'Head of Virtual Conference Committee',
          university: 'Mehran University of Engineering and Technology',
          country: 'Pakistan',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee/Dr Zeeshan Anjum.jpg',
          achievements: [],
          bio: `
          Dr. Zeeshan Anjum Memon, PhD in Electrical Engineering, serves as the Head of the Virtual Conference Committee. His expertise lies in electric vehicle (EV) integration with modern power grids, distributed generation allocation, and hybrid metaheuristic optimization algorithms. He has authored impactful journal articles, books, and research projects, while actively contributing as a reviewer for esteemed journals. With a strong commitment to collaboration and innovation, Dr. Zeeshan leads research initiatives, student mentorship, and academic knowledge-sharing to advance sustainable solutions in power systems and EV technologies.
         
`
        },
      ]
    },
    scientific: {
      title: 'Scientific Committee',
      description:
        'Distinguished researchers and academicians overseeing the scientific quality and peer review process.',
      members: [
        {
          name: 'Dr. Ebrahim Esmaili',
          title: 'Faculty of Information Science and Technology (FIST)',
          university: 'Multimedia University (MMU)',
          country: 'Malaysia',
          expertise: '',
          email: '',
          website: '',
          image:
            '/public/EGEIMRC2026 Conference Executive Committee',
          achievements: [
            
          ],
          bio: ''
        },
        {
          name: 'Prof. Ahmed Hassan',
          title: 'Vice Chair',
          university: 'University of Oxford',
          country: 'United Kingdom',
          expertise: 'Sustainable Engineering & Climate Tech',
          email: 'a.hassan@oxford.ac.uk',
          website: 'https://oxford.ac.uk/~hassan',
          image:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'Royal Society Fellow',
            '200+ Citations',
            'Climate Innovation Award'
          ],
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
          image:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'ACM Distinguished Scientist',
            '80+ Publications',
            'Innovation Excellence Award'
          ],
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
          image:
            'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'Swiss National Science Fellow',
            '120+ Publications',
            'Healthcare Innovation Award'
          ],
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
          image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'Data Science Excellence Award',
            '90+ Publications',
            'Industry Partnership Medal'
          ],
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
          image:
            'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'IoT Innovation Award',
            '110+ Publications',
            'Japan Science Medal'
          ],
          bio: 'International authority on Internet of Things and smart city technologies.'
        }
      ]
    },
    technical: {
      title: 'Technical Committee',
      description:
        'Technical experts ensuring smooth conference operations and technology infrastructure.',
      members: [
        {
          name: 'Dr. Michael Brown',
          title: 'Technical Chair',
          university: 'Georgia Institute of Technology',
          country: 'United States',
          expertise: 'Systems Engineering & Infrastructure',
          email: 'm.brown@gatech.edu',
          website: 'https://gatech.edu/~mbrown',
          image:
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'IEEE Senior Member',
            'Tech Innovation Award',
            '15+ Years Experience'
          ],
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
          image:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'Media Technology Expert',
            'Conference AV Specialist',
            'Tech Excellence Award'
          ],
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
          image:
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'Cloud Security Certification',
            'Network Expert',
            'IT Excellence Award'
          ],
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
          image:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'UX Design Expert',
            'Web Platform Specialist',
            'Digital Innovation Award'
          ],
          bio: 'Specialist in creating user-friendly digital platforms for academic conferences.'
        }
      ]
    },
    registration: {
      title: 'Registration Committee',
      description:
        'Dedicated team managing participant registration, accommodation, and logistical arrangements.',
      members: [
        {
          name: 'Ms. Jennifer Adams',
          title: 'Registration Chair',
          university: 'Conference Management Services',
          country: 'United States',
          expertise: 'Event Management & Logistics',
          email: 'j.adams@conference-services.com',
          website: 'https://conference-services.com/jadams',
          image:
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'Certified Event Manager',
            '50+ Conferences',
            'Excellence in Service Award'
          ],
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
          image:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'Hospitality Excellence',
            'Tourism Management Expert',
            'Service Quality Award'
          ],
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
          image:
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'International Mobility Expert',
            'Visa Processing Specialist',
            'Cultural Exchange Award'
          ],
          bio: 'International relations expert facilitating seamless travel arrangements for global participants.'
        }
      ]
    },
    moderator: {
      title: 'Session Moderators',
      description:
        'Experienced professionals moderating technical sessions and panel discussions.',
      members: [
        {
          name: 'Prof. Robert Anderson',
          title: 'Keynote Session Moderator',
          university: 'Harvard University',
          country: 'United States',
          expertise: 'Technology Innovation & Strategy',
          email: 'r.anderson@harvard.edu',
          website: 'https://harvard.edu/~randerson',
          image:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'Innovation Leadership Award',
            'Strategic Planning Expert',
            'Industry Connector'
          ],
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
          image:
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'AI Ethics Pioneer',
            'Women in Tech Award',
            'Research Excellence Medal'
          ],
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
          image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'Engineering Excellence Award',
            'Sustainability Pioneer',
            'Infrastructure Expert'
          ],
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
          image:
            'https://images.unsplash.com/photo-1494790108755-2616c35d20a1?w=300&h=300&fit=crop&crop=face',
          achievements: [
            'Digital Transformation Expert',
            'Business Innovation Award',
            'Leadership Excellence'
          ],
          bio: 'Business transformation expert specializing in digital innovation and strategic management.'
        }
      ]
    }
  }

  const getColorClasses = color => {
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
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-5'>
        <div
          className='absolute top-0 left-0 w-full h-full'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className='relative z-10 py-16 px-4'>
        {/* Header */}
        <div className='container mx-auto max-w-7xl'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl md:text-6xl font-bold mb-6 tracking-wider text-yellow-500'>
              Committee Members
            </h1>
            <p className='text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed'>
              Meet our distinguished committee members who ensure the success
              and quality of EGEIMRC2026. Our committees comprise renowned
              experts from leading universities and institutions worldwide.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className='mb-12'>
            <div className='flex flex-wrap justify-center gap-2 md:gap-4'>
              {tabs.map(tab => {
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
                    <TabIcon className='w-5 h-5' />
                    <span className='font-medium text-sm md:text-base'>
                      {tab.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Committee Header */}
          <div className='mb-12 text-center'>
            <div
              className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full border backdrop-blur-sm ${
                getColorClasses(currentTab.color).bg
              }`}
            >
              <currentTab.icon
                className={`w-6 h-6 ${getColorClasses(currentTab.color).text}`}
              />
              <h2 className='text-2xl font-bold text-white'>
                {currentCommittee.title}
              </h2>
            </div>
            <p className='text-white/70 mt-4 max-w-2xl mx-auto'>
              {currentCommittee.description}
            </p>
          </div>

          {/* Members Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {currentCommittee.members.map((member, index) => (
              <div
                key={index}
                className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group'
              >
                {/* Member Photo */}
                <div className='relative mb-4'>
                  <div className='w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-colors duration-300'>
                    <img
                      src={member.image}
                      alt={member.name}
                      className=''
                    />
                  </div>
                  {member.title.includes('Chair') && (
                    <div className='absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1'>
                      <Award className='w-4 h-4 text-black' />
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className='text-center mb-4'>
                  <h3 className='text-xl font-bold text-white mb-1'>
                    {member.name}
                  </h3>
                  <p
                    className={`text-sm font-semibold mb-2 ${
                      getColorClasses(currentTab.color).text
                    }`}
                  >
                    {member.title}
                  </p>

                  <div className='flex items-center justify-center space-x-1 text-white/70 mb-2'>
                    <GraduationCap className='w-4 h-4' />
                    <span className='text-sm'>{member.university}</span>
                  </div>

                  <div className='flex items-center justify-center space-x-1 text-white/60 mb-3'>
                    <MapPin className='w-4 h-4' />
                    <span className='text-sm'>{member.country}</span>
                  </div>

                  <div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      getColorClasses(currentTab.color).bg
                    } ${getColorClasses(currentTab.color).text}`}
                  >
                    {member.expertise}
                  </div>
                </div>

                {/* Bio */}
                <p className='text-white/70 text-sm  text-justify leading-relaxed mb-4'>
                  {member.bio}
                </p>

                {/* Achievements */}
                <div className='mb-4'>
                  <div className='flex flex-wrap justify-center gap-1'>
                    {member.achievements.map(
                      (achievement, achievementIndex) => (
                        <div
                          key={achievementIndex}
                          className='flex items-center space-x-1 bg-white/5 rounded-full px-2 py-1'
                        >
                          <Star className='w-3 h-3 text-yellow-400' />
                          <span className='text-xs text-white/60'>
                            {achievement}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Contact Links */}
                <div className='flex justify-center space-x-3 pt-4 border-t border-white/10'>
                  {member?.email && <a
                    href={`mailto:${member.email}`}
                    className='p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors duration-300 group'
                  >
                    <Mail className='w-4 h-4 text-white/60 group-hover:text-white' />
                  </a>}
                  {member.website&&<a
                    href={member.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors duration-300 group'
                  >
                    <Globe className='w-4 h-4 text-white/60 group-hover:text-white' />
                  </a>}
                </div>
              </div>
            ))}
          </div>

          {/* Committee Statistics */}
          <div className='mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20'>
            <h3 className='text-2xl font-bold text-white text-center mb-8'>
              Committee Overview
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
              {tabs.map(tab => {
                const colors = getColorClasses(tab.color)
                const TabIcon = tab.icon
                return (
                  <div key={tab.id} className='text-center'>
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${colors.bg}`}
                    >
                      <TabIcon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className='text-2xl font-bold text-white mb-1'>
                      {committees[tab.id].members.length}
                    </div>
                    <div className='text-white/60 text-sm'>{tab.label}</div>
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
