import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const base_url = 'https://api.jikan.moe/v4';

const Popular = () => {
    const [topAnime, setTopAnime] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(21);
    const [firstPage, setFirstPage] = useState(1);
    const [lastPage, setLastPage] = useState(0)
    const getPopularAnime = async () => {
        const response = await fetch(`${base_url}/top/anime?limit=${postsPerPage}&page=${currentPage}`)
        const data = await response.json();
        setTopAnime(data.data); 
        setCurrentPage(data.pagination?.current_page);
        setPostsPerPage(data.pagination?.items.per_page)
        setFirstPage(1);
        setLastPage(data.pagination?.last_visible_page);
    }

    useEffect(() => {
          getPopularAnime();
      }, [currentPage])
    
    return (
      <>
      <Header />
      <h1 className="popularTitle">Popular Anime</h1>
        <div className="popularAnime">
            {
          topAnime?.length > 0 ?
          (
            topAnime?.map(anime => {
              return (
                <>
                <div className='animeinfo' loading='lazy'>
                    <Link to={`anime/${anime.mal_id}`} key={anime.mal_id}>
                    <img width='150px' height='200px' key={anime.mal_id} src={anime.images.jpg.large_image_url}/>
                    </Link>
                    <p>{anime.title}</p>
                </div>
                </>
              )
            })
          )
          : (
            <></>
          )
        }
        </div>
        <div className="popularPage">
          {
            currentPage <= 1 ? (
              <>
            <button disabled onClick={() => setCurrentPage(firstPage)}>{'<<'}</button>
              <button disabled onClick={() => (setCurrentPage(currentPage - 1))}>{'<'}</button>
              <label>{(currentPage)}</label>
              <button onClick={() => (setCurrentPage(currentPage + 1))}>{'>'}</button>
              <button onClick={() => setCurrentPage(lastPage)}>{'>>'}</button>
              </>
            ) : (
              <>
              <button onClick={() => setCurrentPage(firstPage)}>{'<<'}</button>
              <button onClick={() => setCurrentPage(prev => prev - 1)}>{'<'}</button>
              <label>{(currentPage)}</label>
              <button onClick={() => (setCurrentPage(prev => prev + 1))}>{'>'}</button>
              <button onClick={() => setCurrentPage(lastPage)}>{'>>'}</button>
              </>
            )
          }
        </div>
      </>
    );
}

export default Popular;