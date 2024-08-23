import { React, useContext, useState, createContext } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const UnicornContext = createContext();

export function UnicornProvider({children}){
    const [currentUnicorn, setCurrentUnicorn] = useState();
    const navigate = useNavigate();
    const unicornSetter = (new_unicorn) =>{
        setCurrentUnicorn(new_unicorn);
        navigate("/story")
    }

    const updateCurrentUnicorn = (statImpact) => {
        const res = axios.patch(`http://localhost:8000/api/unicorn/unicorn/updatestats/${currentUnicorn.id}`, statImpact)
        return res
    }

    const removeUnicorn = () => {
        setCurrentUnicorn(null)
        navigate("/")
    }
    

    const data = {currentUnicorn, unicornSetter, updateCurrentUnicorn, removeUnicorn};
    return <UnicornContext.Provider value={data}>{children}</UnicornContext.Provider>
}
export const useUnicornContext = () => useContext(UnicornContext)