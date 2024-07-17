import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function AnimeIntro({aniInfo}) {
    const [reveal, setReveal] = useState(false)
    const navigate = useNavigate()

    return aniInfo && (
        <div className='text-white px-4 py-12 border flex'>
            <div className='flex justify-center items-center border w-1/3 h-full'>
                <img src={aniInfo.anime.info.poster} alt="" />
            </div>
    
            <div className='flex flex-col justify-center items-start border w-2/3 py-4 px-12'>
                <div></div>
                <div className='xl:text-5xl'>{aniInfo.anime.info.name}</div>
                <div className='text-black mt-4'>
                  <span className='bg-[white] rounded-tr-none rounded-br-none rounded text-[12px] font-bold px-2 py-0.5 mr-[1px]'>{aniInfo.anime.info.stats.rating}</span>
                  <span className='bg-[#ffdd95] text-[12px] font-bold px-2 py-0.5 mr-[1px]'>{aniInfo.anime.info.stats.quality}</span>
                  <span className='bg-[#b0e3af] text-[12px] font-bold px-2 py-0.5 mr-[1px]'>{aniInfo.anime.info.stats.episodes.sub}</span>
                  <span className='bg-[#e3b5cd] rounded-tl-none rounded-bl-none rounded text-[12px] font-bold px-2 py-0.5 mr-[1px]'>{aniInfo.anime.info.stats.episodes.dub}</span>
                  <span className='text-slate-300 text-[12px] px-2 py-0.5 mr-[1px]'>•{' '}{aniInfo.anime.info.stats.type}</span>
                  <span className='text-slate-300 text-[12px] px-2 py-0.5 mr-[1px]'>•{' '}{aniInfo.anime.info.stats.duration}</span>
                </div>
                <div className='my-7 flex'>
                  <div onClick={() => navigate(`watch`)} className='bg-[#D9232E] py-3 px-4 rounded-3xl mr-3 cursor-pointer'>Watch Now</div>
                  <div className='bg-[#D9232E] py-3 px-4 rounded-3xl mr-3 cursor-pointer'>Add to List</div>
                </div>
                <div className='max-h-[40%]'>
                  <p className={`w-full ${reveal? null:'truncate-3-lines'}`}>{aniInfo.anime.info.description}</p>
                  <span onClick={() => setReveal(!reveal)} className='font-bold opacity-70 cursor-pointer'>
                    {reveal?'-Less':'+More'}</span>
                </div>
            </div>
        </div>
      )
}

export default AnimeIntro
