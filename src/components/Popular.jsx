import React, { useState, useEffect } from 'react';
import Topnav from './templates/Topnav';
import { useNavigate } from 'react-router-dom';
import Dropdown from './templates/Dropdown';
import axios from '../utils/axios';
import Loading from './Loading';

import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';

function Popular() {
    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    const [popular, setpopular] = useState([]);
    const [page,setpage]=useState(1)
    const [hasMore, setHasMore] = useState(true)
     
    document.title="Movietube | Popular " 

    
    const GetPopular = async () => {
        try {
            const { data } = await axios.get(`${category}/popular?page=${page}`);
            // setpopular(data.results);
            console.log(data)
            if(data.results.length > 0) {
            setpopular((prev)=>[...prev,...data.results])
            setpage(page+1)}
            else{
                   setHasMore(false);
            }
            console.log(popular)
        } catch (error) {
            console.log("Error: ", error);
        }
    }
 const refreshHandler=()=>{
    if(popular.length===0){
        GetPopular()
    }else{
        setpage(1)
        setpopular([])
        GetPopular()
        //if duration or popular changesthen
    }
 }
    useEffect(() => {
       refreshHandler()
    }, [category]);
    return popular.length>0 ? (
        <div className=' w-screen h-screen m-3'>
            <div className='w-full px-[5%]  flex justify-between items-center'>
                <h1 className='text-2xl font-semibold text-zinc-400'>
                    <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-2"></i>
                    Popular
                </h1>
                <div className='flex items-center w-[80%]'>
                    <Topnav />
                    <Dropdown 
                        title="Category"
                        options={["movie", "tv"]}
                        func={(e) => setCategory(e.target.value)}
                    />
                    <div className='w-[2%]'></div>
                  
                </div>
            </div>
            <InfiniteScroll 
                dataLength={popular.length}
                next={GetPopular}
                hasMore={hasMore}
                loader={<h1>Loading..</h1>}>
            <Cards data={popular} title={category} />
 
            </InfiniteScroll>
        </div>
    ) : (
        <Loading />
    );
}

export default Popular
