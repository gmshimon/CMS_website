import {
  FileText,
  Download,
  Send,
  CheckCircle,
  AlertCircle,
  Users,
  Shield,
  Award,
  Eye,
  BookOpen,
  Copyright,
  Mail,
  Calendar,
  Target
} from 'lucide-react'
import { useState } from 'react'

const SubmissionPage = () => {
  const [activePolicy, setActivePolicy] = useState('policies')

  const policyItems = [
    {
      id: 'policies',
      title: 'Standard Conference Policies',
      icon: Shield,
      bgColor: 'bg-green-500'
    },
    {
      id: 'abstract',
      title: 'Abstract Submission Guidelines',
      icon: FileText,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'paper',
      title: 'Paper Submission Guidelines',
      icon: BookOpen,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'poster',
      title: 'Poster Submission Guidelines',
      icon: Target,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'review',
      title: 'Peer Reviewer Process',
      icon: Eye,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'quality',
      title: 'Research Quality Standards',
      icon: Award,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'plagiarism',
      title: 'Plagiarism and AI Content Policy',
      icon: AlertCircle,
      bgColor: 'bg-orange-500'
    },
    {
      id: 'copyright',
      title: 'Copyright & Author Rights',
      icon: Copyright,
      bgColor: 'bg-orange-500'
    }
  ]

  const policyContent = {
    policies: {
      title: 'Standard Conference Policies',
      content: `To ensure a high-quality, ethical, and inclusive academic experience, EGEIMRC2026 follows a set of standard policies that all participants including authors, presenters, reviewers, attendees and organizers are expected to adhere to. These policies help uphold the integrity of the conference and maintain a professional environment for global knowledge sharing.<br/><br/>
<strong>Originality & Authorship:</strong> All submissions must be <strong>original and unpublished</strong>. Abstract, Papers and Posters must not be under review or submitted to another conference or journal at the time of submission. All contributors must be properly credited, and honorary or ghost authorship (AI Generated) is strictly prohibited.<br/><br/>
<strong>Ethical Research Standards</strong>: All research involving human or animal participants must follow appropriate ethical guidelines. Any study using sensitive data or personal information must comply with data protection and privacy standards (e.g., GDPR or equivalent national regulations).<br/><br/>
<strong>Respectful Participation:</strong> All participants are expected to behave respectfully and professionally. Harassment, discrimination, or disruptive conduct will not be tolerated. The conference maintains a zero-tolerance policy toward unethical or inappropriate behaviour.
`
    },
    abstract: {
      title: 'Abstract Submission Guidelines',
      content: `•	Abstracts should be written in a <strong>structured and academic style</strong>, between <strong>200–250 words.</strong> <br/>
•	Each submission must clearly outline the <strong>research problem, objectives, methodology, key findings, and significance </strong>of the work.<br/>
•	Abstracts should be organized into the following sections: <strong>Background, Objectives, Methods, Results, and Conclusions.</strong><br/>
•	Please include <strong>3–5 keywords </strong>relevant to your research area.<br/>
•	All abstracts must be submitted <strong>hrough the online submission system via the Author Portal</strong> by the specified deadline.<br/>
•	Authors will be <strong>notified of acceptance within one week of submission.</strong>
`
    },
    paper: {
      title: 'Paper Submission Guidelines',
      content: `•	Full papers must be submitted in <strong>DOC/DOCX format</strong>, using a <strong>single-column layout</strong> that includes all figures, tables, and references.<br/>
•	Papers must strictly follow the <strong>EGEIMRC2026 Paper Template (Add Template Link)</strong> to ensure consistency.<br/>
•	The paper should clearly state the <strong>study topic, primary research findings and contributions</strong> of the work.<br/>
•	Submissions must be <strong>original and unpublished</strong>, and must not be under consideration for publication in another refereed conference or journal.<br/>
<strong>•	All types of academic papers are welcome, </strong>including <strong>original research articles, technical papers, review papers, case studies, conceptual papers and applied research studies </strong>.<br/>
•	Authors are required to ensure that their paper is <strong>thoroughly proofread </strong>before submission. All <strong>author names, institutional affiliations and email addresses</strong> must be accurate and up to date.<br/>
•	The <strong>corresponding author </strong>should be clearly identified in the manuscript.<br/>
•	Each paper must also include declarations for:<br/>
 &nbsp <strong>o	Conflict of Interest Statement </strong><br/>
&nbsp <strong>o	Data Availability Statement</strong><br/>
•	References should be properly cited within the paper; however, <strong>a separate bibliography section at the end should not be included</strong>, as references should be formatted according to the template.
`
    },
    poster: {
      title: 'Poster Submission Guidelines',
      content: `•	Posters must be prepared in <strong>A1 size format (594 x 841 mm)</strong> and may be designed in either <strong>portrait or landscape orientation</strong>.<br/>
•	Each poster should include the following elements: <strong>Title, Authors, Affiliations, Research Objectives, Methodology, Results, Conclusions and References.</strong><br/>
•	Use <strong>clear and legible fonts</strong>, with a minimum of <strong>24 pt for body text and 36 pt for headings</strong>, to ensure readability from a distance.<br/>
•	Posters must be submitted in <strong>DOC, DOCX, PDF or JPG format</strong>, accompanied by a <strong>200-word abstract</strong> outlining the work.<br/>
•	During the conference, <strong>poster sessions will feature dedicated time </strong>for authors to present and interact with attendees, peers, and judges.<br/>
•	Outstanding posters will be recognized through <strong>Best Poster Awards </strong>, highlighting excellence in research presentation and design.<br/>
`
    },
    review: {
      title: 'Peer Review Process',
      content: `All submissions to <strong>EGEIMRC2026</strong> undergo a <strong>rigorous double peer review process</strong> conducted by at least two independent reviewers with expertise in the relevant research area. Each paper is evaluated on its <strong>originality, methodology, significance, clarity and adherence to conference standards</strong>. Regardless of acceptance status, authors receive <strong>detailed and constructive feedback </strong>to help improve the quality of their work.<br/>
High-quality papers selected for publication will also be subject to an <strong>additional review by the respective journals</strong>, following their specific editorial and formatting guidelines. This double peer review process ensures that every accepted paper not only meets the standards of the conference but also aligns with the requirements of reputable indexed journals. By maintaining this rigorous evaluation system, EGEIMRC2026 upholds its commitment to <strong>academic excellence, research integrity, and the dissemination of impactful knowledge</strong>

<strong class="underline">Research Quality Standards (Currently Ok No Changes)

Plagiarism and AI Content Policy (Currently Ok No Changes)</strong>
`
    },
    quality: {
      title: 'Research Quality Standards',
      content: `All submissions must meet high standards of academic rigor and scientific validity. Research should demonstrate clear objectives, appropriate methodology, valid analysis, and meaningful conclusions. Studies should contribute novel insights to the field and be well-positioned within existing literature. Experimental work should include proper controls and statistical analysis where applicable. Theoretical work should be mathematically sound and logically consistent.`
    },
    plagiarism: {
      title: 'Plagiarism and AI Content Policy',
      content: `The conference maintains a strict anti-plagiarism policy. All submissions are screened using advanced plagiarism detection software. Any form of academic dishonesty, including self-plagiarism, will result in immediate rejection. Authors must properly cite all sources and clearly distinguish their contributions from existing work. AI-generated content must be clearly disclosed and used only as a tool, not as a substitute for original research and analysis.`
    },
    copyright: {
      title: 'Copyright & Author Rights',
      content: `At EGEIMRC2026, authors retain full copyright of their work while granting the conference non-exclusive rights to publish accepted papers in the selected journals. By submitting a paper, authors confirm that they hold the rights to the material, that it is original, and that it does not infringe upon any third-party intellectual property.<br/>
Published papers may also be made available through selected journals and indexing databases, ensuring greater visibility and academic recognition. In line with the conference’s open access policy, authors are encouraged to share their published work through institutional repositories, personal websites, and other academic platforms.<br/>
This approach ensures that authors maintain ownership of their intellectual contributions while benefiting from the global dissemination and impact that the conference provides.
`
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'>
      <div className='container mx-auto px-6 py-12'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='text-yellow-500'>Submission</span>
          </h1>
          <p className='text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed'>
            Guidelines and Requirements for EGEIMRC2026 Paper Submissions
          </p>
        </div>

        {/* Main Submission Guidelines */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12 shadow-2xl'>
          <div className='text-gray-800 leading-relaxed'>
            <p className='text-lg mb-6'>
              Prospective participants are invited to submit their abstracts by
              signing in to the Author Portal at{' '}
              <a
                href='http://vgw4k0og4cw48oww0k4sw400.31.97.71.226.sslip.io/login'
                target='_blank'
                className='text-blue-700 hover:underline font-semibold'
                rel='noopener noreferrer'
              >
                Author Portal Link
              </a>{' '}
              . Submissions should align with the overall conference theme and
              reflect one of the desired topics of interest listed in the Call
              for Papers. Each abstract must be clear, concise, and highlight
              the originality, relevance and potential impact of the research.
            </p>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <button className='bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg'>
                <Download className='w-5 h-5 mr-3' />
                Download Template
              </button>
              <a
                href='http://vgw4k0og4cw48oww0k4sw400.31.97.71.226.sslip.io/login'
                target='_blank'
                rel='noopener noreferrer'
              >
                <button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg h-full'>
                  <Send className='w-5 h-5 mr-3' />
                  Submit Your Paper Now
                </button>
              </a>
            </div>

            {/* Additional Information */}
            {/* <div className='bg-gray-50 rounded-xl p-6 space-y-4'>
              <p className='text-base'>
                When submitting a research paper, authors agree that if their work is accepted, they will submit a camera-ready version of the updated paper for inclusion in the final ICICT 2025 proceedings and will present the paper at the conference. By the time the camera-ready article is submitted for inclusion in the proceedings, each approved contribution must have one paid registration.
              </p>
              <p className='text-base'>
                The decision on the submitted manuscript will be sent to the authors via Email after the completion of review process. The acceptance ID given in the acceptance should be included in all the future conversations.
              </p>
              <p className='text-base'>
                Papers that are accepted will be allocated to a normal technical session. All articles will be subjected to a comprehensive, double-blind review procedure. In order to submit the final version, at least one author of an approved work must register for the conference. All accepted papers will be included in the conference proceedings and submitted to well reputed Journals for publishing consideration.
              </p>
            </div> */}
          </div>
        </div>

        {/* Interactive Policy Section */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl'>
          <div className='flex flex-col lg:flex-row min-h-[600px]'>
            {/* Sidebar Navigation */}
            <div className='lg:w-1/3 bg-white p-6 border-r border-gray-200'>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>
                Submission Policies and Guidelines
              </h3>
              <div className='space-y-2'>
                {policyItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActivePolicy(item.id)}
                    className={`w-full text-left p-4 rounded-lg font-medium transition-all duration-300 flex items-center ${
                      activePolicy === item.id
                        ? item.id === 'policies'
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
            <div className='lg:w-2/3 bg-gradient-to-r from-gray-800 to-gray-900'>
              <div className='p-8 md:p-12 h-full'>
                <h2 className='text-3xl md:text-4xl font-bold text-yellow-400 mb-6'>
                  {policyContent[activePolicy]?.title}
                </h2>
                <div className='text-white/90 text-lg leading-relaxed space-y-4'>
                  <p
                    className='text-white/90 text-lg text-justify leading-relaxed'
                    dangerouslySetInnerHTML={{
                      __html: policyContent[activePolicy]?.content
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Dates & Contact */}
        <div className='grid grid-cols-1 md:grid-cols-1 gap-8 mt-12'>
          {/* Key Dates */}
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white'>
            <div className='flex items-center mb-6'>
              <Calendar className='w-8 h-8 mr-4 text-yellow-300' />
              <h3 className='text-2xl font-bold'>Important Dates</h3>
            </div>
            <div className='space-y-4'>
              <div className='flex justify-between items-center border-b border-white/20 pb-2'>
                <span>Paper Submission Deadline:</span>
                <span className='font-bold text-yellow-300'>
                  October 31, 2025
                </span>
              </div>
              <div className='flex justify-between items-center border-b border-white/20 pb-2'>
                <span>Notification of Acceptance:</span>
                <span className='font-bold text-yellow-300'>
                  November 10, 2025
                </span>
              </div>
              <div className='flex justify-between items-center border-b border-white/20 pb-2'>
                <span>Camera-Ready Submission:</span>
                <span className='font-bold text-yellow-300'>November 15, 2025</span>
              </div>
              <div className='flex justify-between items-center'>
                <span>Conference Dates:</span>
                <span className='font-bold text-yellow-300'>
                  November 21-23, 2025
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          {/* <div className='bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-8 text-white'>
            <div className='flex items-center mb-6'>
              <Mail className='w-8 h-8 mr-4 text-yellow-300' />
              <h3 className='text-2xl font-bold'>Submission Contact</h3>
            </div>
            <div className='space-y-4'>
              <div>
                <div className='font-semibold text-yellow-300 mb-2'>
                  Submission Email:
                </div>
                <div className='text-lg'>icict.conf@gmail.com</div>
              </div>
              <div>
                <div className='font-semibold text-yellow-300 mb-2'>
                  Technical Support:
                </div>
                <div className='text-lg'>support@egeimrc2025.org</div>
              </div>
              <div>
                <div className='font-semibold text-yellow-300 mb-2'>
                  Conference Inquiries:
                </div>
                <div className='text-lg'>info@egeimrc2025.org</div>
              </div>
              <div>
                <div className='font-semibold text-yellow-300 mb-2'>
                  Response Time:
                </div>
                <div className='text-lg'>24-48 hours</div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Submission Checklist */}
        {/* <div className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mt-12 shadow-2xl'>
          <h3 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
            Submission Checklist
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>
                  Paper follows IEEE template format
                </span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>
                  Maximum 8 pages including references
                </span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>
                  Original and unpublished work
                </span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>
                  Clear research contributions stated
                </span>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>
                  Proper citations and references
                </span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>
                  Ethical guidelines followed
                </span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>
                  All authors properly credited
                </span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>
                  Contact information included
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default SubmissionPage
