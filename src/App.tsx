import { Outlet } from 'react-router-dom'
import './App.scss'
import { Footer } from './components/Footer/Footer'
import Header from './components/Header/Header'
import { TelegramLink } from './components/TelegramLink/TelegramLink'
import { ToastContainer } from 'react-toastify'

export const App: React.FC = () => {

  return (
    <>
      <Header />
      <main className=' main container'>
        <Outlet />
        <TelegramLink />
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

