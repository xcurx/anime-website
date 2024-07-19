import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Navbar() {
  const [input, setInput] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const navigate = useNavigate()
  const focus = useRef()

  async function searchHandler(query){
      if(query.length <= 1){
        setSearchResult(null)
        return
      }
      axios.get(`/anime/search/suggest?q=${query}`)
          .then((res) => {setSearchResult(res.data.suggestions)})
  }

  useEffect(() => {
      searchHandler(input)
  },[input])

  return (
    <div className='sticky top-0 z-10 w-screen bg-[#353333] p-2 flex justify-between xl:text-2xl lg:text-xl text-xs'>
      <span className='text-red-500'>Logo</span>
      <div className='flex md:gap-8 gap-3'>
          <div className='xl:relative xl:w-96'>
            <input type="text"
            className='border-[red] border rounded bg-transparent px-2 text-[red] h-full w-full outline-none' 
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
                   className='w-full p-1 flex border-b border-dashed border-[#766868]'
                   onClick={() => navigate(anime.id)}
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
              {searchResult && (<Link to={`/search?query=${input}`} className='bg-[#d63939] w-full flex justify-center text-lg '>View all results</Link>)}
            </div>
          </div>
          <button className='text-red-500 border-[red] border rounded px-4 py-1'>Login</button>
      </div>
    </div>
  )
}

export default Navbar
