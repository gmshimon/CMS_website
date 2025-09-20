import {
  CreditCard,
  QrCode,
  CheckCircle,
  AlertTriangle,
  Users,
  Shield
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const RegistrationDetailsPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('qr')
  const navigate = useNavigate()
  const registrationFees = [
    {
      category: 'Paper',
      modes: [
        { type: 'Physical', early: 150, normal: 175, attendee: 70 },
        { type: 'Online', early: 100, normal: 150, attendee: 50 }
      ]
    },
    {
      category: 'Poster',
      modes: [
        { type: 'Physical', early: 150, normal: 175, attendee: 70 },
        { type: 'Online', early: 100, normal: 150, attendee: 50 }
      ]
    }
  ]

  const registrationIncludes = [
    'Conference proceedings',
    'E-certificates',
    'Access to all parallel sessions',
    'Selected workshops for participants',
    'Gala dinner'
  ]

  const registrationExcludes = [
    'Accommodation',
    'Visa Application Fee',
    'Transportation Fare'
  ]

  const paymentMethods = [
    {
      id: 'qr',
      title: 'METHOD 1: QR CODE PAYMENT',
      subtitle: 'FOR ALL PARTICIPANTS',
      description:
        'Payment can be made easily by scanning the official conference bank QR codes provided. Please follow the steps below carefully to ensure smooth processing of your registration:',
      steps: [
        'Scan the QR code provided using your preferred banking app.',
        'Complete the payment securely through your app',
        'Save and rename the bank receipt using your assigned Abstract ID (e.g., EGEIMRC2027-001.pdf).',
        'Upload the “Proof of Payment” (receipt file) to the Author Portal.',
        'A payment confirmation email will be sent to the registered author within 5 working days after verification',
        'Please note that all payments are strictly non-refundable.'
      ]
    },
    {
      id: 'transfer',
      title: 'METHOD 2: BANK TRANSFER',
      subtitle: 'FOR ALL PARTICIPANTS',
      description:
        'Payment should be made via online transfer to the following account:',
      steps: [
        'Use the bank details provided above to complete your transfer.',
        'Enter your Paper ID in the reference/remarks field (e.g., EGEIMRC2026-001).',
        'Save and rename your transaction receipt using your Paper ID.',
        'Upload the receipt to the Author Portal.',
        'A payment confirmation email will be sent within 5 working days after verification.',
        'Please note that all payments are strictly non-refundable.'
      ]
    },
    {
      id: 'paypal',
      title: 'METHOD 3: PAYPAL',
      subtitle: 'RECOMMENDED FOR INTERNATIONAL PARTICIPANTS',
      description:
        'Pay your registration fee securely with PayPal in USD. Include your Paper ID in the payment note so we can match your payment quickly.',
      steps: [
        'Click the PayPal button (or open paypal.com) and log in to your account',
        'Send the exact registration amount (in USD) to the designated PayPal account',
        'Add your Paper ID and “EGEIMRC2025” in the payment note',
        'Save your PayPal receipt as a PDF with your Paper ID in the filename (e.g., ICEESS01.pdf)',
        'Upload the receipt to the Author Portal',
        'Watch your email for confirmation within 5 business days'
      ]
    }
  ]

  const bankDetails = [
  {
    bank: 'HSBC Bank Malaysia Berhad',
    details: [
      { field: 'Account Number', value: '4617 7290 2181 0495' },
      { field: 'Account Holder Name', value: 'Dr Syed Hamid Hussain Madni' },
      { field: 'Swift Code', value: 'HMABMYKL' },
      { field: 'Remarks/Reference', value: 'Your Paper ID + EGEIMRC2026' }
    ]
  },
  {
    bank: 'United Bank Limited (UBL Bank)',
    details: [
      { field: 'Account Number', value: '1488336162003' },
      { field: 'Account Holder Name', value: 'Elite Global Excellence' },
      { field: 'IBAN CODE', value: 'PK78UNIL0109000336162003' },
      { field: 'Swift Code', value: 'UNILPKKA741' },
      { field: 'Remarks/Reference', value: 'Your Paper ID + EGEIMRC2026' }
    ]
  }
]


  const handlePayWithPayPal = () => {
    // Replace with your PayPal.Me or hosted checkout link
    window.open('https://www.paypal.com/', '_blank')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'>
      <div className='container mx-auto px-6 py-12'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6'>
            <span className='text-yellow-500'>Registration Fees</span>
          </h1>
          <p className='text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed'>
            Secure your participation in EGEIMRC2026 with our flexible
            registration options
          </p>
        </div>

        {/* Registration Fees Table */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl mb-12'>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-gradient-to-r from-blue-600 to-blue-800 text-white'>
                  <th className='px-6 py-4 text-left font-bold text-yellow-300'>
                    Categories
                  </th>
                  <th className='px-6 py-4 text-center font-bold text-yellow-300'>
                    Mode
                  </th>
                  <th className='px-6 py-4 text-center font-bold text-yellow-300'>
                    Early Registration
                  </th>
                  <th className='px-6 py-4 text-center font-bold text-yellow-300'>
                    Normal Registration
                  </th>
                  <th className='px-6 py-4 text-center font-bold text-yellow-300'>
                    Attendee Registration
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrationFees.map((category, categoryIndex) =>
                  category.modes.map((mode, modeIndex) => (
                    <tr
                      key={`${categoryIndex}-${modeIndex}`}
                      className={`${
                        modeIndex % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'
                      } hover:bg-blue-200 transition-colors`}
                    >
                      {modeIndex === 0 && (
                        <td
                          className={`px-6 py-4 font-bold text-yellow-600 text-xl bg-blue-600 text-white`}
                          rowSpan={category.modes.length}
                        >
                          {category.category}
                        </td>
                      )}
                      <td className='px-6 py-4 font-semibold text-blue-800 bg-blue-700  text-center'>
                        {mode.type}
                      </td>
                      <td className='px-6 py-4 text-center font-bold text-2xl text-green-600'>
                        ${mode.early}
                      </td>
                      <td className='px-6 py-4 text-center font-bold text-2xl text-orange-600'>
                        ${mode.normal}
                      </td>
                      <td className='px-6 py-4 text-center font-bold text-2xl text-blue-600'>
                        ${mode.attendee}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Author Rights Statement */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-2xl'>
          <p className='text-lg text-gray-800 text-center leading-relaxed'>
            At EGEIMRC2026, we are committed to breaking financial barriers by
            providing one of the most competitive pricing structures worldwide
            ensuring that researchers from every corner of the globe can
            participate and share their work.
          </p>
        </div>

        {/* Payment Methods */}
        <div className='space-y-8 mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-center text-yellow-500 mb-8'>
            Payment Procedure
          </h2>

          {/* Payment Method Selector */}
          <div className='flex flex-col sm:flex-row justify-center gap-4 mb-8'>
            {paymentMethods.map(method => (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                  selectedPaymentMethod === method.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg transform scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {method.id === 'qr'
                  ? 'QR Code Payment'
                  : method.id === 'transfer'
                  ? 'Bank Transfer'
                  : 'PayPal'}
              </button>
            ))}
          </div>

          {/* Payment Method Content */}
          {paymentMethods.map(
            method =>
              selectedPaymentMethod === method.id && (
                <div
                  key={method.id}
                  className='bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl'
                >
                  <div className='bg-gradient-to-r from-yellow-500 to-orange-500 p-6'>
                    <h3 className='text-2xl font-bold text-white mb-2'>
                      {method.title}
                    </h3>
                    <p className='text-yellow-100 font-semibold'>
                      {method.subtitle}
                    </p>
                  </div>

                  <div className='p-8 md:p-12'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
                      {/* Payment Instructions */}
                      <div>
                        <p className='text-gray-800 text-lg mb-6 leading-relaxed'>
                          {method.description}
                        </p>

                        {method.id === 'transfer' && (
                          <div className='bg-gray-50 rounded-xl p-6 mb-6'>
                            <h4 className='text-xl font-bold text-gray-800 mb-4'>
                              Bank Details
                            </h4>
                            <div className="space-y-8">
  {bankDetails.map((bank, bankIndex) => (
    <div key={bankIndex} className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
        {bank.bank}
      </h3>
      {bank.details.map((detail, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b border-gray-200 pb-2"
        >
          <span className="font-semibold text-gray-700">
            {detail.field}:
          </span>
          <span className="text-gray-800 font-mono">{detail.value}</span>
        </div>
      ))}
    </div>
  ))}
</div>
                          </div>
                        )}

                        {method.id === 'paypal' && (
                          <div className='bg-blue-50 rounded-xl p-6 mb-6'>
                            <h4 className='text-xl font-bold text-gray-800 mb-2 flex items-center'>
                              <CreditCard className='w-5 h-5 mr-2 text-blue-700' />{' '}
                              PayPal Notes
                            </h4>
                            <ul className='space-y-2 text-gray-700 list-disc pl-6'>
                              <li>
                                Currency: USD (unless your confirmation
                                instructs differently).
                              </li>
                              <li>
                                Fees: Any PayPal transaction fees are borne by
                                the sender; ensure the exact net amount reaches
                                us.
                              </li>
                              <li>
                                Reference: Always include your{' '}
                                <span className='font-semibold'>Paper ID</span>{' '}
                                and the text{' '}
                                <span className='font-semibold'>
                                  EGEIMRC2026
                                </span>
                                .
                              </li>
                            </ul>
                          </div>
                        )}

                        <div className='space-y-3'>
                          <h4 className='text-xl font-bold text-gray-800'>
                            Payment Steps:
                          </h4>
                          {method.steps.map((step, index) => (
                            <div key={index} className='flex items-start'>
                              <span className='bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0'>
                                {index + 1}
                              </span>
                              <span className='text-gray-700'>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right column visuals */}
                      <div className='flex justify-center'>
                        {method.id === 'qr' && (
                          <div className='bg-gradient-to-b from-pink-500 to-red-600 p-6 rounded-2xl shadow-xl'>
                            <div className='bg-white p-2 rounded-xl '>
                              <div className='w-72 h-full bg-gray-200 rounded-lg flex items-center justify-center'>
                                <img src="/public/qr-code.jpg"/>
                              </div>
                              <div className='text-center  text-md text-gray-600'>
                                <p className='font-bold'>Dr Syed Hamid Hussain Madni</p>
                                {/* <p>ICGESD PUO 2025</p> */}
                              </div>
                            </div>
                            <div className='text-center text-white font-bold'>
                              <p>MALAYSIA NATIONAL QR</p>
                            </div>
                            <div className='text-center text-white text-sm mt-2'>
                              <p>
                                Accepted by participating Banks and e-Wallets
                              </p>
                              <div className='flex justify-center mt-2'>
                                <div className='bg-white px-3 py-1 rounded text-gray-800 text-xs font-bold'>
                                  HSBC Bank Malaysia Berhad
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {method.id === 'transfer' && (
                          <div className='bg-gradient-to-b from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-xl text-white w-full max-w-md'>
                            <div className='bg-white/10 rounded-xl p-4'>
                              <p className='text-sm opacity-90'>
                                Ensure the{' '}
                                <span className='font-semibold'>Paper ID</span>{' '}
                                appears in your bank transfer reference to avoid
                                delays.
                              </p>
                            </div>
                            <div className='mt-4 flex items-center justify-center gap-2 text-sm opacity-90'>
                              <Shield className='w-4 h-4' />
                              Protected by your bank’s security
                            </div>
                          </div>
                        )}

                        {method.id === 'paypal' && (
                          <div className='bg-gradient-to-b from-cyan-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white w-full max-w-md'>
                            <div className='bg-white rounded-xl p-5 text-center'>
                              <div className='mx-auto mb-3 inline-flex items-center justify-center rounded-full p-3 bg-blue-100'>
                                <CreditCard className='w-7 h-7 text-blue-700' />
                              </div>
                              <h5 className='text-lg font-bold text-gray-900'>
                                Pay with PayPal
                              </h5>
                              <p className='text-gray-600 text-sm mt-1'>
                                Fast, secure, and widely accepted
                              </p>
                              <button
                                onClick={handlePayWithPayPal}
                                className='mt-4 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 shadow-lg transition'
                              >
                                Continue to PayPal
                              </button>
                              <p className='text-[12px] text-gray-500 mt-3'>
                                You will be redirected to paypal.com
                              </p>
                            </div>
                            <div className='mt-4 flex items-center justify-center gap-2 text-sm opacity-90'>
                              <Shield className='w-4 h-4' />
                              Buyer protection by PayPal may apply
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>

        {/* Registration Details and Guidelines */}
        <div className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl mb-12'>
          <h3 className='text-3xl font-bold text-gray-800 mb-8 border-b-4 border-blue-600 pb-4'>
            Registration Fee Details and Guidelines
          </h3>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
            {/* What's Included */}
            <div>
              <h4 className='text-xl font-bold text-gray-800 mb-4 flex items-center'>
                <CheckCircle className='w-6 h-6 text-green-500 mr-3' />
                Registration Fee Includes:
              </h4>
              <ul className='space-y-2'>
                {registrationIncludes.map((item, index) => (
                  <li key={index} className='flex items-center'>
                    <CheckCircle className='w-4 h-4 text-green-500 mr-3 flex-shrink-0' />
                    <span className='text-gray-700'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's Not Included */}
            <div>
              <h4 className='text-xl font-bold text-gray-800 mb-4 flex items-center'>
                <AlertTriangle className='w-6 h-6 text-red-500 mr-3' />
                Registration Fee Does NOT Include:
              </h4>
              <ul className='space-y-2'>
                {registrationExcludes.map((item, index) => (
                  <li key={index} className='flex items-center'>
                    <AlertTriangle className='w-4 h-4 text-red-500 mr-3 flex-shrink-0' />
                    <span className='text-gray-700'>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Important Guidelines */}
          <div className='bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl'>
            <h4 className='text-xl font-bold text-gray-800 mb-4'>
              Important Guidelines:
            </h4>
            <div className='space-y-3 text-gray-700'>
              <p>
                • Registration is only confirmed when full payment is received.
              </p>
              <p>
                • The conference fee doesn't include publication fees for SCOPUS
                / ISI / HEC indexed journals. Separate Invoice will be sent to
                the authors for article processing charges of selected specific
                journals.
              </p>
              <p>
                • For each accepted paper, at least one author must register
                before the registration deadline.
              </p>
              <p>
                • Completed registrations will be acknowledged by the Organizing
                Committee within 2-5 workdays after receiving your payment.
              </p>
              <p>
                • If you cannot attend the conference due to some reasons, we
                will email the proceedings to you together with the payment
                receipt/invoice.
              </p>
              <p>
                • If an author or co-author is NOT available to present the
                paper at the conference, the Technical Program Committee Chair
                can grant permission in some extreme cases to have the paper
                presented by a qualified substitute presenter.
              </p>
              <p>
                • Registered members must upload their payment receipt
                immediately via Author portal.
              </p>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <section
          id='terms'
          className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl mb-12'
        >
          <h3 className='text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 pb-4'>
            Terms & Conditions
          </h3>
          <ul className='list-disc pl-6 space-y-2 text-gray-700'>
            <li>
              All fees are quoted in USD unless otherwise specified and are
              non-refundable.
            </li>
            <li>
              Registration is confirmed only after full payment is received and
              verified by the Organizing Committee.
            </li>
            <li>
              At least one author of each accepted paper must register before
              the deadline to be included in the program.
            </li>
            <li>
              Program changes may occur without prior notice; significant
              updates will be communicated via email.
            </li>
            <li>
              By registering, participants agree to abide by the conference code
              of conduct and venue policies.
            </li>
            <li>
              Substitution of presenting author requires prior written approval
              from the Technical Program Chair.
            </li>
          </ul>
        </section>

        {/* Privacy Policy */}
        <section
          id='privacy'
          className='bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl mb-12'
        >
          <h3 className='text-3xl font-bold text-gray-800 mb-6 border-b-4 border-blue-600 pb-4'>
            Privacy Policy
          </h3>
          <p className='text-gray-700 mb-4'>
            We respect your privacy. The information you provide during
            registration is used solely for conference administration,
            communication, billing, and publishing purposes related to
            EGEIMRC2026.
          </p>
          <ul className='list-disc pl-6 space-y-2 text-gray-700'>
            <li>
              Data collected may include your name, affiliation, contact
              details, and billing information.
            </li>
            <li>
              Payment details are processed by secure third-party providers
              (e.g., banks, PayPal); we do not store full card credentials.
            </li>
            <li>
              We may share minimal data with session chairs and publishers
              strictly for operational needs.
            </li>
            <li>
              You may request correction or deletion of your data where legally
              permissible by contacting the Organizing Committee.
            </li>
            <li>
              We employ reasonable technical and organizational safeguards to
              protect your information.
            </li>
          </ul>
        </section>

        {/* Registration Action */}
        <div className='text-center'>
          <button
            onClick={() => navigate('/register')}
            className='bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold px-12 py-6 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl'
          >
            <Users className='w-6 h-6 inline-block mr-3' />
            Register Now for EGEIMRC2026
          </button>
          <p className='text-white/80 mt-4 text-lg'>
            Secure your spot at the premier international research conference
          </p>
          <div className='mt-3 text-white/70 text-sm'>
            <a
              href='#terms'
              className='underline decoration-yellow-400 underline-offset-4 mr-4'
            >
              Terms & Conditions
            </a>
            <a
              href='#privacy'
              className='underline decoration-yellow-400 underline-offset-4'
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationDetailsPage
