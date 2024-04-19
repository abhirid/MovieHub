import React, { useState, useEffect } from 'react';
import Topnav from './templates/Topnav';
import { useNavigate } from 'react-router-dom';
import Dropdown from './templates/Dropdown';
import axios from '../utils/axios';
import Loading from './Loading';

import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';

function Tvshows() {
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tv, settv] = useState([]);
    const [page,setpage]=useState(1)
    const [hasMore, setHasMore] = useState(true)
     
    document.title="Movietube | TV " 

    
    const Gettv = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            // settv(data.results);
            console.log(data)
            if(data.results.length > 0) {
            settv((prev)=>[...prev,...data.results])
            setpage(page+1)}
            else{
                   setHasMore(false);
            }
            console.log(tv)
        } catch (error) {
            console.log("Error: ", error);
        }
    }
 const refreshHandler=()=>{
    if(tv.length===0){
        Gettv()
    }else{
        setpage(1)
        settv([])
        Gettv()
        //if duration or tv changesthen
    }
 }
    useEffect(() => {
       refreshHandler()
    }, [category]);
    console.log(tv)
  return tv.length>0 ? (
    <div className=' w-screen h-screen m-3 overflow-x-hidden'>
        <div className='w-full px-[5%]  flex justify-between items-center'>
            <h1 className='text-2xl font-semibold text-zinc-400'>
                <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-2"></i>
                TV
                <small className='ml-2 text-sm text-zinc-600'>({category})</small>
            </h1>
            <div className='flex items-center w-[80%]'>
                <Topnav />
                <Dropdown 
                    title="Category"
                    options={["on_the_air","popular", "top_rated","airing_today"]}
                    func={(e) => setCategory(e.target.value)}
                />
                <div className='w-[2%]'></div>
              
            </div>
        </div>
        <InfiniteScroll 
            dataLength={tv.length}
            next={Gettv}
            hasMore={hasMore}
            loader={<h1>Loading..</h1>}>
        <Cards data={tv} title='tv' />

        </InfiniteScroll>
    </div>
) : (
    <Loading />
);
}

export default Tvshows
