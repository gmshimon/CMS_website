import { useState } from 'react'
import SelectConference from '../../../../Component/SelectConference/SelectConference'
import PresenterInformation from '../../../../Component/PresenterInformation/PresenterInformation'
import AbstractInformation from '../../../../Component/AbstractInformation/AbstractInformation'
import AuthorInformation from '../../../../Component/AuthorInformation/AuthorInformation'
import ConferenceRegistration from '../../../../Component/ConferenceRegistration/ConferenceRegistration'
import { useSelector } from 'react-redux'
import Loading from '../../../../Component/Loading/Loading'
import useAbstract from '../../../../Hooks/useAbstract'
import { Step, Stepper } from 'react-form-stepper'

const steps = [
  'Select Conference',
  'Abstract Information',
  'Presenter Information',
  'Author',
  'Conference Registration'
]

const AddAbstract = () => {
  const { getConferenceLoading } = useSelector(state => state.conference)
  const [activeStep, setActiveStep] = useState(['Select Conference'])
  const [currentConference, setCurrentConference] = useState(null)
  useAbstract({ currentConference })

  const currentStepKey = activeStep[activeStep.length - 1] || steps[0]
  const currentStepIndex = Math.max(
    steps.findIndex(step => step === currentStepKey),
    0
  )

  // useEffect(() => {
  //   if (sessionStorage.getItem('activeStep')) {
  //     const savedSteps = JSON.parse(sessionStorage.getItem('activeStep'))
  //     setActiveStep(savedSteps.length ? savedSteps : ['Select Conference'])
  //   }
  // }, [])
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
          <div className='bg-white mx-auto md:max-w-7xl p-2 rounded-lg shadow-lg'>
            <Stepper
              activeStep={currentStepIndex}
              className='w-full overflow-x-auto'
              connectorStateColors={true}
              connectorStyleConfig={{
                activeColor:'#2103B8FF',
                completedColor:"#2103B8FF",
                size: 4
              }}
              styleConfig={{
                activeBgColor:'#401DEDFF',
                completedBgColor:'#401DEDFF'
              }}
            >
              {steps.map(step => (
                <Step  label={step} />
              ))}
            </Stepper>
          </div>
          <div className='bg-white md:max-w-7xl mx-auto rounded-lg shadow-lg mt-2 p-3'>
            {activeStep[activeStep.length - 1] == 'Select Conference' && (
              <div>
                <SelectConference
                  setCurrentConference={setCurrentConference}
                  setActiveStep={setActiveStep}
                  activeStep={activeStep}
                />
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
