import React, { useState, useEffect } from 'react';
import Topnav from './templates/Topnav';
import { useNavigate } from 'react-router-dom';
import Dropdown from './templates/Dropdown';
import axios from '../utils/axios';
import Loading from './Loading';
import Cards from './templates/Cards';
import InfiniteScroll from 'react-infinite-scroll-component';

function Trending() {
    const navigate = useNavigate();
    const [category, setCategory] = useState("all");
    const [duration, setDuration] = useState("day");
    const [trending, setTrending] = useState([]);
    const [page,setpage]=useState(1)
    const [hasMore, setHasMore] = useState(true)
  
    document.title="Movietube | Trending " 
    // + category.toUpperCase()
    const getHeaderTrending = async () => {
        try {
            const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
            // setTrending(data.results);
            if(data.results.length > 0) {
            setTrending((prev)=>[...prev,...data.results])
            setpage(page+1)}
            else{
                   setHasMore(false);
            }
            console.log(trending)
        } catch (error) {
            console.log("Error: ", error);
        }
    }
 const refreshHandler=()=>{
    if(trending.length===0){
        getHeaderTrending()
    }else{
        setpage(1)
        setTrending([])
        getHeaderTrending()
        //if duration or trending changesthen
    }
 }
    useEffect(() => {
       refreshHandler()
    }, [category, duration]);
      
    return trending.length>0 ? (
        <div className=' w-screen h-screen'>
            <div className='w-full px-[5%] flex justify-between items-center'>
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-2"></i>
                    Trending
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown 
                        title="Category"
                        options={["movie", "tv", "all"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                    <div className='w-[2%]'></div>
                    <Dropdown 
                        title="Duration"
                        options={["week", "day"]}
                        func={(e) => setDuration(e.target.value)}
                    />
                </div>
            </div>
            <InfiniteScroll 
                dataLength={trending.length}
                next={getHeaderTrending}
                hasMore={hasMore}
                loader={<h1>Loading..</h1>}>
            <Cards data={trending} title={category} />
 
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
}

export default Trending;
