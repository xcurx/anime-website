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
import {url} from '../constant.js';
import {srcApiHandler, imdbInfo} from '../utils/srcApiHandler.js'

function WatchPage() {
    const {animeId} = useParams()
    const [episodes, setEpisodes] = useState(null)
    const [episodeInfo, setEpisodeInfo] = useState(null)
    const [streamingLink, setStreamingLink] = useState(null)
    const [gogoLink, setGogoLink] = useState(null)
    const [aniwatchLink, setAniwatchLink] = useState(null)
    const [options, setOptions] = useState(0)
    const [select, setSelect] = useState('')
    const [epLoading, setEpLoading] = useState(true)
    const [imbdData, setImbdData] = useState(null)

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
                axios.get(`${url}/anime/episode-srcs?id=${episodeId}&server=hd-1&category=sub`)
                    .then((res) => {setAniwatchLink(res.data); setStreamingLink(res.data)}) 
            })
    }

    function optionHandler(episodes){
      const option = episodes.length%100==0? episodes.length%100:Math.floor(episodes.length/100+1)
      setOptions(option)
    }

    useEffect(() => {
        episodeHandler()
        imdbInfo(animeId)
          .then((res) => setImbdData(res))
    }, [])

    useEffect(() => {
      Array.isArray(episodes) && getEpisodeServer(episodes[0].episodeId)
      // episodes && srcApiHandler(animeId,episodes[0].number)
      // .then((res) => {
      //   setGogoLink(res?.sources[5])
      //   setStreamingLink(() => {
      //     if(res == undefined){
      //       return aniwatchLink
      //     }
      //   })
      // })
      .then(() => setEpLoading(false))
    }, [episodes])
    
    // Array.isArray(episodes) && getEpisodeServer(episodes[0].episodeId)
    // options && console.log(Array.from({length:options}).map((_,index) => {
    //   // console.log('hee');
    //   const realIndex = index+1
    //   const value = realIndex==1?'1-100':`${realIndex*100}-${realIndex*100+100}`
    //   return value
    //   }))
    // select && console.log(select);
    // episodes && console.log(episodes[0]);
    // aniwatchLink && console.log(aniwatchLink);
    // episodeInfo && console.log('einfo',episodeInfo);
    // streamingLink && console.log(streamingLink);  
    // currentQuality && console.log(currentQuality);
    // playerRef && console.log(playerRef.current?.src);
    // console.log(options && (options>1?'1-100':`1-${episodes.length}`))
    // imbdData && console.log(imbdData);
    

  return !select? (<div className='text-4xl text-[#8800ff] h-screen flex justify-center items-center'>Loading</div>) : (
    <>
        <Navbar/>
        <div className='lg:flex lg:h-[45vw]'>
            <div className='lg:w-3/4 w-full p-7'>
              {
                streamingLink && (
                    <MediaPlayer 
                      src={!epLoading? streamingLink?.sources[0].url : ''}
                      // onSourceChange={(e,r) => console.log('ok',e,r)}
                      preload='metadata'
                      viewType='video'
                      streamType='on-demand'
                      logLevel='warn'
                      crossOrigin
                      playsInline
                      title={episodes[episodeInfo.episodeNo-1].title}
                      typeof=''
                      className='relative'
                    >  
                      <MediaProvider>
                        <Poster className="vds-poster" />

                          <Track key={streamingLink.tracks[0].label} src={streamingLink.tracks[0].file}
                          label={streamingLink.tracks[0].label}
                          kind='captions'
                          />
                        
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
            <div className='lg:w-1/4 w-full bg-[#04141e] text-white h-[calc(4rem*12+3rem)] lg:h-full flex flex-col'>
                <div className='w-full p-3 flex justify-between bg-[#071b28]'> 
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
                <div className='p-5 scrollbar-thin overflow-y-scroll flex-1'>
                    {
                        imbdData?.seasons && imbdData.seasons.length>0? (
                            imbdData.seasons.map((season) => {
                              return season.episodes?.map((e,index) => {
                                if(!select) return
                                const value = select
                                const seletEnds = [...value.split('-')]
                                if(e.episode >= seletEnds[0] && e.episode <= seletEnds[1]){
                                  return (
                                    <div
                                    key={e.id} 
                                    className={`border ${episodeInfo.episodeNo==e.episode?'border-[#8415e5] bg-[#030f16]':'border-gray-700'} mt-2 h-16 rounded self-center justify-self-center flex justify-center items-center`}
                                    onClick={() => {
                                      setEpLoading(true)
                                      getEpisodeServer(episodes[e.episode-1].episodeId)
                                      .then(setEpLoading(false))
                                    }}
                                    >
      
                                      <div 
                                       className={`relative h-full font-bold w-1/5 text-3xl flex justify-center items-center ${episodeInfo.episodeNo==e.episode?'text-[#8415e5]':'text-gray-800'}`}
                                       style={{
                                          backgroundImage: `url(${e.img? e.img.hd:''})`,
                                          backgroundSize: 'cover'
                                       }}
                                      >
                                      {e.episode}
                                      </div>
                                      <div className='pl-2 w-4/5 line-clamp-2'>{e.title}</div>
                                    
                                    </div>
                                  )
                                }
                              })
                            })                            
                        ):

                        (episodes && episodeInfo && episodes.map((episode, index) => {
                          if(!select) return
                          const value = select
                          const seletEnds = [...value.split('-')]
                          if(index >= seletEnds[0]-1 && index <= seletEnds[1]-1){
                            return (
                              <div
                              key={episode.episodeId} 
                              className={`border ${episodeInfo.episodeNo==index+1?'border-[#8415e5] bg-[#030f16]':'border-gray-700'} mt-2 h-16 rounded self-center justify-self-center flex justify-center items-center`}
                              onClick={() => {
                                setEpLoading(true)
                                getEpisodeServer(episode.episodeId)
                                .then(setEpLoading(false))
                              }}
                              >

                                <div 
                                 className={`w-1/5 text-3xl font-bold flex justify-center items-center ${episodeInfo.episodeNo==index+1?'text-[#8415e5]':'text-gray-700'}`}
                                >
                                {episode.number}
                                </div>
                                <div className='w-4/5 line-clamp-2'>{episode.title}</div>
                              
                              </div>
                            )
                          }
                        }))
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default WatchPage
