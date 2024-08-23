import { React, useState, useEffect } from 'react'
import axios from 'axios';

export default function AdminPage() {
    const [stories, setStories] = useState([]);
    const [scenarios, setScenarios] = useState([]);
    const [choices, setChoices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
    const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
    const [refresher, setRefresher] = useState(false);
    const [newStory, setNewStory] = useState({ title: '' });
    const [newScenario, setNewScenario] = useState({ title: '', description: '', difficulty: 1, storyId: 1 });
    const [newChoice, setNewChoice] = useState({ title: '', consequence: '', statImpact: '', statRequirement: '', scenarId: 1, nextScenarId: 1 });

    const handleStoryFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/story/create', newStory);
            setStories([...stories, response.data]);
            setIsModalOpen(false);
            setRefresher(!refresher)
        } catch (error) {
            console.error('Error creating story:', error);
        }
    };

    const handleScenarioFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/scenario/create', newScenario);
            setScenarios([...scenarios, response.data]);
            setIsScenarioModalOpen(false);
        } catch (error) {
            console.error('Error creating scenario:', error);
        }
    };

    const handleChoiceFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/choice/create', newChoice);
            setChoices([...choices, response.data]);
            setIsChoiceModalOpen(false);
        } catch (error) {
            console.error('Error creating choice:', error);
        }
    };

    const handleStoryInputChange = (e) => {
        setNewStory({ ...newStory, [e.target.name]: e.target.value });
    };

    const handleScenarioInputChange = (e) => {
        setNewScenario({ ...newScenario, [e.target.name]: e.target.value });
    };

    const handleChoiceInputChange = (e) => {
        setNewChoice({ ...newChoice, [e.target.name]: e.target.value });
    };

    function getStories(){
        axios.get('http://localhost:8000/api/story/story')
        .then(res => setStories(res.data))
        .catch(err => console.log(err))
    }

    function getScenarios(){
        axios.get('http://localhost:8000/api/scenario/scenarios')
        .then(res => setScenarios(res.data))
        .catch(err => console.log(err))
    }

    function getChoices(){
        axios.get('http://localhost:8000/api/choice/choices')
        .then(res => setChoices(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getStories()
        getScenarios()
        getChoices()
    }
    , [refresher])

    return (
        <div className='bg-gray-200 min-h-screen'>
            <h1 className='text-6xl'>Admin Page</h1>
            <div>
                <div>
                    <button onClick={() => setIsModalOpen(true)} className='border-2 bg-violet-200'>Add New Story</button>
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close bg-red-500 rounded-full" onClick={() => setIsModalOpen(false)}>&times;</span>
                                <h2>Add New Story</h2>
                                <form onSubmit={handleStoryFormSubmit}>
                                    <label>
                                        Title:
                                        <input type="text" name="title" value={newStory.title} onChange={handleStoryInputChange} required  className='border-2'/>
                                    </label>
                                    <button type="submit" className='bg-green-400 rounded-sm'>Submit</button>
                                </form>
                            </div>
                        </div>
                    )}
                        <h2>Stories</h2>
                        {stories.map((story) => (
                            <div key={story.id} className='grid grid-cols-2'>
                                <div>{story.id}</div>
                                <div>{story.title}</div>
                            </div>
                            )
                        )}
                </div>
                <div>
                <button onClick={() => setIsScenarioModalOpen(true)}  className='border-2 bg-violet-200'>Add New Scenario</button>
                {isScenarioModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close bg-red-500 rounded-full" onClick={() => setIsScenarioModalOpen(false)}>&times;</span>
                            <h2>Add New Scenario</h2>
                            <form onSubmit={handleScenarioFormSubmit}>
                                <label>
                                    Title:
                                    <input type="text" name="title" value={newScenario.title} onChange={handleScenarioInputChange} required className='border-2'/>
                                </label>
                                <label>
                                    Description:
                                    <textarea name="description" value={newScenario.description} onChange={handleScenarioInputChange} required className='border-2'/>
                                </label>
                                <label>
                                    Difficulty:
                                    <input type="number" name="difficulty" value={newScenario.difficulty} onChange={handleScenarioInputChange} required className='border-2'/>
                                </label>
                                <label>
                                    ID of the linked story:
                                    <input type="number" name="storyId" value={newScenario.storyId} onChange={handleScenarioInputChange} required className='border-2'/>
                                </label>
                                <button type="submit" className='bg-green-400 rounded-sm'>Submit</button>
                            </form>
                        </div>
                    </div>
                )}
                    <h2>Scenarios</h2>
                    {scenarios.map((scenario) => (
                        <div key={scenario.id} className='grid grid-cols-4'>
                            <div>{scenario.id}</div>
                            <div>Title: {scenario.title}</div>
                            <div>Difficulty: {scenario.difficulty}</div>
                            <div>Linked story: {scenario.storyId}</div>
                        </div>
                        )
                    )}
                </div>
                <div>
                <button onClick={() => setIsChoiceModalOpen(true)} className='border-2 bg-violet-200'>Add New Choice</button>
                {isChoiceModalOpen && (
                    <div className="modal">
                        <div className="modal-content flex space-y-10">
                            <span className="close bg-red-500 rounded-full" onClick={() => setIsChoiceModalOpen(false)}> &times; </span>
                            <h2>Add New Choice</h2>
                            <form onSubmit={handleChoiceFormSubmit}>
                                <label>
                                    Text:
                                    <input type="text" name="text" value={newChoice.text} onChange={handleChoiceInputChange} required className='border-2'/>
                                </label>
                                <label>
                                    Consequence:
                                    <input type="text" name="consequence" value={newChoice.consequence} onChange={handleChoiceInputChange} required className='border-2'/>
                                </label>
                                <label>
                                    Stat Impact:
                                    <input type="text" name="statImpact" value={newChoice.statImpact} onChange={handleChoiceInputChange} required className='border-2'/>
                                </label>
                                <label>
                                    Stat Requirement:
                                    <input type="text" name="statRequirement" value={newChoice.statRequirement} onChange={handleChoiceInputChange} required className='border-2'/>
                                </label>
                                <label>
                                    Scenario ID:
                                    <input type="number" name="scenarioId" value={newChoice.scenarioId} onChange={handleChoiceInputChange} required className='border-2'/>
                                </label>
                                <label>
                                    Next Scenario ID:
                                    <input type="number" name="nextScenarioId" value={newChoice.nextScenarioId} onChange={handleChoiceInputChange} required className='border-2'/>
                                </label>
                                <button type="submit" className='bg-green-400 rounded-sm'>Submit</button>
                            </form>
                        </div>
                    </div>
                )}
                <h2>Choices</h2>
                {choices.map((choice) => (
                    <div key={choice.id} className='grid grid-cols-4'>
                        <div>{choice.id}</div>
                        <div>Text: {choice.title}</div>
                        <div>Linked scenario: {choice.scenarId}</div>
                        <div>Next scenario: {choice.nextScenarId}</div>
                    </div>
                    )
                )}
                </div>
            </div>
        </div>
    )
}
