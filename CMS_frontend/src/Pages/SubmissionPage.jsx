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
      title: "Standard Conference Policies",
      content: `To ensure a high-quality, ethical, and inclusive academic experience, EGEIMRC2025 follows a set of standard policies that all participants—authors, presenters, reviewers, attendees, and organizers—are expected to adhere to. These policies help uphold the integrity of the conference and maintain a professional environment for global knowledge sharing.

Originality & Authorship: All submissions must be original and unpublished. Papers and posters must not be under review or submitted to another conference or journal at the time of submission. All contributors must be properly credited, and honorary or ghost authorship is strictly prohibited.

Ethical Research Standards: All research involving human or animal participants must follow appropriate ethical guidelines. Any study using sensitive data or personal information must comply with data protection and privacy standards (e.g., GDPR or equivalent national regulations).

Respectful Participation: All participants are expected to behave respectfully and professionally. Harassment, discrimination, or disruptive conduct will not be tolerated. The conference maintains a zero-tolerance policy toward unethical or inappropriate behavior.`
    },
    abstract: {
      title: "Abstract Submission Guidelines",
      content: `Abstract submissions should be between 250-300 words and clearly outline the research problem, methodology, key findings, and significance of the work. All abstracts must be submitted through the online submission system by the specified deadline. Include 3-5 keywords relevant to your research area. The abstract should be structured with clear sections: background, objectives, methods, results, and conclusions. Authors will be notified of acceptance within 4 weeks of submission.`
    },
    paper: {
      title: "Paper Submission Guidelines", 
      content: `Full papers must be submitted in DOC/DOCX/PDF format with a maximum of 8 pages in double column format, including all figures, tables, and references. Papers must adhere to the standard IEEE template, and no bibliography should be included at the conclusion. The study topic, primary research findings, and contributions should be clearly stated in the article. Only research articles that have neither appeared elsewhere for publication nor are under review for another refereed conference publication will be considered.`
    },
    poster: {
      title: "Poster Submission Guidelines",
      content: `Poster presentations should follow A1 size format (594 x 841 mm) in portrait orientation. Include title, authors, affiliations, research objectives, methodology, results, conclusions, and references. Use clear, readable fonts (minimum 24pt for body text, 36pt for headings). Submit a PDF version of your poster along with a 200-word abstract. Poster sessions will include dedicated time for interaction with conference attendees and judges for best poster awards.`
    },
    review: {
      title: "Peer Review Process",
      content: `All submissions undergo a rigorous double-blind peer review process conducted by at least two independent reviewers. Reviewers are selected based on their expertise in the relevant research area. The review process evaluates originality, methodology, significance, clarity, and adherence to conference standards. Authors receive detailed feedback regardless of acceptance status. The review timeline is typically 6-8 weeks from submission deadline.`
    },
    quality: {
      title: "Research Quality Standards",
      content: `All submissions must meet high standards of academic rigor and scientific validity. Research should demonstrate clear objectives, appropriate methodology, valid analysis, and meaningful conclusions. Studies should contribute novel insights to the field and be well-positioned within existing literature. Experimental work should include proper controls and statistical analysis where applicable. Theoretical work should be mathematically sound and logically consistent.`
    },
    plagiarism: {
      title: "Plagiarism and AI Content Policy",
      content: `The conference maintains a strict anti-plagiarism policy. All submissions are screened using advanced plagiarism detection software. Any form of academic dishonesty, including self-plagiarism, will result in immediate rejection. Authors must properly cite all sources and clearly distinguish their contributions from existing work. AI-generated content must be clearly disclosed and used only as a tool, not as a substitute for original research and analysis.`
    },
    copyright: {
      title: "Copyright & Author Rights",
      content: `Authors retain copyright of their work while granting the conference non-exclusive rights for publication in proceedings. By submitting, authors confirm they have the right to publish the material and that it doesn't infringe on third-party rights. Published papers will be available through IEEE Xplore and other indexing databases. Authors are encouraged to share their work through institutional repositories following the conference's open access policies.`
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
            Guidelines and Requirements for EGEIMRC2025 Paper Submissions
          </p>
        </div>

        {/* Main Submission Guidelines */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12 shadow-2xl'>
          <div className='text-gray-800 leading-relaxed'>
            <p className='text-lg mb-6'>
              Prospective contributors are invited to submit full papers in DOC / DOCX / PDF format, with a maximum page length of 8 pages in double column by including all the figures, tables, and references to <span className='font-semibold text-blue-600'>icict.conf@gmail.com</span>. The paper must adhere to the standard IEEE paper template, and no bibliography should be included at the conclusion. Papers that are not in accordance with the IEEE template by including appropriate reference/citation, or that exceed the page limit will not be processed to the next stage. Nevertheless, only the research articles that have neither appeared elsewhere for publication, nor are under review for another refereed conference publication will be considered. The study topic, primary research findings, and contributions should be clearly stated in the article.
            </p>
            
            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
              <button className='bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg'>
                <Download className='w-5 h-5 mr-3' />
                Download Template
              </button>
              <button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg'>
                <Send className='w-5 h-5 mr-3' />
                Submit Your Paper Now
              </button>
            </div>

            {/* Additional Information */}
            <div className='bg-gray-50 rounded-xl p-6 space-y-4'>
              <p className='text-base'>
                When submitting a research paper, authors agree that if their work is accepted, they will submit a camera-ready version of the updated paper for inclusion in the final ICICT 2025 proceedings and will present the paper at the conference. By the time the camera-ready article is submitted for inclusion in the proceedings, each approved contribution must have one paid registration.
              </p>
              <p className='text-base'>
                The decision on the submitted manuscript will be sent to the authors via Email after the completion of review process. The acceptance ID given in the acceptance should be included in all the future conversations.
              </p>
              <p className='text-base'>
                Papers that are accepted will be allocated to a normal technical session. All articles will be subjected to a comprehensive, double-blind review procedure. In order to submit the final version, at least one author of an approved work must register for the conference. All accepted papers will be included in the conference proceedings and submitted to well reputed Journals for publishing consideration.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Policy Section */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl'>
          <div className='flex flex-col lg:flex-row min-h-[600px]'>
            
            {/* Sidebar Navigation */}
            <div className='lg:w-1/3 bg-white p-6 border-r border-gray-200'>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>Submission Policies</h3>
              <div className='space-y-2'>
                {policyItems.map((item) => (
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
                  {policyContent[activePolicy]?.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Dates & Contact */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-12'>
          
          {/* Key Dates */}
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white'>
            <div className='flex items-center mb-6'>
              <Calendar className='w-8 h-8 mr-4 text-yellow-300' />
              <h3 className='text-2xl font-bold'>Important Dates</h3>
            </div>
            <div className='space-y-4'>
              <div className='flex justify-between items-center border-b border-white/20 pb-2'>
                <span>Paper Submission Deadline:</span>
                <span className='font-bold text-yellow-300'>March 15, 2025</span>
              </div>
              <div className='flex justify-between items-center border-b border-white/20 pb-2'>
                <span>Notification of Acceptance:</span>
                <span className='font-bold text-yellow-300'>April 30, 2025</span>
              </div>
              <div className='flex justify-between items-center border-b border-white/20 pb-2'>
                <span>Camera-Ready Submission:</span>
                <span className='font-bold text-yellow-300'>May 15, 2025</span>
              </div>
              <div className='flex justify-between items-center'>
                <span>Conference Dates:</span>
                <span className='font-bold text-yellow-300'>June 20-22, 2025</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className='bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-8 text-white'>
            <div className='flex items-center mb-6'>
              <Mail className='w-8 h-8 mr-4 text-yellow-300' />
              <h3 className='text-2xl font-bold'>Submission Contact</h3>
            </div>
            <div className='space-y-4'>
              <div>
                <div className='font-semibold text-yellow-300 mb-2'>Submission Email:</div>
                <div className='text-lg'>icict.conf@gmail.com</div>
              </div>
              <div>
                <div className='font-semibold text-yellow-300 mb-2'>Technical Support:</div>
                <div className='text-lg'>support@egeimrc2025.org</div>
              </div>
              <div>
                <div className='font-semibold text-yellow-300 mb-2'>Conference Inquiries:</div>
                <div className='text-lg'>info@egeimrc2025.org</div>
              </div>
              <div>
                <div className='font-semibold text-yellow-300 mb-2'>Response Time:</div>
                <div className='text-lg'>24-48 hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Checklist */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mt-12 shadow-2xl'>
          <h3 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Submission Checklist</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>Paper follows IEEE template format</span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>Maximum 8 pages including references</span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>Original and unpublished work</span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>Clear research contributions stated</span>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>Proper citations and references</span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>Ethical guidelines followed</span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>All authors properly credited</span>
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-4 flex-shrink-0' />
                <span className='text-gray-700'>Contact information included</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SubmissionPage