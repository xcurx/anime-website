import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AnimeIntro from '../components/AnimeIntro'
import {Navbar} from '../components'
import { useDispatch } from 'react-redux'
import { handleProgress } from '../store/loaderSlice'
import {url} from '../constant.js'

function AnimePage() {
    const [aniInfo, setAniInfo] = useState(null)
    const {animeId} = useParams()
    const dispatch = useDispatch()

    async function animeInfo(){
        axios.get(`${url}/anime/info?id=${animeId}`)
            .then((res) => setAniInfo(res.data))
            .then(dispatch(handleProgress({progress:100})))
    }

    // aniInfo && console.log(aniInfo.anime);

    useEffect(() => {
      dispatch(handleProgress({progress:40}))
      animeInfo()
    }, [animeId])
    
  return aniInfo && (
    <>
    <Navbar/>
    <AnimeIntro aniInfo={aniInfo}/>
    </>
  )
}

export default AnimePage
