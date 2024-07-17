import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AnimeIntro from '../components/AnimeIntro'

function AnimePage() {
    const [aniInfo, setAniInfo] = useState(null)
    const {animeId} = useParams()

    async function animeInfo(){
        axios.get(`anime/info?id=${animeId}`)
            .then((res) => setAniInfo(res.data))
    }

    // aniInfo && console.log(aniInfo);

    useEffect(() => {
      animeInfo()
    }, [])
    
  return aniInfo && (
    <AnimeIntro aniInfo={aniInfo}/>
  )
}

export default AnimePage
