import React, { useEffect, useState } from "react";
import { NavLink, resolvePath, useParams } from "react-router-dom";
import Header from "./Header";
import Characters from "./Characters";

const AnimeItem = () => {
    const {id} = useParams();
    const [anime, setAnime] = useState([]);
    const [animeStreaming, setAnimeStreaming] = useState([]);
    const [animeTheme, setAnimeTheme] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const data = await response.json();
        setAnime(data.data);
        console.log(data.data);
    }

    const getAnimeStreaming = async (animeid) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeid}/streaming`);
        const data = await response.json();
        setAnimeStreaming(data.data);
    }

    const getAnimeTheme = async (animeid) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeid}/themes`);
        const data = await response.json();
        setAnimeTheme(data.data)
    }

    useEffect(() => {
        getAnime(id);
        getAnimeStreaming(id);
        getAnimeTheme(id);
    }, [])

    return (
        <>
        <div className="container">
            <NavLink className='homeLink' to={'/'}>
                Home
            </NavLink>
        <div className="AnimeItem">
            <div className="wrap">
                <div className="details" onLoad={() => {
                    document.querySelector('.poster').classList.add('moveright')
                }}>
                    <img className="poster" src={anime?.images?.jpg.large_image_url} alt={anime?.title} />
                    <h1>{anime?.title}</h1>
                </div>
                <div className="streamingLinksContainer">
                        <h1>Watch On</h1>
                        {
                            animeStreaming?.length > 0 ? (
                                animeStreaming?.map(stream => {
                                    return (
                                        <a className="streamingLinks" href={stream.url} target="_blank">{stream.name}</a>
                                    )
                                })
                            ) : (
                                <h3 className="streamErrorMsg">
                                    No streaming links available for this show yet
                                </h3>
                            )
                        }
                </div>
            </div>
            <div className="animeDetails">
                {
                    anime?.trailer?.embed_url ?
                    (
                        <iframe width='500px' height='295px' frameBorder='none' src={anime?.trailer?.embed_url} allowFullScreen></iframe>
                    ) : 
                    (
                        <p>Official trailer not found</p>
                    )
                }
                <p><span>Aired: </span><span>{anime?.aired?.string}</span></p>
                <p><span>Type: </span><span>{anime?.type}</span></p>
                <p><span>Status: </span><span>{anime?.status}</span></p>
                <p><span>Rating: </span><span>{anime?.rating}</span></p>
                {
                    anime?.demographics?.[0] ? (
                        <p><span>Demographics: </span><span>{anime?.demographics?.[0].name}</span></p>
                    ) : (
                        <></>
                    )
                }
                <p><span>Genres: </span>
                    {
                        anime?.genres?.map(genre => {
                            return <span className="genreSpan">{genre.name}</span>
                        })
                    }
                </p>
                <p><span>Rank: </span><span>{anime?.rank}</span></p>
                <p><span>Score: </span><span>{anime?.score}</span></p>
                {/* <p><span>Synopsis: </span><span>{synopsis}
                <button>Read More...</button>
                </span></p> */}
                { showMore ? 
                    (
                    <p>{anime?.synopsis}</p> ) : 
                    (
                    <p>{anime?.synopsis?.substring(0, 200) + '...'}</p>
                    ) 
                }
                <button className="showBtn" onClick={() => {
                    setShowMore(!showMore)
                }}>{ showMore ? 'Read Less' : 'Read more'}</button>  

                <div className="themeContainer">
                    <div className="openingContainer">
                    {
                        animeTheme?.openings ? (
                            animeTheme?.openings?.map(opening => {
                                return (
                                    <p>Opening: {opening}</p>
                                )
                            })
                        ) : (
                            <p>Couldn't found theme</p>
                        )
                    }
                    </div>
                    <div className="endingContainer">
                        {
                            animeTheme?.endings ? (
                                animeTheme?.endings?.map(ending => {
                                    return (
                                        <p>Ending: {ending}</p>
                                    )
                                })
                            ) : (
                                <p>Couldn't found theme</p>
                            )                            
                        }
                    </div>
                </div>
            </div>
        </div>
        <Characters />
        </div>
        </>
    );
}

export default AnimeItem;