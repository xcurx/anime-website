import React from 'react'
import { Link } from 'react-router-dom'

function Footer({info}) {
  return (
    <div>
       <div className='w-full place-content-evenly bg-[#2c2c2c] flex flex-wrap text-white my-3 p-3'>
                {
                    info && info.genres.map((genre) => (
                      <div key={genre} className='py-2 bg-[] flex-auto m-auto hover:text-[#8800ff] px-3 rounded-xl font-bold mr-auto cursor-pointer truncate'>
                         <Link to={`/genre/${genre.split(' ').map((e) => e[0].toLowerCase()+e.slice(1)).join('-')}?page=1`}>{genre}</Link> 
                      </div>
                    ))
                }
       </div>
    </div>
  )
}

export default Footer
