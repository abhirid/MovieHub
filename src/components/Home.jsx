import React, { useEffect, useState } from 'react'
import Sidebar from './templates/Sidebar'
import Topnav from './templates/Topnav'
import axios from '../utils/axios';
import Header from './templates/Header';
import HorizontalCards from './templates/HorizontalCards';
import Dropdown from './templates/Dropdown';
import Loading from './Loading';


function Home() {
  document.title = "Home"

  const [wallaper, setWallpaper] = useState(null);

  const [trending, settrending] = useState(null);
  const [category, setCategory] = useState("all");

  const GetHeaderWallpaer = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomdata);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  const GetHeaderTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);

      settrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  }


  useEffect(() => {
    !wallaper && GetHeaderWallpaer();
    GetHeaderTrending();

  }, [category]);

  return wallaper && trending ? (
    <>
      <Sidebar />
      <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
        <Topnav />
        <Header data={wallaper} />
        <div className='p-5 flex justify-between'>

          <h1 className='text-4xl font-semibold text-zinc-400'>
            Trending
          </h1>
          <Dropdown title="Filter" options={['all','tv', 'movie' ]} 
          func={(e)=>setCategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading/>
  );
}

export default Home
