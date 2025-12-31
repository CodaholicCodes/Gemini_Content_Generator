import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const ChatLayout = () => {
  return (
    <>
    <div className='flex h-screen '>
<SideBar />
<main className='flex-1 overflow-hidden'>
    <Outlet />
    </main>
   </div>
  </>
  )
}

export default ChatLayout