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
import url from '../constant.js'

function WatchPage() {
    const {animeId} = useParams()
    const [episodes, setEpisodes] = useState(null)
    const [episodeInfo, setEpisodeInfo] = useState(null)
    const [streamingLink, setStreamingLink] = useState(null)
    const [options, setOptions] = useState(0)
    const [select, setSelect] = useState('')
 
    async function episodeHandler(){
        axios.get(`${url}/anime/episodes/${animeId}`)
            .then((res) => {
              setEpisodes(res.data.episodes)
              optionHandler(res.data.episodes)
              // console.log(res.data.episodes.length>100?'1-100':`1-${res.data.episodes.length}`)
              setSelect(res.data.episodes.length>100?'1-100':`1-${res.data.episodes.length}`)
            })
    }

    async function getEpisodeServer(episodeId){
        axios.get(`${url}/anime/servers?episodeId=${episodeId}`)
            .then((res) => setEpisodeInfo(res.data))
            .then(() => {
                axios.get(`/anime/episode-srcs?id=${episodeId}&server=vidstream&category=sub`)
                    .then((res) => setStreamingLink(res.data))
            })
    }

    function optionHandler(episodes){
      const option = episodes.length%100==0? episodes.length%100:Math.floor(episodes.length/100+1)
      setOptions(option)
    }

    useEffect(() => {
        episodeHandler()
    }, [])

    useEffect(() => {
      Array.isArray(episodes) && getEpisodeServer(episodes[0].episodeId)
    }, [episodes])
    
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
    // console.log(options && (options>1?'1-100':`1-${episodes.length}`))

  return select && (
    <>
        <Navbar/>
        <div className='lg:flex lg:h-[45vw]'>
            <div className='lg:w-3/4 w-full p-7'>
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
            {/* bg-[#D9232E] */}
            <div className='lg:w-1/4 w-full bg-[#282828] text-white lg:h-full flex flex-col'>
                <div className='w-full p-3 flex justify-between'> 
                    <span className='xl:text-lg text-lg lg:text-sm p-2'>List of all episodes:</span>
                    <Select 
                     defaultValue={select} 
                     variant='outline' 
                     sx={{minWidth: 10, 
                          minHeight: 5, 
                          border: 1, 
                          color:'#8415e5',
                          borderColor: '#8415e5',
                          backgroundColor: 'transparent',
                          fontSize: `${innerWidth>=1024&&innerWidth<=1280?'10px':'16px'}`
                        }}
                     onChange={(e,value) => {setSelect(value && value)}}
                    >
                      {/* {episodes && episodes.length} */}
                      {
                        options && Array.from({length:options}).map((_,index) => {
                            const realIndex = index+1
                            if(realIndex == options){
                                const value = `${(realIndex-1)*100+1}-${episodes.length}`
                                return (<Option key={value} value={value}>{value}</Option>)
                            }
                            const value = realIndex==1?'1-100':`${(realIndex-1)*100+1}-${realIndex*100}`
                            return (<Option className='scrollbar-thin' key={value} value={value} sx={{backgroundColor:'#363333', color:'#8415e5'}}>{value}</Option>)
                        })
                      }
                    </Select>
                </div>
                <div className='grid lg:grid-cols-5 md:grid-cols-12 sm:grid-cols-10 grid-cols-5 gap-3 p-6 scrollbar-thin overflow-y-scroll flex-1'>
                    {
                        episodes && episodes.map((episode, index) => {
                          if(!select) return
                          const value = select
                          const seletEnds = [...value.split('-')]
                          if(index >= seletEnds[0]-1 && index <= seletEnds[1]-1){
                            return (
                              <div
                              key={episode.episodeId} 
                              className='bg-[#8415e5] rounded self-center justify-self-center w-11 h-11 lg:w-9 lg:h-9 xl:w-11 xl:h-11 flex justify-center items-center'
                              onClick={() => {getEpisodeServer(episode.episodeId)}}
                              >
                              {episode.number}</div>
                            )
                          }
                        })
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default WatchPage
