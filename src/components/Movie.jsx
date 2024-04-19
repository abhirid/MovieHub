import React, { useState, useEffect } from 'react';
import Topnav from './templates/Topnav';
import { useNavigate } from 'react-router-dom';
import Dropdown from './templates/Dropdown';
import axios from '../utils/axios';
import Loading from './Loading';

import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';

function Movie() {
    const navigate = useNavigate();
    const [category, setCategory] = useState("now_playing");
    const [movie, setmovie] = useState([]);
    const [page,setpage]=useState(1)
    const [hasMore, setHasMore] = useState(true)
     
    document.title="Movietube | Movies " 

    
    const GetMovie = async () => {
        try {
            const { data } = await axios.get(`/movie/${category}?page=${page}`);
            // setmovie(data.results);
            console.log(data)
            if(data.results.length > 0) {
            setmovie((prev)=>[...prev,...data.results])
            setpage(page+1)}
            else{
                   setHasMore(false);
            }
            console.log(movie)
        } catch (error) {
            console.log("Error: ", error);
        }
    }
 const refreshHandler=()=>{
    if(movie.length===0){
        GetMovie()
    }else{
        setpage(1)
        setmovie([])
        GetMovie()
        //if duration or movie changesthen
    }
 }
    useEffect(() => {
       refreshHandler()
    }, [category]);
  return movie.length>0 ? (
    <div className=' w-screen h-screen m-3'>
        <div className='w-full px-[5%]  flex justify-between items-center'>
            <h1 className='text-2xl font-semibold text-zinc-400'>
                <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-2"></i>
                Movie 
                <small className='ml-2 text-sm text-zinc-600'>({category})</small>
            </h1>
            <div className='flex items-center w-[80%]'>
                <Topnav />
                <Dropdown 
                    title="Category"
                    options={["popular", "top_rated","upcoming","now_playing"]}
                    func={(e) => setCategory(e.target.value)}
                />
                <div className='w-[2%]'></div>
              
            </div>
        </div>
        <InfiniteScroll 
            dataLength={movie.length}
            next={GetMovie}
            hasMore={hasMore}
            loader={<h1>Loading..</h1>}>
        <Cards data={movie} title='movie' />

        </InfiniteScroll>
    </div>
) : (
    <Loading />
);
}

export default Movie
