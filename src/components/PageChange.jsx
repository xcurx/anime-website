import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function useQuery(){
    return new URLSearchParams(useLocation().search)
  }

function PageChange({totalPages, hasNextPage, currentPage}) {
    const navigate = useNavigate()
    const {list} = useParams()
    const query = useQuery().get('query')
    const path = useLocation().pathname
    console.log((path));

  return (
    <div className='text-white flex gap-2 p-1 mb-1'>
        <div onClick={() => navigate(query?`${path}?query=${query}&page=1`:`${path}?page=1`)} className={`${currentPage==1?'hidden':'visible'} w-10 h-10 flex justify-center items-center rounded-[50%] bg-gray-500 cursor-pointer`}>{'<<'}</div>
        <div onClick={() => navigate(query?`${path}?query=${query}&page=${currentPage-1}`:`${path}?page=${currentPage-1}`)} className={`${currentPage==1?'hidden':'visible'} w-10 h-10 flex justify-center items-center rounded-[50%] bg-gray-500 cursor-pointer`}>{'<'}</div>
        {
            (
                <>
                <div onClick={(e) => navigate(query?`${path}?query=${query}&page=${e.target.innerHTML}`:`${path}?page=${e.target.innerHTML}`)} className={`w-10 h-10 flex justify-center items-center rounded-[50%] ${currentPage == (currentPage==1?'1':`${currentPage-1}`)?'bg-red-500':'bg-gray-500'} cursor-pointer`}>{currentPage==1?'1':`${currentPage-1}`}</div>
                <div onClick={(e) => navigate(query?`${path}?query=${query}&page=${e.target.innerHTML}`:`${path}?page=${e.target.innerHTML}`)} className={`w-10 h-10 flex justify-center items-center rounded-[50%] ${currentPage == (currentPage==1?'2':`${currentPage}`)?'bg-red-500':'bg-gray-500'} cursor-pointer`}>{currentPage==1?'2':`${currentPage}`}</div>
                <div onClick={(e) => navigate(query?`${path}?query=${query}&page=${e.target.innerHTML}`:`${path}?page=${e.target.innerHTML}`)} className={`w-10 h-10 flex justify-center items-center rounded-[50%] ${currentPage == (currentPage==1?'3':`${currentPage+1>totalPages?'':currentPage+1}`)?'bg-red-500':'bg-gray-500 '} ${currentPage+1>totalPages?'hidden':'visible'} cursor-pointer`}>{currentPage==1?'3':`${currentPage+1>totalPages?'':currentPage+1}`}</div>
                </>
            )
        }
        <div onClick={() => navigate(query?`${path}?query=${query}&page=${currentPage+1}`:`${path}?page=${currentPage+1}`)} className={`${currentPage==totalPages?'hidden':'visible'} w-10 h-10 flex justify-center items-center rounded-[50%] bg-gray-500 cursor-pointer`}>{'>'}</div>
        <div onClick={() => navigate(query?`${path}?query=${query}&page=${totalPages}`:`${path}?page=${totalPages}`)} className={`${currentPage==totalPages?'hidden':'visible'} w-10 h-10 flex justify-center items-center rounded-[50%] bg-gray-500 cursor-pointer`}>{'>>'}</div>
    </div>
  )
}

export default PageChange
