import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation, useParams, Outlet } from 'react-router-dom'

import { asyncloadperson } from '../store/reducers/actions/personActions'
import Loading from './Loading'
import HorizontalCards from './templates/HorizontalCards'
import Dropdown from './templates/Dropdown'


function Persondetails() {
  const[category,setcategory]=useState("movie")
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch()
  // console.log(info)
  // console.log(dispatch)
  useEffect(() => {
    dispatch(asyncloadperson(id))
  }, [id])
  return info ? (
    <div className='px-[10%] w-screen h-[200vh] bg-[#1F1E24]'>
      <nav className='h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl'>
        <Link
          onClick={() => navigate(-1)}
          className='hover:text-[#6556CD] ri-arrow-left-line'

        ></Link>
      </nav>
      <div className='w-full flex'>
        {/* Part 2 left poster and Details */}
        <div className='w-[20%]'>
          <img
            className='shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-[21vh] h-[30vh] object-cover'
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path
              }`} alt="" />
          <hr className='mt-7 mb-4 border-none h-[2px] bg-zinc-500' />
         {/*social media links  */}
          <div className='text-xl text-white flex gap-x-5'>
            <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
              <i className='ri-earth-fill'></i>
            </a>
            <a target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
              <i className='ri-facebook-circle-fill'></i>
            </a>
            <a target='_blank' href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
              <i className='ri-instagram-fill'></i>
            </a>
            <a target='_blank' href={`https://www.twitter.com/${info.externalid.twitter_id}`}>
              <i className='ri-twitter-x-fill'></i>
            </a>
          </div>
          {/* person information */}
          <h1 className='text-xl text-zinc-400 font-semibold my-1'>
            Person Info
          </h1>
          <h1 className='text-md text-zinc-400 font-semibold '>
            Known For
          </h1>
          <h1 className='text-sm text-zinc-400'>
            {info.detail.known_for_department}
          </h1>
          <h1 className='text-md text-zinc-400 font-semibold'>
            Gender
          </h1>
          <h1 className='text-sm text-zinc-400'>
            {info.detail.gender===2? "Male":"Female"}
          </h1>
          <h1 className='text-md text-zinc-400 font-semibold'>
          Birthday
          </h1>
          <h1 className='text-sm text-zinc-400'>
            {info.detail.birthday}
          </h1>
          <h1 className='text-md text-zinc-400 font-semibold'>
          Deathday
          </h1>
          <h1 className='text-sm text-zinc-400'>
            {info.detail.deathday
             ?info.detail.deathday
             :"Still Alive"}
          </h1>
          <h1 className='text-md text-zinc-400 font-semibold'>
          Place of Birth
          </h1>
          <h1 className='text-sm text-zinc-400'>
            {info.detail.place_of_birth}
          </h1>
          <h1 className='text-md text-zinc-400 font-semibold'>
          Also Known As
          </h1>
          <h1 className='text-sm text-zinc-400'>
            {info.detail.also_known_as.join(', ')}
          </h1>
     

            

          


            
        </div>
       <div className='w-[80%] ml-[5%]'>
       <h1 className='text-5xl text-zinc-400 font-bold my-1'>
          {info.detail.name}
          </h1>
          <h1 className='text-lg text-zinc-400 font-semibold '>
           Biography
          </h1>
          <p className=' text-zinc-400 mt-2'>
          {info.detail.biography}
          </p>
          <h1 className='text-lg text-white font-semibold '>
           Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast}/>
        <div className='w-full flex justify-between'>
        <h1 className='text-xl mt-4 text-zinc-400 font-semibold '>
           Acting
          </h1>
          <Dropdown title="Category" 
                    options={["tv","movie"]}
                    func={(e)=>(e.target.value)}/>
        </div>
        <div className='list-disc text-zinc-400 w-full h-[60vh] mt-5 overflow-x-hidden overflow-y-auto
        shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-600 p-3 px-6'>
          {info[category+"Credits"].cast.map((c,i)=>(
            <li key={i} className='hover:text-white p-5 px-7 rounded hover:bg-[#1919d]'>
              <Link 
                to={`/${category}/details/${c.id}`}
                >
              <span>
                {c.name||c.title||
                c.original_name||
                c.original_title
                }
              </span>
              <span className='block ml-5'>
                {c.character&&`Character Name: ${c.character}`}
              </span>
              </Link>
            </li>
          ))}
        </div>

       </div>
      </div>


    </div>)

    : <Loading />
}

export default Persondetails
