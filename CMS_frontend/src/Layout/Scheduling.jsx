import { Outlet, useLocation } from 'react-router'

const Scheduling = () => {
  const location = useLocation()

  //       if (
  //     assigningReviewerLoading ||
  //     sentReviewerReminderLoading ||
  //     changeAbstractStatusLoading
  //   ) {
  //     return (
  //       <div className='flex justify-center h-[calc(100vh-100px)] items-center'>
  //         <Loading />
  //       </div>
  //     )
  //   }
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-4'>
        {location.pathname === '/admin/scheduling'
          ? 'Scheduling Management'
          : location?.pathname === '/admin/scheduling/paper-physical'
          ? 'Physical Paper Presentation'
          : location.pathname === '/admin/scheduling/paper-online'
          ? 'Online Paper Presentation'
          : location.pathname === '/admin/scheduling/poster-physical'
          ? 'Physical Poster Presentation'
          : location.pathname === '/admin/scheduling/poster-online'
          ? 'Online Poster Presentation'
          : location.pathname === '/admin/scheduling/poster-online'}
      </h2>

      <Outlet />
    </div>
  )
}

export default Scheduling
