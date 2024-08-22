import React,{useState, useEffect} from 'react'
import axios from 'axios'


export default function StoryPage() {
  const[choice, setChoice] = useState([])

   const[storyId,setStoryId] = useState[1]

    function getScenar(){
        axios.get("http://localhost:3000/")
    }

    function getChoiceByScenarId(){
      axios.get(`http://localhost:3000/choices/scenario/${currentScenar.id}`)
      .then(res => setChoice(res))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getChoiceByScenarId()
  })

  function updateUnicorn(unicornId , statImpact){
    axios.patch(`http://localhost:3000/unicorn/${unicornId}`, statImpact)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div>
        <h1>this is a story 1</h1>  
        <div>
            {choice.map((choice) => (
                <button key={choice.id}>{choice.title}</button>
                )
            )}
        </div> 

       
    </div>
  )
}
