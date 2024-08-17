import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {Card, Navbar, PageChange} from '../components'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleProgress } from '../store/loaderSlice'
import {url} from '../constant.js'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

function ListPage() {
  const [loading, setLoading] = useState(true)
  const { list } = useParams()
  const [listData, setListData] = useState(null)
  const pageNo = useQuery().get('page')
  const dispatch = useDispatch()
  const progress = useSelector((state) => state.loader.progress)

  async function listLoader(){
    setLoading(true)
    axios.get(`${url}/anime/${list}?page=${pageNo}`)
      .then((res) => setListData(res.data))
      // .then((res) => console.log(res.data.animes.length))  
  } 

  // listData && console.log(100/listData.animes.length);

  useEffect(() => {
    listLoader()
    setLoading(false)
    window.scrollTo(0,0)
  }, [pageNo])
  
   
  return !listData? (<div className='text-4xl text-[#8800ff] h-screen flex justify-center items-center'>Loading</div>) : (
    <div className=''
    onLoad={() => {
      // dispatch(handleProgress({progress:100}))
    }}>
        <Navbar/>
        <div className='text-[#8800ff] text-3xl px-5 pt-3'>
                  {list.split('-').map((e) => e[0].toUpperCase()+e.slice(1)).join(' ')}
        </div>
       <div className='lg:flex p-3'>
          <div className='lg:w-3/4 w-full'>
                <div className='w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 p-0'>
                  {
                    listData && listData.animes.map((anime) => {
                        return (<div key={anime.id} className='w-full p-3'>
                          <Card data={anime} steps={100/listData.animes.length}/>
                        </div>)
                      })
                  }
                </div>
                <div className='w-full flex justify-center'>
                  <PageChange 
                  totalPages={listData.totalPages} 
                  currentPage={listData.currentPage}
                  totalButtons={4}
                  />
                </div>
            </div>
            <div className='lg:w-1/4 w-full h-[800px] place-content-evenly bg-[#2c2c2c] text-white grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 md:grid-cols-4 my-3 p-3'>
                {
                    listData && listData.genres.map((genre) => (
                      <div key={genre} className='py-2 bg-[] m-auto hover:text-[#8800ff] px-3 rounded-xl font-bold mr-auto cursor-pointer truncate'>
                         <Link to={`/genre/${genre.split(' ').map((e) => e[0].toLowerCase()+e.slice(1)).join('-')}?page=1`}>{genre}</Link> 
                      </div>
                    ))
                }
            </div>
       </div>
    </div>
  )
}

export default ListPage
