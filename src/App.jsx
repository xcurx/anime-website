import { useState, useEffect } from 'react'
import axios from 'axios'
import { AnimeList, Banner, Footer, List, Navbar } from './components'

function App() {
    const [home, setHome] = useState({})

    function apiHandler(){
      axios.get('/anime/home')
          .then((res) => {
            setHome(res.data)
          })
        }
    // console.log(home);
        
    useEffect(() => {
      apiHandler()
    }, [])
    
  return home && (
    <>
        <Navbar/>
        <Banner/>
        <AnimeList info={home}/>
        <Footer/>
    </>
  )
}

export default App
