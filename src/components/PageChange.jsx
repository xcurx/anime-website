import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

function PageChange({totalPages, currentPage, totalButtons=3}) {
    const navigate = useNavigate()
    const query = useQuery().get('query')
    const path = useLocation().pathname
    // console.log((path));

    function pathSpecifier(page=1){
        if(query){
            return `${path}?query=${query}&page=${page}`
        }else{
            return `${path}?page=${page}`
        }
    }

    function pageDetector(position){
        if(currentPage == 1 && totalPages>=position){
            return position
        }else if(totalPages > totalButtons){
            const middle = Math.ceil(totalButtons/2)
            // if((totalPages - currentPage <= 0 && position>middle) || position>middle+totalPages - currentPage) return null
            if(totalPages - currentPage < totalButtons-middle){
                return totalPages-totalButtons+position
            }
            if(position > totalButtons) return null
            if(position != middle) return currentPage-middle+position
            if(position == middle) return currentPage
        }else{
            if(position <= totalPages) return position
        }
    }

  return (
    <div className='text-white flex gap-2 p-1 mb-1'>
        <div onClick={() => navigate(pathSpecifier(1))} 
         className={`${currentPage==1?'hidden':'visible'} w-10 h-10 flex justify-center items-center rounded-[50%] bg-gray-500 cursor-pointer`}
        >
            {'<<'}
        </div>
        <div onClick={() => navigate(pathSpecifier(currentPage-1))} 
         className={`${currentPage==1?'hidden':'visible'} w-10 h-10 flex justify-center items-center rounded-[50%] bg-gray-500 cursor-pointer`}
        >
            {'<'}
        </div>
        {
            (
                <>
                    {
                        Array.from({length:totalButtons}).fill(0).map((_,index) => (
                            <div contentEditable="false" tabIndex={-1} onClick={(e) => navigate(pathSpecifier(e.target.innerHTML))} 
                             className={`w-10 h-10 flex justify-center items-center rounded-[50%] ${pageDetector(index+1)==currentPage?'bg-red-500':'bg-gray-500'} ${pageDetector(index+1)?'visible':'hidden'} cursor-pointer`}
                             onFocus={(e) => e.target.blur()}
                            >
                                {pageDetector(index+1)}
                            </div>
                        ))
                    }
                </>
            )
        }
        <div onClick={() => navigate(pathSpecifier(currentPage+1))} className={`${currentPage==totalPages?'hidden':'visible'} w-10 h-10 flex justify-center items-center rounded-[50%] bg-gray-500 cursor-pointer`}>{'>'}</div>
        <div onClick={() => navigate(pathSpecifier(totalPages))} className={`${currentPage==totalPages?'hidden':'visible'} w-10 h-10 flex justify-center items-center rounded-[50%] bg-gray-500 cursor-pointer`}>{'>>'}</div>
    </div>
  )
}

export default PageChange
