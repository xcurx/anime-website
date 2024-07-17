import React from 'react'

function Navbar() {
  return (
    <div className='w-full bg-[#3d3a3a] bg-opacity-25 p-2 flex justify-between xl:text-2xl lg:text-xl text-xs'>
      <span className='text-red-500'>Logo</span>
      <div className='flex gap-8'>
          <input type="text"
          className='border-[red] border rounded bg-transparent px-2' 
          placeholder='Search'/>
          <button className='text-red-500 border-[red] border rounded px-4 py-1'>Login</button>
      </div>
    </div>
  )
}

export default Navbar
