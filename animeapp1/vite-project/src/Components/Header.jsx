import React from "react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Upcoming from "./Upcoming";

const base_url = 'https://api.jikan.moe/v4';

const Header = () => {
    const [search, setSearch] = useState('');
    const [searchAnimeList, setSearchAnimeList] = useState([]);

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
      }
  
      const handleSubmit = (e) => {
        e.preventDefault();
        if(search){
          searchAnime(search);
          document.querySelector('.searchAnime').style.display = 'grid';
        }
        else{
          return;
        }
  
      }
  
      const searchAnime = async (anime) => {
        const response = await fetch(`${base_url}/anime?q=${anime}&order_by=popularity&sort=asc&nsfw`);
        const data = await response.json();
        setSearchAnimeList(data.data);
      }

    return (
        <div className="header">
            <header>
                <nav className="navbar">
                    <h1>OurAnime</h1>
                    <ul className="navlist">
                        <li className="navitem">
                            <form onSubmit={handleSubmit}>
                                <input onChange={handleChange} value={search} type="text" placeholder="Search Anime"></input>
                                <button type="submit">Search</button>
                            </form>
                        </li>
                        <li className="navitem popular">
                          <NavLink to={`/`}>
                            Popular Anime
                          </NavLink>
                        </li>
                        <li className="navitem upcoming">
                          <NavLink to={`/upcoming`}>
                            Upcoming Anime
                          </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="searchAnime" style={{display: 'none'}}>
            {
              searchAnimeList?.length > 0 ?
              (
                searchAnimeList.map(anime => {
                  return (
                    <>
                    <div className='searchAnimeList' loading='lazy'>
                        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img width='150px' height='200px' key={anime.mal_id} src={anime.images.jpg.large_image_url}/>
                        </Link>
                        <p>{anime.title}</p>
                    </div>
                    </>
                  )
                })
              ) : (
                <></>
              )
            }
            </div>
        </div>
    );
}

export default Header;