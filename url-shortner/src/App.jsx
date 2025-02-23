import { useState } from 'react'
import './App.css'
import Navbar from './navbar.jsx'
import ShortURL from './components/ShortURL.jsx'
import ListURL from './components/ListURL.jsx'
import { FaRegSmileWink } from "react-icons/fa";


function App() {
  const [urls, setUrls] = useState([])

  return (
    <>
      <Navbar />
      <ShortURL urls={urls} setUrls={setUrls} />
      <ListURL urls={urls} setUrls={setUrls} />
      <footer className="fixed bottom-0 py-2">
        <p>Made with <span className="text-red-500">❤️</span> by Gokulakrishnan :-)</p>
      </footer>
    </>
  )
}

export default App
