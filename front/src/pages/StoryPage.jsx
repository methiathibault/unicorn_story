import React,{useState, useContext} from 'react'
import axios from 'axios'
import ScenarComponent from '../components/ScenarComponent'
import ChoiceComponent from '../components/ChoiceComponent'


export default function StoryPage() {
   
    const[storyId,setStoryId] = useState[1]

    function getScenar(){
        axios.get("http://localhost:3000/")
    }

  return (
    <div>
        <h1>this is a story 1</h1>  
        <ScenarComponent/>

       
    </div>
  )
}
