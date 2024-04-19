import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import noimage from '/noimage.png'

function Topnav() {
    const[query,setQuery] =useState("")

    // console.log(query)
    const[searches,setSerches] = useState([]);
    const GetSearches=async ()=>{
      try {
        const {data}=await axios.get(`/search/multi?query=${query}`);
       
        setSerches(data.results);
      } catch (error) {
        console.log("Error: " ,error);
      }
    }
    useEffect(()=>{
      GetSearches();
    },[query])
  return (
    <div className='w-[80%] mx-auto h-[10vh] relative flex items-center'>
      <i className='text-zinc-400 text-lg  ri-search-line'></i>
       <input
       onChange={(e)=>setQuery(e.target.value)}
       value={query}
       className='w-[70%] text-zinc-200  p-5 text-lg bg-transparent outline-none border-none'
       type="text"
       placeholder="search anything"
       />
       {query.length > 0 && (
        <i onClick={()=>setQuery("")} class=' right-0 text-zinc-400 text-3xl ri-close-fill'></i>
       )}
       <div className='z-[100] absolute w-[70%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto '>
        {searches.map((items,index) => (
              <Link 
              to={`/${items.media_type}/details/${items.id}`}
              key={index}
              className='hover:text-black hover:bg-zinc-300 duration-300 font-semibold p-10
              text-zinc-600 w-[100%] flex justify-start items-center border-b-2 border-zinc-100'>
              <img
                 className='w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg'
              src={
              items.backdrop_path || items.profile_path?
              `https://image.tmdb.org/t/p/original/${
                items.backdrop_path || items.profile_path
              }`:noimage} alt="" />
              <span>{items.name||items.original_name||items.original_title}</span>
               </Link>
        ))}
      
        
       
     
       </div>
      
    
    </div>
  )
}

export default Topnav
