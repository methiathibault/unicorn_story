import React,{useState, useEffect} from 'react'
import axios from 'axios'


export default function StoryPage() {

    const[choice, setChoice] = useState([])
    const[storyId,setStoryId] = useState(1)
    const [scenario, setScenario] = useState([])
    const [level, setLevel] = useState(1)
    const [refresher, setRefresher] = useState(false)

    async function getScenario(){
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

    function nextScenario(scenarioId){
        axios.get(`http://localhost:8000/api/scenario/scenario/${scenarioId}`)
        .then(res => {
            console.log(res.data)
            setScenario(res.data)
            setLevel(res.data[0].difficulty)
            setRefresher(!refresher)
        })
        .catch(err => console.log(err))

    }

    useEffect(() => {
        getScenario()
    }, [refresher])

    return (
        <div>
            <h1>this is a story 1</h1>  
        <div>
            {scenario.map((scenario) => (
                    <p key={scenario.id}>{scenario.title}</p>
                )
            )}
            {choice.map((choice) => (
                <button key={choice.id} onClick={() => nextScenario(choice.nextScenarId)}>{choice.title}</button>
                )
            )}
        </div>
    </div>
  )
}
