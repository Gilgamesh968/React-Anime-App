import React, { useEffect, useState } from "react";
import { Link, useParams, NavLink } from "react-router-dom";
const base_url = 'https://api.jikan.moe/v4';

const CharacterInfo = () => {
    const {id} = useParams();
    const [showMore, setShowMore] = useState(false);
    const [character, setCharacter] = useState([]);
    const [voiceActor, setVoiceActor] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [characterAnime, setCharacterAnime] = useState([]);

    const getCharacter = async (characterid) => {
        const response = await fetch(`${base_url}/characters/${characterid}`);
        const data = await response.json();
        setCharacter(data.data);
    }

    const getCharacterPictures = async (characterid) => {
        const response = await fetch(`${base_url}/characters/${characterid}/pictures`);
        const data = await response.json();
        setPictures(data.data);
    }

    const getCharacterAnime = async (characterid) => {
        const response = await fetch(`${base_url}/characters/${characterid}/anime`);
        const data = await response.json();
        setCharacterAnime(data.data);
    }

    const getCharacterVA = async (characterid) => {
        const response = await fetch(`${base_url}/characters/${characterid}/voices`);
        const data = await response.json();
        setVoiceActor(data.data)
    }

    useEffect(() => {
        getCharacter(id);
        getCharacterAnime(id);
        getCharacterVA(id);
        getCharacterPictures(id);
    }, []);

    return (
        <div className="characterInfo">
            <NavLink className='homeLink' to={'/'}>
                Home
            </NavLink>
            <div className="characterInfoDetail">
                <img className="characterImage" src={character?.images?.jpg.image_url} key={character?.mal_id} />
                <h1>{character?.name}</h1>
                {/* <p>{character?.about}</p> */}
                {
                    showMore ? 
                    (
                        <p>{character?.about}</p>
                    ) :
                    (
                        <p>{character?.about?.substring(0, 200) + '...'}</p>
                    )
                }
                {
                    character?.about?.length < 200 ? (
                        <></>
                    ) : (
                        <button onClick={() => {
                            setShowMore(!showMore)
                        }}>{ showMore ? 'Read Less' : 'Read More'}</button>
                    )
                }
            </div>

            <div className="characterInfoAnime">
                <h1>Anime</h1>
                <div className="characterInfoAnimeLinks">
                    {
                        characterAnime?.map(characterAnime => {
                            return (
                                <div className="characterInfoAnimeItems">
                                    <Link to={`/anime/${characterAnime?.anime.mal_id}`} key={characterAnime?.[0]?.anime.mal_id}>
                                        <img src={characterAnime?.anime.images.jpg.large_image_url} alt="anime image" />
                                    </Link>
                                    <h3>{characterAnime?.anime.title}</h3>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="voiceActorDetails">
                {
                    voiceActor?.map(actors => {
                        return (
                            <div className="voiceActorsDetail">
                                <Link to={`/voice-actor/${actors?.person?.mal_id}`} key={actors?.person?.mal_id}>
                                    <img className="VAimages" src={actors?.person?.images?.jpg.image_url} alt="VA images" />
                                </Link>
                                <h2>Language: {actors?.language}</h2>
                                <h2>{actors?.person?.name}</h2>
                            </div>
                        )
                    })
                }
            </div>
            {
                pictures ? (
                    <div className="characterPictures">
                        {
                            pictures?.map(picture => {
                                return (
                                    <div className="characterPicture">
                                        <img src={picture?.jpg.image_url} key={character?.mal_id}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    );
}

export default CharacterInfo;