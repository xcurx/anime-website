import React, {useState, useEffect} from 'react'
import findTotalEpisodes from '../utils/findEpisodes'
import axios from 'axios'
import listHandler from '../utils/listHandler'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function List({
    label,
    listName,
}) {
    const [list, setList] = useState(null)
    const [totalEpisodes, setTotalEpisodes] = React.useState(Array(5).fill(null))

    const navigate = useNavigate()

    useEffect(() => {
      listHandler(listName,1).then((res) => {
        setList(res)
      })
    }, [])

    // list&& console.log(list);
   
    React.useEffect(() => {
        list && list.forEach((e,index) => {
          findTotalEpisodes(e.id).then((res) => {
              setTotalEpisodes((prev) => {
                  const newRes = [...prev]
                  newRes[index] = res
                  return newRes
              })
          })
        })
    }, [list])

  return (
    <div className={`w-full cursor-default`}>
      <h1 className='text-[#D9232E] xl:text-3xl lg:text-2xl text-xl p-2 font-bold'>{label}</h1>
      {
        list && list.map((anime, index) => index>4? null:(
            <div key={anime.name} className={`w-full`} onClick={() => navigate(`${anime.id}`)}>
                <div className='flex py-3 px-2'>
                    <div className='w-1/6 flex-shrink-0 '>
                        <img src={anime.poster} alt="" 
                        className='w-full h-full rounded-lg aspect-[2/3]'/>
                    </div>
                    <div className='p-3 w-5/6 flex flex-col flex-grow-1 justify-center'>
                        <h3 className='text-white truncate xl:text-xl lg:text-lg text-xs hover:text-[#D9232E]'>{anime.name}</h3>
                        <div className='flex items-center'>
                            <span className='bg-[#b0e3af] rounded-tr-none rounded-br-none rounded text-[12px] font-bold px-2 py-0.5 mr-[1px]'>
                              {totalEpisodes[index]? totalEpisodes[index].sub:''}</span>
                            <span className={`bg-[#e3b5cd] rounded-tl-none rounded-bl-none rounded text-[12px] font-bold px-2 py-0.5 ml-[1px] 
                              ${totalEpisodes[index]? totalEpisodes[index].dub?null:'hidden':null}`}>
                              {totalEpisodes[index]? totalEpisodes[index].dub:''}</span>
                            <span className='text-gray-300 ml-2'>TV</span>
                        </div>
                    </div>
                </div>
                <div className='w-[95%] h-[1px] bg-slate-600 opacity-40'></div>
            </div>
        ))
      }
      <Link to={`home/${listName}?page=1`} className='text-white mt-3'>View more {'>'}</Link>
    </div>
  )
}

export default List
