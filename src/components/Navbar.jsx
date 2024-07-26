import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { useDispatch, useSelector } from 'react-redux'
import { handleProgress } from '../store/loaderSlice'
import pnLogo from '../assets/pnLogo.png'

function Navbar() {
  const [input, setInput] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const navigate = useNavigate()
  const focus = useRef()
  const progress = useSelector((state) => state.loader.progress)
  const dispatch = useDispatch()

  const CancelToken = axios.CancelToken
  let cancel = () => {}

  async function searchHandler(){
      if(input.length <= 0){
        cancel('')
        setSearchResult(null)
        return
      }
      axios.get(`/anime/search/suggest?q=${input}`,
        {cancelToken: new CancelToken((c) => cancel = c)}
      ).then((res) => {setSearchResult(res.data.suggestions)})
       .catch((thrown) => {
          if(axios.isCancel(thrown)){
            console.log('Cancelled',thrown);
          }else{
            console.log(thrown);
          }
       })
  }

  useEffect(() => {
    const session = setTimeout(searchHandler(),300)

    return () => {clearTimeout(session)}
  },[input])

  return (
    <div 
     className='sticky top-0 z-10 w-full bg-[black] p-2 flex justify-between xl:text-2xl lg:text-xl text-xs'
    >

      <LoadingBar
        color='#8800ff'
        progress={progress}
        onLoaderFinished={() => dispatch(handleProgress({progress:0}))}
      />

      <Link to={'/'} className='h-full'><img className='w-[150px]' src={pnLogo} alt="" /></Link>

      <div className='flex md:gap-8 gap-3'>
          <div className='xl:relative xl:w-96'>
            <input type="text"
            className='border-[#8800ff] border rounded bg-transparent px-2 text-[#8800ff] h-full w-full outline-none' 
            placeholder='Search'
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => focus.current.style.visibility = 'visible'}
            onBlur={() => focus.current.style.visibility = 'hidden'}
            />
            <div ref={focus} 
             className='absolute top-[100%] left-0 w-screen xl:w-full z-10 text-white bg-[#3d3a3a] cursor-pointer'
             onMouseDown={(e) => e.preventDefault()}
             >
              {
                searchResult && searchResult.map((anime) => (
                  <div 
                   key={anime.id}
                   className='w-full p-1 flex border-b border-dashed border-[#766868]'
                   onClick={() => navigate(`/${anime.id}`)}
                  >
                      <div className='w-1/5 md:w-1/12 xl:w-1/5 p-2'>
                        <img src={anime.poster} className='w-full aspect-[3/4]' alt="" />
                      </div>
                      <div className='w-4/5 md:w-11/12 xl:w-4/5 p-2'>
                        <div className='truncate text-lg'>{anime.name}</div>
                        <div className='truncate text-sm'>{anime.jname}</div>
                        <div className='flex py-1 text-xs'>
                          <span>{anime.moreInfo[0]}</span>
                          <span className='px-1'>·</span>
                          <span className='font-bold'>{anime.moreInfo[1]}</span>
                          <span className='px-1'>·</span>
                          <span>{anime.moreInfo[2]}</span>
                        </div>
                      </div>
                  </div>
                ))
              }
              {searchResult && (<Link to={`/search?query=${input}&page=1`} className='bg-[#8800ff] w-full flex justify-center text-lg '>View all results</Link>)}
            </div>
          </div>
          <button className='text-[#8800ff] border-[#8800ff] border rounded px-4 py-1'>Login</button>
      </div>
    </div>
  )
}

export default Navbar
