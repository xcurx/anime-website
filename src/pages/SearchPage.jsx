import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {Card, Navbar, PageChange} from '../components'
import { useDispatch } from 'react-redux'
import { handleProgress } from '../store/loaderSlice'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

function SearchPage() {
  const query = useQuery()
  const searchQuery = query.get('query')
  const pageNo = query.get('page')
  const [searchResult, setSearchResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function searchHandler(){
    setLoading(true)
    axios.get(`/anime/search?q=${searchQuery}&page=${pageNo}`)
        .then((res) => setSearchResult(res.data))
        .then(() => 100/res.data.animes.length)
  }

  useEffect(() => {
    searchHandler()
    setLoading(false)
  },[pageNo])

  return loading? (<div className='text-white text-9xl'>loading</div>): searchResult&&(
    <div className=''
    // onLoad={() => dispatch(handleProgress({progress:100}))}
    >
        <Navbar/>
        <div className='text-[#8800ff] text-2xl lg:text-3xl px-5 pt-3'>
          {`Search results for keyword: ${searchQuery}`}
        </div>
        <div className='w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 p-3'>
          {
            searchResult && searchResult.animes.map((anime) => (
                <div key={anime.id} className='w-full p-3'>
                  <Card data={anime} steps={100/searchResult.animes.length}/>
                </div>
            ))
          }
        </div>
        <div className='w-full flex justify-center'>
          <PageChange 
           totalPages={searchResult.totalPages}  
           currentPage={searchResult.currentPage}
           totalButtons={window.innerWidth<=768?3:5}
          />
        </div>
    </div>
  )
}

export default SearchPage
