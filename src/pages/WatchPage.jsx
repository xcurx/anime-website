import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {Navbar} from '../components'
import { MediaPlayer, MediaProvider, Track, Poster} from '@vidstack/react'
import {
    DefaultAudioLayout,
    defaultLayoutIcons,
    DefaultVideoLayout,
  } from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

function WatchPage() {
    const {animeId} = useParams()
    const [episodes, setEpisodes] = useState(null)
    const [episodeInfo, setEpisodeInfo] = useState(null)
    const [streamingLink, setStreamingLink] = useState(null)
    const [options, setOptions] = useState(0)
    const [select, setSelect] = useState('')
 
    async function episodeHandler(){
        axios.get(`/anime/episodes/${animeId}`)
            .then((res) => {
              setEpisodes(res.data.episodes)
              optionHandler(res.data.episodes)
            })
    }

    async function getEpisodeServer(episodeId){
        axios.get(`/anime/servers?episodeId=${episodeId}`)
            .then((res) => setEpisodeInfo(res.data))
            .then(() => {
                axios.get(`/anime/episode-srcs?id=${episodeId}&server=vidstreaming&category=sub`)
                    .then((res) => setStreamingLink(res.data))
            })
    }

    function optionHandler(episodes){
      const option = episodes.length%100==0? episodes.length%100:Math.floor(episodes.length/100+1)
      setOptions(option)
    }

    useEffect(() => {
        episodeHandler()
        setSelect('1-100')
    }, [])

    useEffect(() => {
      Array.isArray(episodes) && getEpisodeServer(episodes[0].episodeId)
    }, [episodes])

    useEffect(() => {
      console.log(select);
    }, [select])
    

    // Array.isArray(episodes) && getEpisodeServer(episodes[0].episodeId)
    // options && console.log(Array.from({length:options}).map((_,index) => {
    //   // console.log('hee');
    //   const realIndex = index+1
    //   const value = realIndex==1?'1-100':`${realIndex*100}-${realIndex*100+100}`
    //   return value
    //   }))
    // select && console.log(select);
    // episodes && console.log(episodes);
    // episodeInfo && console.log(episodeInfo);
    // streamingLink && console.log(streamingLink.sources[0]);  

  return (
    <>
        <Navbar/>
        <div className='flex border h-[90vh]'>
            <div className='w-3/4 p-7 border'>
              {
                streamingLink && (<MediaPlayer 
                      src={streamingLink && streamingLink.sources[0].url}
                      viewType='video'
                      streamType='on-demand'
                      logLevel='warn'
                      crossOrigin
                      playsInline
                      title={episodes[episodeInfo.episodeNo-1].title}
                      // poster='https://files.vidstack.io/sprite-fight/poster.webp'
                      // controls
                      
                    >
                      <MediaProvider>
                        <Poster className="vds-poster" />
                        {/* {textTracks.map(track => ( */}
                          <Track src={streamingLink.tracks[0].file}
                          label='English'
                          kind='captions'
                          lang='eng-US'/>
                        {/* // ))} */}
                      </MediaProvider>
                      <DefaultVideoLayout
                        // thumbnails={streamingLink.tracks[1].file}
                        icons={defaultLayoutIcons}
                      />  
                      <DefaultAudioLayout/>
                    </MediaPlayer>)
              }  
            </div>

            <div className='border w-1/4 text-white h-full flex flex-col'>
                <div className='w-full p-3 flex justify-between bg-[#D9232E]'>
                    <span className='text-lg'>List of all episodes:</span>
                    <Select 
                     defaultValue="dog" 
                     variant='solid' 
                     sx={{minWidth: 100, 
                          minHeight: 10, 
                          border: 1, 
                          borderColor: 'red',
                          backgroundColor: 'transparent'
                        }}
                     onChange={(value) => {setSelect(value && value.target.value)}}
                    >
                      {/* {episodes && episodes.length} */}
                      {
                        options && Array.from({length:options}).map((_,index) => {
                            const realIndex = index+1
                            const value = realIndex==1?'1-100':`${realIndex*100}-${realIndex*100+100}`
                            // console.log(value);
                            return (<Option key={value} value={value}>{value}</Option>)
                        })
                      }
                    </Select>
                </div>
                <div className='grid grid-cols-5 gap-3 py-6 pr-6 pl-8 overflow-y-scroll hide-scrollbar flex-1'>
                    {
                        episodes && episodes.map((episode) => {
                          const value = select
                          console.log(value);
                          
                          return (
                            <div
                            key={episode.episodeId} 
                            className='bg-red-600 w-11 h-11 flex justify-center items-center'
                            onClick={() => {getEpisodeServer(episode.episodeId)}}
                            >
                            {episode.number}</div>
                        )})
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default WatchPage
