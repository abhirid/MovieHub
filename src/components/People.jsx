import React, { useState, useEffect } from 'react';
import Topnav from './templates/Topnav';
import { useNavigate } from 'react-router-dom';
import Dropdown from './templates/Dropdown';
import axios from '../utils/axios';
import Loading from './Loading';

import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';

function People() {
    const navigate = useNavigate();
    const [category, setCategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [page,setpage]=useState(1)
    const [hasMore, setHasMore] = useState(true)
     
    document.title="Movietube | Person " 

    
    const Getperson = async () => {
        try {
            const { data } = await axios.get(`/person/${category}?page=${page}`);
            // setperson(data.results);
            console.log(data)
            if(data.results.length > 0) {
            setperson((prev)=>[...prev,...data.results])
            setpage(page+1)}
            else{
                   setHasMore(false);
            }
            console.log(person)
        } catch (error) {
            console.log("Error: ", error);
        }
    }
 const refreshHandler=()=>{
    if(person.length===0){
        Getperson()
    }else{
        setpage(1)
        setperson([])
        Getperson()
        //if duration or person changesthen
    }
 }
    useEffect(() => {
       refreshHandler()
    }, [category]);
  return person.length>0 ? (
    <div className=' w-screen h-screen m-2'>
        <div className='w-full px-[5%]  flex justify-between items-center'>
            <h1 className='text-2xl font-semibold text-zinc-400'>
                <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line "></i>
                Person 
                {/* <small className='ml-2 text-sm text-zinc-600'>({category})</small> */}
            </h1>
            <div className='flex items-center w-[80%]'>
                <Topnav />
               
                <div className='w-[2%]'></div>
              
            </div>
        </div>
        <InfiniteScroll 
            dataLength={person.length}
            next={Getperson}
            hasMore={hasMore}
            loader={<h1>Loading..</h1>}>
        <Cards data={person} title="person" />

        </InfiniteScroll>
    </div>
) : (
    <Loading />
);
}

export default People
