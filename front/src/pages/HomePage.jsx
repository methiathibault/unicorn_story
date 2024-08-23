import { React, useState } from 'react'
import axios from 'axios'

export default function HomePage() {
    const [unicorn, setUnicorn] = useState({
        name: "",
        hp: 10,
        strenght: 0,
        agility: 0,
        intelligence: 0
    })
    const [currentUnicorn, setCurrentUnicorn] = useState()

    function createUnicorn(){
        axios.post("http://localhost:8000/api/unicorn/create", unicorn)
        .then(res => setCurrentUnicorn(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div className='flex flex-col items-center space-y-4 bg-gray-200 min-h-screen'>
            <h2 className='text-2xl font-bold'>Create your unicorn</h2>
            <input type="text" placeholder="Enter your name" onChange={(e) => setUnicorn({...unicorn, name: e.target.value})} className='border-2 rounded-full h-16 px-8 '/>
            <input type="text" placeholder="How strong your unicorn is" onChange={(e) => setUnicorn({...unicorn, strenght: e.target.value})} className='border-2 rounded-full h-10 px-3 text-balance w-64' />
            <input type="text" placeholder="How agile your unicorn is" onChange={(e) => setUnicorn({...unicorn, agility: e.target.value})} className='border-2 rounded-full h-10 px-3 w-64' />
            <input type="text" placeholder="How smart your unicorn is" onChange={(e) => setUnicorn({...unicorn, intelligence: e.target.value})} className='border-2  rounded-full h-10 px-3 w-64' />
            <button onClick={createUnicorn} className='border-2  rounded-full h-10 px-3 w-64 bg-violet-400'>Start your adventure</button>
        </div>
    )
}