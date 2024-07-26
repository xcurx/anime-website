import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleProgress } from '../store/loaderSlice'

function Card({data, steps}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const progress = useSelector((state) => state.loader.progress)

  return (
    <div className='w-full relative'
     onClick={() => navigate(`/${data.id}`)}
    >
      <div className='absolute text-white font-bold top-2 left-2 bg-[#D9232E] rounded px-1'>{data.rating}</div>
      <img src={data.poster} alt="" 
       className='w-full aspect-[3/4]'
       onLoad={() => {
        dispatch(handleProgress({progress: progress+steps}))
      }}
      />
       <div>
          <div className='text-white text-xl truncate'>{data.name}</div>
          <div className='text-gray-400 text-sm'>{data.duration}<span className='px-1 font-bold'>·</span>{data.type}</div>
       </div>
    </div>
  )
}

export default Card
