import { useState, useEffect } from 'react'
import axios from 'axios'
import { AnimeList, Banner, Footer, List, Navbar } from './components'
import { useDispatch } from 'react-redux'
import { handleProgress } from './store/loaderSlice'
import {url} from './constant.js'

function App() {
    const [home, setHome] = useState({})
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    function apiHandler(){
      setLoading(true)
      axios.get(`${url}/anime/home`)
          .then((res) => {
            setHome(res.data)
          })
          .then(() => setLoading(false))
        }
    // console.log(home); 
        
    useEffect(() => {
      dispatch(handleProgress({progress:0}))
      apiHandler()
    }, [])
    
  return loading? (<div className='text-4xl text-[#8800ff] h-screen flex justify-center items-center'>Loading</div>) : home && (
    <div
     onLoad={() => dispatch(handleProgress({progress:100}))} 
    >
        <Navbar/>
        <Banner/>
        <AnimeList info={home}/>
        <Footer info={home}/>
    </div>
  )
}

export default App
