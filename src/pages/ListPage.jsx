import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Card, Navbar, PageChange} from '../components'
import { useLocation } from 'react-router-dom'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

function ListPage() {
  const [loading, setLoading] = useState(true)
  const { list } = useParams()
  const [listData, setListData] = useState(null)
  const pageNo = useQuery().get('page')
  console.log(pageNo);


  async function listLoader(){
    setLoading(true)
    axios.get(`/anime/${list}?page=${pageNo}`)
      .then((res) => setListData(res.data))
  } 

  // listData && console.log(listData);

  useEffect(() => {
    listLoader()
    setLoading(false)
  }, [pageNo])
  
   
  return loading? (<div className='text-white text-9xl'>loading</div>): listData&&(
    <div className=''>
        <Navbar/>
        <div className='text-[#D9232E] text-3xl px-5 pt-3'>
          {list.split('-').map((e) => e[0].toUpperCase()+e.slice(1)).join(' ')}
        </div>
        <div className='w-full grid grid-cols-5 p-3'>
          {
            listData && listData.animes.map((anime) => (
                <div key={anime.id} className='w-full p-3'>
                  <Card data={anime}/>
                </div>
            ))
          }
        </div>
        <div className='w-full flex justify-center'>
          <PageChange 
           totalPages={listData.totalPages} 
           hasNextPage={listData.hasNextPage} 
           currentPage={listData.currentPage}
          />
        </div>
    </div>
  )
}

export default ListPage
