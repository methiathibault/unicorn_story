import { React, useContext, useState, createContext } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const UnicornContext = createContext();

export function UnicornProvider({children}){
    const [currentUnicorn, setCurrentUnicorn] = useState();
    const navigate = useNavigate();
    const unicornSetter = async (new_unicorn) =>{
        setCurrentUnicorn(new_unicorn);
        const randomStoryId = await getRandomStoryId();
        navigate(`/story/${randomStoryId}`);
    }

    const updateCurrentUnicorn = (statImpact) => {
        const res = axios.patch(`http://localhost:8000/api/unicorn/unicorn/updatestats/${currentUnicorn.id}`, statImpact)
        return res
    }

    const removeUnicorn = () => {
        setCurrentUnicorn(null)
        navigate("/")
    }

    const countStories = async () => {
        const res = await axios.get("http://localhost:8000/api/story/count")
        return res.data;
    }

    const getRandomStoryId = async () => {
        const storyCount = await countStories();
        const randomId = Math.floor(Math.random() * storyCount) + 1;
        return randomId;
    }
    

    const data = {currentUnicorn, unicornSetter, updateCurrentUnicorn, removeUnicorn};
    return <UnicornContext.Provider value={data}>{children}</UnicornContext.Provider>
}
export const useUnicornContext = () => useContext(UnicornContext)