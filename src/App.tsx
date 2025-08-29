import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import './App.css'
import Auth from './components/Auth'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Auth />
      <ToastContainer />
    </>
  )
}

export default App
