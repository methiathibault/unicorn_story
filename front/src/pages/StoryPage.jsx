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
        <div>
            <h1>this is a story 1</h1>  
            {console.log("scenario")}
            {console.log(scenario)}
        <div>
            {scenario.map((scenario) => (
                    <div>
                      <h1>{scenario.title}</h1>
                      <p>{scenario.description}</p>
                    </div>
                )
            )}

            {console.log(choice.length === 0)}

            {choice.length === 0?
            <button onClick={()=> endStory()}>fini</button> 
            :
            choice.map((choice) => (
              <button key={choice.id} onClick={() => nextScenario(choice.nextScenarId, choice.consequence)}>{choice.title}</button>
              )
          )
          
           
          }
            {/* {choice.map((choice) => (
                <button key={choice.id} onClick={() => nextScenario(choice.nextScenarId, choice.consequence)}>{choice.title}</button>
                )
            )} */}
        </div>
    </div>
  )
}
