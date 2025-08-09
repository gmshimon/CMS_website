
import { Outlet } from 'react-router'
import Navbar from '../Component/Navbar/Navbar'

const Main = () => {
  // Mobile menu state
  
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default Main
