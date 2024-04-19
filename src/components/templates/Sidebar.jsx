import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <>
     <div className='w-[20%]  h-full bg-[#1F1E24] border-r-2 border-zinc-400 p-10'>
        <h1 className='text-2xl text-white font-bold'>
        <i class="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span className='text-2xl'>Movies</span> 
        </h1>
        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
        <h1 className='text-white font-semibold text-xl mt-5 mb-2'>New Feeds</h1>
        
        <Link to="/trending" className='hover:bg-[#6556CD] text-[16px] hover:text-white duration-300 rounded-lg p-1 mb-1'>
        <i class="ri-fire-fill mr-2"></i>
            Trending</Link>
        <Link to="/popular" className='hover:bg-[#6556CD] text-[16px] hover:text-white duration-300 rounded-lg p-1 mb-1'>
        <i class="ri-bard-fill mr-2"></i>Popular</Link>
        <Link to="/movie" className='hover:bg-[#6556CD] text-[16px] hover:text-white duration-300 rounded-lg p-1 mb-1'>
        <i class="ri-movie-2-fill mr-2"></i>
            Movies</Link>
        <Link  to="/tv" className='hover:bg-[#6556CD] text-[16px] hover:text-white duration-300 rounded-lg p-1 mb-1'>
        <i class="ri-tv-2-fill mr-2"></i>
            Tv Shows</Link>
        <Link to="/person" className='hover:bg-[#6556CD] text-[16px] hover:text-white duration-300 rounded-lg p-1 mb-1'>
        <i class="ri-team-fill mr-2"></i>
            Peoples</Link>
        </nav>
      
        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
        <h1 className='text-white font-semibold text-xl mt-3.5 mb-2'>Website Information</h1>
        
        <Link className='hover:bg-[#6556CD] text-[16px] hover:text-white duration-300 rounded-lg p-1 mb-1'>
        <i class="ri-information-fill mr-2"></i>
            About</Link>
        <Link className='hover:bg-[#6556CD] text-[16px] hover:text-white duration-300 rounded-lg p-1 mb-1'>
        <i class="ri-phone-fill mr-2"></i>
           Contact Us</Link>
        
        </nav>
       

        
        </div> 
    </>
  )
}

export default Sidebar
