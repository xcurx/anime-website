import { useState, useEffect } from 'react'
import axios from 'axios'
import { AnimeList, Banner, Footer, List, Navbar } from './components'
import { useDispatch } from 'react-redux'
import { handleProgress } from './store/loaderSlice'

function App() {
    const [home, setHome] = useState({})
    const dispatch = useDispatch()

    function apiHandler(){
      axios.get('/anime/home')
          .then((res) => {
            setHome(res.data)
          })
        }
    // console.log(home); 
        
    useEffect(() => {
      dispatch(handleProgress({progress:0}))
      apiHandler()
    }, [])
    
  return home && (
    <div
     onLoad={() => dispatch(handleProgress({progress:100}))} 
    >
        <Navbar/>
        <Banner/>
        <AnimeList info={home}/>
        <Footer/>
    </div>
  )
}

export default App
