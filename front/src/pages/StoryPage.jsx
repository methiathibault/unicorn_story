import React,{useState, useEffect} from 'react'
import axios from 'axios'
import ScenarComponent from '../components/ScenarComponent'
import ChoiceComponent from '../components/ChoiceComponent'


export default function StoryPage() {
   
    const[storyId,setStoryId] = useState(1)
    const [scenario,setScenario] = useState([])
    const [currentScenario,setCurrentScenario] = useState([])
    const [turn, setTurn] = useState(1)
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

    useEffect(()=>{
      getScenar()
     // startScenar(1)
    },[])

  return (
    <div>
        <h1>this is a story 1</h1>  
        <ScenarComponent />

        {console.log("ble")}
        {console.log(currentScenario)}

        {currentScenario.title}
        {currentScenario.description}
        {currentScenario.difficulty}

        {/* {currentScenario.map((sce)=>(

          <>

            <div>{sce.title}</div>
          </>
        ))} */}

        

       
       
    </div>
  )
}
