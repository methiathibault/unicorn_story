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

    function createUnicorn(){
        axios.post("http://localhost:8000/api/unicorn/create", unicorn)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Create your unicorn</h2>
            <input type="text" placeholder="Enter your name" onChange={(e) => setUnicorn({...unicorn, name: e.target.value})}/>
            <input type="text" placeholder="How strong your unicorn is" onChange={(e) => setUnicorn({...unicorn, strenght: e.target.value})}/>
            <input type="text" placeholder="How agile your unicorn is" onChange={(e) => setUnicorn({...unicorn, agility: e.target.value})}/>
            <input type="text" placeholder="How smart your unicorn is" onChange={(e) => setUnicorn({...unicorn, intelligence: e.target.value})}/>
            <button onClick={createUnicorn}>Start your adventure</button>
        </div>
    )
}