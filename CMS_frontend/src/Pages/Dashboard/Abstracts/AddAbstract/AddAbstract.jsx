import { useEffect, useState } from 'react'
import SelectConference from '../../../../Component/SelectConference/SelectConference'
import PresenterInformation from '../../../../Component/PresenterInformation/PresenterInformation'
import AbstractInformation from '../../../../Component/AbstractInformation/AbstractInformation'
import AuthorInformation from '../../../../Component/AuthorInformation/AuthorInformation'
import ConferenceRegistration from '../../../../Component/ConferenceRegistration/ConferenceRegistration'
import { useSelector } from 'react-redux'
import Loading from '../../../../Component/Loading/Loading'
import useAbstract from '../../../../Hooks/useAbstract'

const steps = [
  'Select Conference',
  'Abstract Information',
  'Presenter Information',
  'Author',
  'Conference Registration'
]

const AddAbstract = () => {
  const { getConferenceLoading} = useSelector(state => state.conference)
  const [activeStep, setActiveStep] = useState([])
  useAbstract()
 

  useEffect(() => {
    if (sessionStorage.getItem('activeStep')) {
      const activeStep = JSON.parse(sessionStorage.getItem('activeStep'))
      setActiveStep(activeStep)
    }
  }, [])
  return (
    <section className='md:p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-[calc(100vh-64px)]'>
      {getConferenceLoading ? (
        <div className='flex justify-center items-center h-[calc(100vh-120px)]'>
          <Loading />
        </div>
      ) : (
        <div>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>
            Abstract Submission
          </h2>
          <div className='bg-white mx-auto md:max-w-7xl p-1 rounded-lg shadow-lg'>
            <ul className='steps w-full'>
              {steps.map((step, index) => (
                <li
                  key={index}
                  className={`step ${
                    activeStep.indexOf(step) !== -1 ? 'step-primary' : ''
                  }`}
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <div className='bg-white md:max-w-7xl  mx-auto rounded-lg shadow-lg mt-2 p-3'>
            {activeStep[activeStep.length - 1] == 'Select Conference' && (
              <div>
                <SelectConference />
                <button
                  onClick={() => {
                    setActiveStep([...activeStep, 'Abstract Information'])
                    sessionStorage.setItem(
                      'activeStep',
                      JSON.stringify([...activeStep, 'Abstract Information'])
                    )
                  }}
                  className='mt-4 px-6 py-3 text-white font-bold btn btn-sm btn-active btn-primary'
                >
                  Next
                </button>
              </div>
            )}
            {activeStep[activeStep.length - 1] == 'Abstract Information' && (
              <div>
                <AbstractInformation
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              </div>
            )}
            {activeStep[activeStep.length - 1] == 'Presenter Information' && (
              <div>
                <PresenterInformation
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              </div>
            )}
            {activeStep[activeStep.length - 1] == 'Author' && (
              <div>
                <AuthorInformation
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              </div>
            )}
            {activeStep[activeStep.length - 1] == 'Conference Registration' && (
              <div>
                <ConferenceRegistration
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default AddAbstract
