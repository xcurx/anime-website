import React from 'react'
import { useLocation } from 'react-router-dom'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

function SearchPage() {
  const query = useQuery()
  const searchQuery = query.get('query')

  return (
    <div className='text-white'>
      {searchQuery}
    </div>
  )
}

export default SearchPage
