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
      <footer class="mt-20">
        <p>Made with <span style={{ color: 'red' }}>❤️</span> by Gokulakrishnan :-)</p>
      </footer>
    </>
  )
}

export default App
