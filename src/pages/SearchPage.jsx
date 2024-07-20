import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import {Card, Navbar, PageChange} from '../components'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

function SearchPage() {
  const query = useQuery()
  const searchQuery = query.get('query')
  const pageNo = query.get('page')
  const [searchResult, setSearchResult] = useState(null)
  const [loading, setLoading] = useState(true)

  async function searchHandler(){
    setLoading(true)
    axios.get(`/anime/search?q=${searchQuery}&page=${pageNo}`)
        .then((res) => setSearchResult(res.data))
  }

  useEffect(() => {
    searchHandler()
    setLoading(false)
  },[pageNo])

  return loading? (<div className='text-white text-9xl'>loading</div>): searchResult&&(
    <div className=''>
        <Navbar/>
        <div className='text-[#D9232E] text-3xl px-5 pt-3'>
          {`Search results for keyword: ${searchQuery}`}
        </div>
        <div className='w-full grid grid-cols-5 p-3'>
          {
            searchResult && searchResult.animes.map((anime) => (
                <div key={anime.id} className='w-full p-3'>
                  <Card data={anime}/>
                </div>
            ))
          }
        </div>
        <div className='w-full flex justify-center'>
          <PageChange 
           totalPages={searchResult.totalPages} 
           hasNextPage={searchResult.hasNextPage} 
           currentPage={searchResult.currentPage}
          />
        </div>
    </div>
  )
}

export default SearchPage
