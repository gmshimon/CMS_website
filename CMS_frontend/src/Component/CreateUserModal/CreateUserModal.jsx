import { useState } from 'react'
import { useSelector } from 'react-redux'

const CreateUserModal = ({ isOpen, onClose, onSubmit, selectedRole }) => {
  const { conferences } = useSelector(state => state.conference)
  const [form, setForm] = useState({
    role: selectedRole,
    conference: '',
    name: '',
    title: '',
    email: '',
    address: '',
    country: '',
    affiliation: '',
    faculty: '',
    position: '',
    domain: '',
    contact: '',
    orcid: '',
    chair_bio: '',
    talk_title: '',
    talk_abstract: '',
    speaker_bio: '',
    committeeName: null,
    bio: '',
    imageFile: null
  })

  const [errors, setErrors] = useState({})

  if (!isOpen) return null

  const onChange = e => {
    const { name, value, files } = e.target
    if (files) {
      setForm(f => ({ ...f, [name]: files[0] }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name) newErrors.name = 'Name is required'
    if (!form.email) newErrors.email = 'Email is required'
    if (!form.conference) newErrors.conference = 'Conference is required'
    // Add more validation as needed
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
    onClose()
  }
  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg max-w-xl w-full p-6 shadow-lg max-h-[90vh] overflow-y-auto'>
        <h2 className='text-xl font-semibold mb-4'>Create New User</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Role */}
          <div>
            <label className='block mb-1 font-medium'>Role</label>
            <input
              type='text'
              disabled={true}
              value={selectedRole}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${'border-gray-300'}`}
            />
          </div>
          {/* Role */}
          <div>
            <label className='block mb-1 font-medium'>Conference</label>
            <select
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent $${
                errors.conference ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={onChange}
              name='conference'
            >
              <option value=''>Select Conference</option>
              {conferences &&
                conferences.map(conf => (
                  <option key={conf._id} value={conf._id}>
                    {conf.name}
                  </option>
                ))}
            </select>
             {errors.conference && (
              <p className='text-red-600 text-sm mt-1'>{errors.conference}</p>
            )}
          </div>

          {/* title */}

          <div>
            <label className='block mb-1 font-medium'>Title</label>
            <input
              name='title'
              value={form.title}
              onChange={onChange}
              type='text'
              placeholder='Title of user'
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent $
                `}
            />
          </div>

          {/* Name */}
          <div>
            <label className='block mb-1 font-medium'>Name</label>
            <input
              name='name'
              value={form.name}
              onChange={onChange}
              type='text'
              placeholder='User name'
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className='text-red-600 text-sm mt-1'>{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className='block mb-1 font-medium'>Email</label>
            <input
              name='email'
              value={form.email}
              onChange={onChange}
              type='email'
              placeholder='Email'
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='text-red-600 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          {/* Address */}
          {selectedRole !== 'Moderator' ||
            selectedRole !== 'scientific_committee' ||
            (selectedRole != 'technical_committee' && (
              <div>
                <label className='block mb-1 font-medium'>Address</label>
                <input
                  name='address'
                  value={form.address}
                  onChange={onChange}
                  placeholder='Address'
                  type='text'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
            ))}

          {/* Country */}
          <div>
            <label className='block mb-1 font-medium'>Country</label>
            <input
              name='country'
              value={form.country}
              onChange={onChange}
              type='text'
              placeholder='Country'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Affiliation (common) */}
          <div>
            <label className='block mb-1 font-medium'>
              Affiliation/University
            </label>
            <input
              name='affiliation'
              value={form.affiliation}
              onChange={onChange}
              placeholder='Affiliation'
              type='text'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Faculty (only for Authors, Reviewers, Session Chair, Moderator) */}
          {
            <div>
              <label className='block mb-1 font-medium'>
                Faculty/Department
              </label>
              <input
                name='faculty'
                value={form.faculty}
                onChange={onChange}
                type='text'
                placeholder='faculty'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          }

          {/* Position (for Committees, Keynote Speaker, Session Chair, Moderator) */}

          <div>
            <label className='block mb-1 font-medium'>Position</label>
            <input
              name='position'
              value={form.position}
              onChange={onChange}
              type='text'
              placeholder='User position'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* Domain (Reviewers and Committees) */}
          {(selectedRole === 'Reviewer' ||
            selectedRole === 'Session Chair' ||
            selectedRole === 'scientific_committee' ||
            selectedRole === 'Technical Committee') && (
            <div>
              <label className='block mb-1 font-medium'>Research Domain</label>
              <input
                name='domain'
                value={form.domain}
                onChange={onChange}
                type='text'
                placeholder='Domain'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          )}

          {/* Contact (Committees and Reviewers) */}

          <div>
            <label className='block mb-1 font-medium'>Contact</label>
            <input
              name='contact'
              value={form.contact}
              onChange={onChange}
              type='text'
              placeholder='User Contact'
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>

          {/* ORCID (Committees and Reviewers) */}
          {(selectedRole === 'Reviewer' ||
            selectedRole === 'Scientific Committee' ||
            selectedRole === 'Keynote Speaker' ||
            selectedRole === 'Session Chair' ||
            selectedRole === 'Moderator' ||
            selectedRole === 'scientific_committee' ||
            selectedRole === 'Technical Committee') && (
            <div>
              <label className='block mb-1 font-medium'>
                {selectedRole === 'Moderator' ||
                selectedRole === 'scientific_committee'
                  ? 'Social Media'
                  : 'ORCID ID'}
              </label>
              <input
                name='orcid'
                value={form.orcid}
                onChange={onChange}
                type='url'
                placeholder='https://orcid.org/xxxx-xxxx-xxxx-xxxx'
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          )}

          {/* Talk Abstract */}
          {selectedRole === 'Keynote Speaker' && (
            <>
              <div>
                <label className='block mb-1 font-medium'>Talk Title</label>
                <input
                  name='talk_title'
                  value={form.talk_title}
                  onChange={onChange}
                  type='text'
                  placeholder='Talk Title'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
              <div>
                <label className='block mb-1 font-medium'>Talk Abstract</label>
                <textarea
                  name='talk_abstract'
                  value={form.talk_abstract}
                  onChange={onChange}
                  type='text'
                  placeholder='Talk Abstract'
                  className='w-full px-3 h-32 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
              <div>
                <label className='block mb-1 font-medium'>
                  Speaker Biography
                </label>
                <textarea
                  name='speaker_bio'
                  value={form.speaker_bio}
                  onChange={onChange}
                  type='text'
                  placeholder='Biography of Speaker'
                  className='w-full px-3 h-32 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
            </>
          )}
          {selectedRole === 'scientific_committee' && (
            <div>
              <label className='block mb-1 font-medium'>Biography</label>
              <textarea
                name='bio'
                value={form.bio}
                onChange={onChange}
                type='text'
                placeholder='Biography'
                className='w-full px-3 h-32 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          )}
          {/* Committee Type (only Committees) */}
          {selectedRole === 'technical_committee' && (
            <div>
              <label className='block mb-1 font-medium'>Committee Name</label>
              <select
                name='committeeName'
                value={form.committeeName}
                onChange={onChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='Publication'>Publication Committee</option>
                <option value='Publicity and Promotion'>
                  Publicity and Promotion Committee
                </option>
                <option value='Sponsorship'>Sponsorship Committee</option>
                <option value='Technical Support'>
                  Technical Support Committee
                </option>
                <option value='Virtual Conference'>
                  Virtual Conference Committee
                </option>
                <option value='Logistic Conference'>Logistic Committee</option>
                <option value='Multimedia Conference'>
                  Multimedia Committee
                </option>
              </select>
            </div>
          )}

          {/* session Chair Biography */}
          {selectedRole === 'Session Chair' && (
            <div>
              <label className='block mb-1 font-medium'>Chair Biography</label>
              <textarea
                name='chair_bio'
                value={form.chair_bio}
                onChange={onChange}
                type='url'
                placeholder='Biography of Session chair'
                className='w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className='block mb-1 font-medium'>Profile Image</label>
            <input
              name='imageFile'
              type='file'
              accept='image/*'
              onChange={onChange}
              className='w-full'
            />
          </div>

          {/* Buttons */}
          <div className='flex justify-end space-x-4 pt-4 border-t border-gray-200'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 rounded border border-gray-300 hover:bg-gray-100'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateUserModal
