import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUnicornContext } from '../components/UnicornContext'

export default function StoryPage() {
    const [choice, setChoice] = useState([])
    const [storyId,setStoryId] = useState(1)
    const [scenario, setScenario] = useState([])
    const [level, setLevel] = useState(1)
    const [refresher, setRefresher] = useState(false)
    const { currentUnicorn, updateCurrentUnicorn, removeUnicorn, setCurrentUnicorn } = useUnicornContext()

    async function getScenario(){
        let url = ""
        if (level === 1){
            url = `http://localhost:8000/api/scenario/scenario/story/first/${storyId}`
        } else {
            
            url = `http://localhost:8000/api/scenario/scenario/${scenario[0].id}`
        }
        await axios.get(url)
        .then(async res => {
            setScenario(res.data)
            await axios.get(`http://localhost:8000/api/choice/choices/scenario/${res.data[0].id}`)
            .then(res => setChoice(res.data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    function nextScenario(scenarioId, consequence, statImpact){
        alert(consequence)
        axios.get(`http://localhost:8000/api/scenario/scenario/${scenarioId}`)
        .then(async res => {
            //console.log(res.data)
            const resultat = statImpact === null ? null : await updateCurrentUnicorn(statImpact);
            if (resultat !== null){
                if(resultat.data.hp === 0){
                    DeadUnicorn()
                }
                setCurrentUnicorn(resultat.data)
            } else if (scenarioId !== null){
                setScenario(res.data)
                console.log("id")
                console.log(res.data[0].id)
                setLevel(res.data[0].difficulty)
                setRefresher(!refresher)
            } else  {
                endStory()
            }
        })
        .catch(err => console.log(err))
    }

    const navigate = useNavigate()
    function endStory(){
        alert("Bravo vous avez fini l'histoire")
        navigate("/")
    }

    function DeadUnicorn(){
        removeUnicorn()
        alert("Malheureusement votre licorne est morte")
    }

    useEffect(() => {
        getScenario()
    }, [refresher])

    return (
    <div className='flex flex-col items-center space-y-4 bg-gray-200 min-h-screen'>
        <div className='flex flex-col'>
            <div>name  {currentUnicorn.name}</div>
            <div> point de vie {currentUnicorn.hp}</div>
            <div>force  {currentUnicorn.strenght}</div>
            <div>agilité {currentUnicorn.agility}</div>
            <div>intelligence  {currentUnicorn.intelligence}</div>
       </div>
        {console.log(scenario)}
            <h1 className='text-6xl font-bold'>STORY : TITLE STORY</h1>  
            
        <div >
            {scenario.map((scenario) => (
                    <div className='flex flex-col items-center'>
                      <h1 className='text-2xl font-bold '>{scenario.title}</h1>
                      <p className=' p-8 border-2 border-black rounded-lg my-5'>{scenario.description}</p>
                    </div>
                )
            )}

            <div className='flex items-center'>
            {choice.length === 0?
                <button onClick={()=> endStory()} className='border-2 bg-violet-300 px-2 h-10 rounded-md'>fini</button> 
                :
                choice.map((choice) => (
                <div> <button key={choice.id} onClick={() => nextScenario(choice.nextScenarId, choice.consequence, choice.statImpact)} className='border-2 bg-violet-300 px-2 h-10 rounded-full'>{choice.title}</button>  </div>
                    )
                )
            } 
            </div>
        </div>
    </div>
  )
}
