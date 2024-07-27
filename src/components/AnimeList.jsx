import React, { useEffect, useState } from 'react'
import { List, MiniCarousel }from './index';

function AnimeList({info}) {

  return info && (
    <div className='w-full mt-2 p-2'> 
      <MiniCarousel info={info}/>
      
      <div className='grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-5 p-2'>
          <List label={'Top Airing'} listName={'top-airing'}/>
          <List label={'Most Popular'} listName={'most-popular'}/> 
          <List label={'Most Favorite'} listName={'most-favorite'}/> 
          <List label={'Latest Completed'} listName={'completed'}/> 
      </div>
    </div>

  )
}

export default AnimeList
