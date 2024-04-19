import React from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import {  useSelector } from 'react-redux'

import ReactPlayer from 'react-player'
import NotFound from './NotFound';


function Trailer() {
  const navigate=useNavigate();
  const {pathname}=useLocation();
  const category=pathname.includes("movie")?"movie":"tv";
  const ytvideo = useSelector((state)=>state[category].info.videos);
  // console.log(pathname,ytvideo)
  return(
    <div className='bg-[rgba(0,0,0,.9)] absolute z-[100] top-0 left-0 w-screen h-screen flex
     items-center justify-center'>
      <Link
       onClick={()=>navigate(-1)}
       className='absolute hover:text-[#6556CD] text-5xl ri-close-fill text-white right-[5%]
       top-[5%]'
      ></Link>'
      {ytvideo?( <ReactPlayer
      controls
         height={400}
         width={1000}
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}/>
      ):(<NotFound/>)}
      
    </div>
  )
}

export default Trailer
