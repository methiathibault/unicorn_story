import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function StoryPage() {

    const[choice, setChoice] = useState([])
    const[storyId,setStoryId] = useState(1)
    const [scenario, setScenario] = useState([])
    const [level, setLevel] = useState(1)
    const [refresher, setRefresher] = useState(false)

    async function getScenario(){
      console.log("started")
        let url = ""
        if (level == 1){
            url = `http://localhost:8000/api/scenario/scenario/story/first/${storyId}`
        } else {
            url = `http://localhost:8000/api/scenario/scenario/${scenario[0].id}`
        }
        await axios.get(url)
        .then(async res => {
            console.log(res.data)
            setScenario(res.data)
            await axios.get(`http://localhost:8000/api/choice/choices/scenario/${res.data[0].id}`)
            .then(res => setChoice(res.data))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    function updateUnicorn(unicornId , statImpact){
        axios.patch(`http://localhost:3000/unicorn/${unicornId}`, statImpact)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    function nextScenario(scenarioId,consequence){

        alert(consequence)
        if(scenarioId === null){
          console.log("finito")
          endStory()
        }
        console.log("next")
        axios.get(`http://localhost:8000/api/scenario/scenario/${scenarioId}`)
        .then(res => {
            console.log(res.data)
           //console.log(scenario)
            setScenario(res.data)
            setLevel(res.data[0].difficulty)
            setRefresher(!refresher)
        })
        .catch(err => console.log(err))

    }

    const navigate = useNavigate()
    function endStory(){
      alert("fin de l'histoire")
      navigate("/")
    }

    useEffect(() => {
        getScenario()
    }, [refresher])

    return (
    <div className='flex flex-col items-center space-y-4 bg-gray-200 min-h-screen'>
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
                <div> <button key={choice.id} onClick={() => nextScenario(choice.nextScenarId, choice.consequence)} className='border-2 bg-violet-300 px-2 h-10 rounded-full'>{choice.title}</button>  </div>
                    )
                )
            } 
            </div>
        </div>
    </div>
  )
}
