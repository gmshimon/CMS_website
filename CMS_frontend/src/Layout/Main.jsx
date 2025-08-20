import { Outlet, useLocation } from 'react-router'
import Navbar from '../Component/Navbar/Navbar'
import Footer from '../Component/Footer/Footer'

const Main = () => {
  // Mobile menu state
  const location = useLocation()
  const isLocation =
    location.pathname !== '/login' && location.pathname !== '/register'

  return (
    <div>
      {isLocation && <Navbar />}
      <Outlet />
      {isLocation && <Footer />}
    </div>
  )
}

export default Main
