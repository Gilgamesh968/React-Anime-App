import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import '/src/styles/People.css'

const base_url = 'https://api.jikan.moe/v4'

const People = () => {
    const {id} = useParams();
    const [people, setPeople] = useState([]);

    const getPeople = async (peopleid) => {
        const response = await fetch(`${base_url}/people/${peopleid}/full`);
        const data = await response.json();
        setPeople(data.data);
    }

    useEffect(() => {
        getPeople(id);
    }, [])

    return (
        <div className="voiceActorInfo">
            <NavLink className='homeLink' to={'/'}>
                Home
            </NavLink>
            <div className="voiceActorWarp">
                <h1 className="peopleName">{people?.name}
                {
                    people.family_name && people.given_name ? (
                        <span>
                            ({people.family_name} {people.given_name})
                        </span>
                    ) : (
                        <></>
                    )
                }</h1>
                <img className="peopleImage" src={people.images?.jpg.image_url} alt='people image' />
                <p className="peopleAbout">{people.about}</p>
            </div>
            <div className="voices">
                {
                    people?.voices?.map(voice => {
                        return (
                            <div className="voicesCharacter">
                                <Link to={`/character/${voice?.character.mal_id}`} key={voice?.character.mal_id}>
                                    <img src={voice?.character.images.jpg.image_url} />
                                </Link>
                                <h1>{voice?.character.name}</h1>
                                <p>Role: {voice?.role}</p>
                                <p>Anime: {voice?.anime.title}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default People;