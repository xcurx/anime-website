import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { Navbar, Card, PageChange } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { handleProgress } from '../store/loaderSlice'

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

function GenrePage() {
    const {genre} = useParams()
    const [data, setData] = useState(null)
    const pageNo = useQuery().get('page')
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    async function apiHandler(){
        setLoading(true)
        axios.get(`/anime/genre/${genre}?page=${pageNo}`)
            .then((res) => setData(res.data))
    }

    // data && console.log(100/data.animes.length);

    useEffect(() => {
        apiHandler()
        setLoading(false)
        window.scrollTo(0,0)
    }, [pageNo,useLocation().pathname])

    return loading? (<div className='text-white text-9xl'>loading</div>): data&&(
        <div className=''
        onLoad={() => {
          // dispatch(handleProgress({progress:100}))
        }}>
            <Navbar/>
            <div className='text-[#8800ff] text-3xl px-5 pt-3'>
                      {genre.split('-').map((e) => e[0].toUpperCase()+e.slice(1)).join(' ')}
            </div>
           <div className='lg:flex p-3'>
              <div className='lg:w-3/4 w-full'>
                    <div className='w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 p-0'>
                      {
                        data && data.animes.map((anime,index) => { 
                            return (<div key={anime.id} className='w-full p-3'>
                              <Card data={anime} steps={100/data.animes.length}/>
                            </div>)
                          })
                      }
                    </div>
                    <div className='w-full flex justify-center'>
                      <PageChange 
                      totalPages={data.totalPages} 
                      currentPage={data.currentPage}
                      totalButtons={4}
                      />
                    </div>
                </div>
                <div className='lg:w-1/4 w-full h-[800px] bg-[#2c2c2c] text-white grid grid-cols-4 md:grid-cols-2 my-3 p-3'>
                    {
                        data && data.genres.map((genre) => (
                          <div key={genre} className='py-2 bg-[] hover:text-[#8800ff] px-3 rounded-xl font-bold mr-auto cursor-pointer truncate'>
                             <Link to={`/genre/${genre.split(' ').map((e) => e[0].toLowerCase()+e.slice(1)).join('-')}?page=1`}>{genre}</Link> 
                          </div>
                        ))
                    }
                </div>
           </div>
        </div>
      )
}

export default GenrePage
