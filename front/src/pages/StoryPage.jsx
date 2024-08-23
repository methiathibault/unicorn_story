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
            const resultat = statImpact === null ? null : await updateCurrentUnicorn(statImpact);
            if (resultat !== null){
                if(resultat.data.hp === 0){
                    DeadUnicorn()
                }
            }
            else{
                if (resultat !== null){
                    setCurrentUnicorn(resultat.data)
                }
                setScenario(res.data)
                setLevel(res.data[0].difficulty)
                setRefresher(!refresher)
            }
            if (scenarioId === null && resultat.data.hp !== 0){
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
        <div>
            <h1>this is a story 1</h1>  
        <div>
            {scenario.map((scenario) => (
                    <div>
                      <h1>{scenario.title}</h1>
                      <p>{scenario.description}</p>
                    </div>
                )
            )}
            {choice.length === 0?
            <button onClick={()=> endStory()}>fini</button> 
            :
            choice.map((choice) => (
              <button key={choice.id} onClick={() => nextScenario(choice.nextScenarId, choice.consequence, choice.statImpact)}>{choice.title}</button>
                )
            )
            }
        </div>
    </div>
  )
}
