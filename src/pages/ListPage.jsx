import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Card, Navbar, PageChange} from '../components'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleProgress } from '../store/loaderSlice'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

function ListPage() {
  const [loading, setLoading] = useState(true)
  const { list } = useParams()
  const [listData, setListData] = useState(null)
  const pageNo = useQuery().get('page')
  const dispatch = useDispatch()

  async function listLoader(){
    setLoading(true)
    axios.get(`/anime/${list}?page=${pageNo}`)
      .then((res) => setListData(res.data))
  } 

  // listData && console.log(listData);

  useEffect(() => {
    dispatch(handleProgress({progress:0}))
    listLoader()
    setLoading(false)
    window.scrollTo(0,0)
  }, [pageNo])
  
   
  return loading? (<div className='text-white text-9xl'>loading</div>): listData&&(
    <div className=''
    onLoad={() => {
      dispatch(handleProgress({progress:100}))
    }}>
        <Navbar/>
        <div className='text-[#D9232E] text-3xl px-5 pt-3'>
          {list.split('-').map((e) => e[0].toUpperCase()+e.slice(1)).join(' ')}
        </div>
        <div className='w-full grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 p-3'>
          {
            listData && listData.animes.map((anime) => (
                <div key={anime.id} className='w-full p-3'>
                  <Card data={anime} steps={100/listData.animes.length}/>
                </div>
            ))
          }
        </div>
        <div className='w-full flex justify-center'>
          <PageChange 
           totalPages={listData.totalPages} 
           currentPage={listData.currentPage}
           totalButtons={5}
          />
        </div>
    </div>
  )
}

export default ListPage
