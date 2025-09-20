import { 
  BookOpen, 
  Award, 
  Globe, 
  FileText, 
  CheckCircle
} from 'lucide-react'

const PublicationsPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'>
      <div className='container mx-auto px-6 py-12'>
        
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 text-yellow-500'>
            Publications & Academic Recognition
          </h1>
        </div>

        {/* Submit to Conference Proceedings Section */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl'>
          
          {/* Section Header */}
          <div className='bg-gradient-to-r from-blue-600 to-blue-800 p-6 border-b-4 border-blue-700'>
            <h2 className='text-2xl md:text-3xl font-bold text-white'>
              Publication Opportunities
            </h2>
          </div>

          {/* Content */}
          <div className='p-8 md:p-12'>
            <p className='text-gray-800 text-lg leading-relaxed mb-8'>
              EGEIMRC2026 offers authors the opportunity to publish high-quality research in peer-reviewed conference proceedings and selected indexed journals. All accepted high quality papers will be reviewed for originality, relevance and scholarly value, with eligible submissions considered for Scopus-indexed, ISI, or partner journal publication. Your research deserves global visibility, let your work make a lasting impact beyond the conference.
            </p>

            {/* Indexing Databases */}
            <div className='border-t-2 border-b-2 border-gray-800 py-8'>
              <div className='flex items-center justify-center gap-12 flex-wrap'>
                
                {/* IEEE Xplore */}
                <div className='text-center'>
                  <img className='w-72' src="/public/assets/EGE_logo.png" alt="" srcset="" />
                  
                </div>

                {/* Scopus */}
                <div className='text-center'>
                  <div className='text-4xl md:text-5xl font-bold mb-2'>
                    <span className='text-orange-500'>Scopus</span>
                    <span className='text-orange-500 text-2xl'>®</span>
                  </div>
                </div>

                {/* Second IEEE Xplore */}
                <div className='text-center'>
                  <div className='text-4xl md:text-5xl font-bold mb-2'>
                    <span className='text-blue-600'>IEEE </span>
                    <span className='text-blue-800 italic'>Xplore</span>
                    <span className='text-blue-600 text-2xl'>®</span>
                  </div>
                  <div className='text-orange-500 text-sm font-semibold'>Digital Library</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='text-center mt-12'>
          <button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-12 py-6 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl'>
            <FileText className='w-6 h-6 inline-block mr-3' />
            Submit Your Paper
          </button>
          <p className='text-white/80 mt-4 text-lg'>
            Join the global research community at EGEIMRC2026
          </p>
        </div>

      </div>
    </div>
  )
}

export default PublicationsPage