import React,{useState, useEffect} from 'react'
import axios from 'axios'


export default function StoryPage() {

    const[choice, setChoice] = useState([])
    const[storyId,setStoryId] = useState(1)
    const [scenario,setScenario] = useState([])
    const [currentScenario,setCurrentScenario] = useState([])
    let test = []
    

    async function getScenar(){
        axios.get("http://localhost:8000/api/scenario/scenario/story/"+storyId)
        .then(res => setScenario(res.data))
        .catch(err => console.log(err))
        test = await  axios.get("http://localhost:8000/api/scenario/scenario/story/"+storyId)
       // console.log(test.data)
        await startScenar(test.data)
    }
    
    
  

    function nextScenar(id){


    }

    async function startScenar(scene){  
      // console.log(scene)
      // console.log("start scenar "+scene+ "end ")
      scene.map((sce)=>{
        //console.log(sce)
        if(sce.difficulty === 1){
          setCurrentScenario(sce)
        }
      })

    }
  
  
    function getChoiceByScenarId(){
      axios.get(`http://localhost:3000/choices/scenario/${currentScenar.id}`)
      .then(res => setChoice(res))
      .catch(err => console.log(err))
  }
  
  useEffect(() => {
    getChoiceByScenarId()
    getScenar()
  })

  function updateUnicorn(unicornId , statImpact){
    axios.patch(`http://localhost:3000/unicorn/${unicornId}`, statImpact)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div>
        <h1>this is a story 1</h1>  
        {currentScenario.title}
        {currentScenario.description}
        {currentScenario.difficulty}
        <div>
            {choice.map((choice) => (
                <button key={choice.id}>{choice.title}</button>
                )
            )}
        </div>
    </div>
  )
}
