import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const base_url = 'https://api.jikan.moe/v4';

const Characters = () => {
    const {id} = useParams();
    const [characters, setCharacters] = useState([]);

    const getCharacters = async (animeid) => {
        const response = await fetch(`${base_url}/anime/${animeid}/characters`);
        const data = await response.json();
        setCharacters(data.data);
    }

    useEffect(() => {
        getCharacters(id);
    }, [])
    return (
        <div className="characters">
            <h1>Characters</h1>
            <div className="characterDetailsWarp">
                {
                    characters?.map(character => {
                        return (
                            <div className="characterDetails">
                                <Link to={`/character/${character?.character.mal_id}`} key={character?.character.mal_id}>
                                    <img loading="lazy" className="characterImages" src={character?.character.images.jpg.image_url} />
                                </Link>
                                <h3 className="characterName">{character?.character.name}</h3>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    );
}

export default Characters;