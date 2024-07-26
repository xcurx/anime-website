import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AnimeIntro({aniInfo}) {
    const [reveal, setReveal] = useState(false)
    const [hoverIndex, setHoverIndex] = useState(null)
    const navigate = useNavigate()

    // aniInfo && console.log(aniInfo);

    return aniInfo && (
    <div>
        <div className={`text-white relative px-4 py-12 lg:flex overflow-hidden`}>
            <div className='absolute w-full h-full top-0 z-[-1]'
             style={{
              backgroundImage:`radial-gradient(circle, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url(${aniInfo.anime.info.poster})`,
              backgroundRepeat:'no-repeat',
              backgroundPosition:'center',
              backgroundSize:'cover',
              filter:'blur(10px) grayscale(90%) brightness(50%)'
            }}
            ></div>

            <div className='flex justify-center items-center w-full lg:w-1/3 h-full'>
                <img className='aspect-[3/4] lg:h-[400px] h-[300px] rounded-lg' src={aniInfo.anime.info.poster} alt="" />
            </div>
    
            <div className='flex flex-col justify-center items-center lg:items-start w-full lg:w-2/3 py-4 px-8 md:px-12'>
                <div></div>
                <div className='xl:text-5xl lg:text-4xl md:text-2xl text-xl font-semibold font'>{aniInfo.anime.info.name}</div>
                <div className='text-white mt-4'>
                  <span className='rounded border-2 lg:text-xs md:text-ss text-sz font-bold px-1 md:px-2 md:py-0.5 mr-[4px] bg-[#BD5D05] border-[#BD5D05]'>{aniInfo.anime.info.stats.quality}</span>
                  <span className='rounded border-2 lg:text-xs md:text-ss text-sz font-bold px-1 md:px-2 md:py-0.5 mr-[4px]'>SUB {aniInfo.anime.info.stats.episodes.sub}</span>
                  <span className='rounded border-2 lg:text-xs md:text-ss text-sz font-bold px-1 md:px-2 md:py-0.5 mr-[4px]'>{aniInfo.anime.info.stats.rating}</span>
                  <span className='rounded border-2 lg:text-xs md:text-ss text-sz font-bold px-1 md:px-2 md:py-0.5 mr-[4px]'>DUB {aniInfo.anime.info.stats.episodes.dub}</span>
                  <span className='text-slate-300 lg:text-xs md:text-ss text-sz px-1 md:px-2 md:py-0.5 md:mr-[1px]'>•{' '}{aniInfo.anime.info.stats.type}</span>
                  <span className='text-slate-300 lg:text-xs md:text-ss text-sz px-1 md:px-2 md:py-0.5 md:mr-[1px]'>•{' '}{aniInfo.anime.info.stats.duration}</span>
                </div>
                <div className='my-7 flex'>
                  <div onClick={() => navigate(`watch`)} className='bg-[#8800ff] py-3 px-4 rounded-3xl text-xs md:text-sm mr-3 cursor-pointer'>Watch Now</div>
                  <div className='bg-[#8800ff] py-3 px-4 rounded-3xl mr-3 cursor-pointer text-xs md:text-sm'>Add to List</div>
                </div>
                <div className=''>
                  <p className={`w-full ${reveal? 'text-xs md:text-sm':'truncate-3-lines text-xs md:text-sm'}`}>{aniInfo.anime.info.description}</p>
                  <span onClick={() => setReveal(!reveal)} className='font-bold md:text-sm text-xs opacity-70 cursor-pointer'>
                    {reveal?'-Less':'+More'}</span>
                </div>
                <div className='flex flex-wrap lg:justify-normal justify-center'>
                  <div className='pr-4'>
                    <span className='text-xs md:text-sm text-gray-400'>Japanese: </span>
                    <span className='text-xs md:text-sm text-gray-200 font-semibold truncate'>{aniInfo.anime.moreInfo.japanese}</span>
                  </div>
                  <div className='pr-5'>
                    <span className='text-xs md:text-sm text-gray-400'>Premiered: </span>
                    <span className='text-xs md:text-sm text-gray-200 font-semibold truncate'>{aniInfo.anime.moreInfo.premiered}</span>
                  </div>
                  <div className='pr-5'>
                    <span className='text-xs md:text-sm text-gray-400'>Aired: </span>
                    <span className='text-xs md:text-sm text-gray-200 font-semibold truncate'>{aniInfo.anime.moreInfo.aired}</span>
                  </div>
                  <div className='pr-5'>
                    <span className='text-xs md:text-sm text-gray-400'>Status: </span>
                    <span className='text-xs md:text-sm text-gray-200 font-semibold truncate'>{aniInfo.anime.moreInfo.status}</span>
                  </div>
                  <div className='pr-5'>
                    <span className='text-xs md:text-sm text-gray-400'>Studios: </span>
                    <span className='text-xs md:text-sm text-gray-200 font-semibold truncate'>{aniInfo.anime.moreInfo.studios}</span>
                  </div>
                  <div className='pr-5 flex'>
                    <div className='text-xs md:text-sm text-gray-400'>Producers: </div>
                    <div className='text-xs md:text-sm text-gray-200 font-semibold flex flex-wrap pl-1 flex-1'>
                      {aniInfo.anime.moreInfo.producers.map((e,i) => (
                        <div key={e}>{e+(i==aniInfo.anime.moreInfo.producers.length-1?'':', ')}</div>
                      ))}
                    </div>
                  </div>
                  <div className='pr-5'>
                    <span className='text-xs md:text-sm text-gray-400'>Synonyms: </span>
                    <span className='text-xs md:text-sm text-gray-200 font-semibold truncate'>{aniInfo.anime.moreInfo.synonyms}</span>
                  </div>
                </div>
                <div className='w-full flex mt-1'>
                  <div className='text-xs md:text-sm text-gray-400 h-full'>Genres: </div>
                  <div className='text-xs md:text-sm text-gray-200 font-semibold h-full pl-1'>
                    {
                        aniInfo.anime.moreInfo.genres.map((e,i) => (
                          <Link 
                           key={e}
                           to={`/genre/${e.split(' ').map(e => e[0].toLowerCase()+e.slice(1)).join('-')}?page=1`}
                           className='hover:text-[#8800ff]'
                          >
                            {e+(i==aniInfo.anime.moreInfo.genres.length-1?'':', ')}
                          </Link>
                        ))
                    }
                  </div>
                </div>
            </div>
        </div>

        {
            aniInfo.anime.info.charactersVoiceActors.length>0 && (
              <div className='text-white'>
                  <div className='text-xl md:text-2xl py-3 px-6 text-[#8800ff]'>Characters & Voice Actors</div>
                  <div className='grid grid-cols-3 md:grid-cols-6 sm:grid-cols-4 w-full p-5'>
                  {
                    aniInfo.anime.info.charactersVoiceActors.map((actor,index) => (
                      <div key={actor.character.name} className='flex-1 w-full flex flex-col items-center'>
                          <img className='rounded-[50%] w-[100px] h-[100px]' src={hoverIndex==index?actor.voiceActor.poster:actor.character.poster} alt=""
                          onMouseEnter={() => setHoverIndex(index)}
                          onMouseLeave={() => setHoverIndex(null)}
                          />
                          <div className='truncate'
                          onMouseEnter={() => setHoverIndex(index)}
                          onMouseLeave={() => setHoverIndex(null)}
                          >{hoverIndex==index?actor.voiceActor.name:actor.character.name}</div>
                      </div>
                    ))
                  }
                  </div>
              </div>
            )
        }
    </div>
  )
}

export default AnimeIntro
