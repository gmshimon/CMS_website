import { useEffect, useState } from 'react'
import EditProfileModal from '../../Component/EditProfileModal/EditProfileModal'
import ChangePasswordModal from '../../Component/ChangePasswordModal/ChangePasswordModal'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../Component/Loading/Loading'
import { showErrorToast, showSuccessToast } from '../../Utilis/toastUtils'
import { reset, updateImage, updateUserProfile } from '../../Redux/Slice/AuthSlice'

const Profile = () => {
  const { user, isUpdateUserSuccess, isUpdateUserError, isUpdateUserLoading } =
    useSelector(state => state.user)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isUpdateUserSuccess) {
      showSuccessToast('Profile updated successfully')
      dispatch(reset())
    }
    if (isUpdateUserError) {
      showErrorToast('Something went wrong')
      dispatch()
    }
  }, [dispatch, isUpdateUserError, isUpdateUserSuccess])

  const handleUpdateUserProfile = data => {
    dispatch(updateUserProfile(data))
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append('image', file)
        dispatch(updateImage(formData))
    }
  }

  if (isUpdateUserLoading) {
    return (
      <div className='flex justify-center items-center h-[calc(100ch-60px)]'>
        <Loading />
      </div>
    )
  }

  return (
    <section className='min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8'>
      {/* Hero Section with Profile Picture */}
      <div className='hero bg-base-100 rounded-lg shadow-xl p-6 mb-8'>
        <div className='hero-content flex-col lg:flex-row'>
          <div className='avatar'>
            {/* <div className='w-48 h-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden'>
              <img
                src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </div> */}
            <div className='relative avatar'>
              <div className='w-40 rounded-full'>
                <img
                  src={
                    user?.photo ||
                    'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                  }
                  alt='Avatar'
                />
              </div>
              <label
                htmlFor='file-input'
                className='absolute top-0 right-0 p-1 bg-white rounded-full cursor-pointer'
              >
                <span role='img' aria-label='Edit'>
                  ✏️
                </span>
              </label>
              <input
                id='file-input'
                type='file'
                className='hidden'
                accept='image/*'
                onChange={e => {
                  handleFileChange(e)
                }}
              />
            </div>
          </div>
          <div className='text-center lg:text-left lg:ml-8'>
            <h1 className='text-4xl font-bold'>{user?.name}</h1>
            <p className='text-xl text-gray-600'>{user?.title || '--'}</p>
            <div className='mt-4 flex gap-4'>
              <button
                className='btn btn-primary'
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Profile
              </button>
              <button
                className='btn btn-outline'
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Information Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Personal Information Card */}
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>Personal Information</h2>
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <span className='text-gray-600 font-semibold min-w-[120px]'>
                  Full Name:
                </span>
                <span>{user?.name}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-gray-600 font-semibold min-w-[120px]'>
                  Email:
                </span>
                <span>{user?.email}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-gray-600 font-semibold min-w-[120px]'>
                  Phone:
                </span>
                <span>{user?.contact || '--'}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-gray-600 font-semibold min-w-[120px]'>
                  Location:
                </span>
                <span>
                  {user?.city && `${user?.city},`} {user?.country}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information Card */}
        <div className='card bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>
              Professional Information
            </h2>
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <span className='text-gray-600 font-semibold min-w-[120px]'>
                  Institution:
                </span>
                <span>{user?.affiliation}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-gray-600 font-semibold min-w-[120px]'>
                  Department:
                </span>
                <span>{user?.faculty || '--'}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-gray-600 font-semibold min-w-[120px]'>
                  Position:
                </span>
                <span>{user?.position || '--'}</span>
              </div>
              <div className='flex items-center gap-4'>
                <span className='text-gray-600 font-semibold min-w-[120px]'>
                  Research Area:
                </span>
                <span>{user?.domain || '--'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={user}
        handleUpdateUserProfile={handleUpdateUserProfile}
      />
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </section>
  )
}

export default Profile
