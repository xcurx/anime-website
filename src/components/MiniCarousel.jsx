import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function MiniCarousel({info}) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [visibleSlides, setVisibleSlides] = useState(6)
  const navigate = useNavigate()

  function showSlides(){
      const carouselInner = document.querySelector('.carousel-inner');
      const totalSlides = 10;
  
      const maxIndex = totalSlides - visibleSlides;
      if (currentSlide > maxIndex) {
          setCurrentSlide(0);
      } else if (currentSlide < 0) {
          setCurrentSlide(maxIndex)
      }
  
      const offset = currentSlide * (100 / visibleSlides);
      carouselInner.style.transform = `translateX(-${offset}%)`;
  }  

  useEffect(() => {
    if(window.innerWidth > 1024){
      setVisibleSlides(6)
    }else if(window.innerWidth < 1024 && window.innerWidth>768){
      setVisibleSlides(4)
    }else{
      setVisibleSlides(3)
    }
  }, [window.innerWidth])
  

  useEffect(() => {
    showSlides()
  }, [currentSlide])

  return (
    <div className='relative'>
         <h1 className='text-[#D9232E] xl:text-3xl text-2xl font-bold p-2'>Trending</h1>
         <div className='relative w-full overflow-hidden rounded-lg shadow-lg'>
            <div className='carousel-inner flex duration-[0.5s] ease'>
              {
                info.trendingAnimes && info.trendingAnimes.map((anime) => (
                  <div onClick={() => navigate(`${anime.id}`)} key={anime.name} className='carousel-item flex-none lg:w-1/6 md:w-1/4 w-1/3 md:p-2 p-1'>
                    <img src={anime.poster} alt={anime.name} className={`w-full aspect-[2/3]`}/>
                    <div className='text-white w-full overflow-hidden whitespace-nowrap text-ellipsis xl:text-xl lg:text-lg text-xs'>
                      <span className='text-[#D9232E] font-bold'>{anime.rank.toString().padStart(2,'0')} </span>
                      {anime.name}</div>
                  </div>
                ))
              }
            </div>
         </div>
         <button onClick={() => {setCurrentSlide(currentSlide-1)}} className='absolute left-0 p-1 top-[50%] bg-red-700'>{`<`}</button>
         <button onClick={() => {setCurrentSlide(currentSlide+1)}} className='absolute right-0 p-1 top-[50%] bg-red-700'>{`>`}</button>
    </div>
  )
}

export default MiniCarousel
