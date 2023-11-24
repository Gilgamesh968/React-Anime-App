import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const base_url = 'https://api.jikan.moe/v4';

const Upcoming = () => {
    const [upcomingAnime, setUpcomingAnime] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(21);
    const [firstPage, setFirstPage] = useState(1);
    const [lastPage, setLastPage] = useState(0)

    const getUpcomingAnime = async () => {
        const response = await fetch(`${base_url}/seasons/upcoming?limit=${postsPerPage}&page=${currentPage}`);
        const data = await response.json();
        setUpcomingAnime(data.data);
        setCurrentPage(data.pagination.current_page);
        setPostsPerPage(data.pagination.items.per_page)
        setFirstPage(1);
        setLastPage(data.pagination.last_visible_page);
    }

    useEffect(() => {
        getUpcomingAnime();
    }, [currentPage])

    return (
      <>
      <Header />
        <h1 className="upcomingTitle">Upcoming Anime</h1>
        <div className="upcomingAnime">
          {
            upcomingAnime?.length > 0 ? (
              upcomingAnime?.map(upcoming => {
                return (
                  <div className="upcominginfo" loading='lazy'>
                    <Link to={`/anime/${upcoming.mal_id}`} key={upcoming.mal_id}>
                      <img width='150px' height='200px' src={upcoming.images.jpg.large_image_url} />
                    </Link>
                    <p>{upcoming.title}</p>
                  </div>
                )
              })
            ) : (
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

export default Upcoming;