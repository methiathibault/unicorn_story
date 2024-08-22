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
        <div>
            <h1>Admin Page</h1>
            <div>
                <div>
                    <button onClick={() => setIsModalOpen(true)}>Add New Story</button>
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                                <h2>Add New Story</h2>
                                <form onSubmit={handleStoryFormSubmit}>
                                    <label>
                                        Title:
                                        <input type="text" name="title" value={newStory.title} onChange={handleStoryInputChange} required />
                                    </label>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    )}
                        <h2>Stories</h2>
                        {stories.map((story) => (
                            <div key={story.id}>
                                <p>{story.id}</p>
                                <p>{story.title}</p>
                            </div>
                            )
                        )}
                </div>
                <div>
                <button onClick={() => setIsScenarioModalOpen(true)}>Add New Scenario</button>
                {isScenarioModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setIsScenarioModalOpen(false)}>&times;</span>
                            <h2>Add New Scenario</h2>
                            <form onSubmit={handleScenarioFormSubmit}>
                                <label>
                                    Title:
                                    <input type="text" name="title" value={newScenario.title} onChange={handleScenarioInputChange} required />
                                </label>
                                <label>
                                    Description:
                                    <textarea name="description" value={newScenario.description} onChange={handleScenarioInputChange} required />
                                </label>
                                <label>
                                    Difficulty:
                                    <input type="number" name="difficulty" value={newScenario.difficulty} onChange={handleScenarioInputChange} required />
                                </label>
                                <label>
                                    ID of the linked story:
                                    <input type="number" name="storyId" value={newScenario.storyId} onChange={handleScenarioInputChange} required />
                                </label>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                )}
                    <h2>Scenarios</h2>
                    {scenarios.map((scenario) => (
                        <div key={scenario.id}>
                            <p>{scenario.id}</p>
                            <p>Title: {scenario.title}</p>
                            <p>Difficulty: {scenario.difficulty}</p>
                            <p>Linked story: {scenario.storyId}</p>
                        </div>
                        )
                    )}
                </div>
                <div>
                <button onClick={() => setIsChoiceModalOpen(true)}>Add New Choice</button>
                {isChoiceModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setIsChoiceModalOpen(false)}>&times;</span>
                            <h2>Add New Choice</h2>
                            <form onSubmit={handleChoiceFormSubmit}>
                                <label>
                                    Text:
                                    <input type="text" name="text" value={newChoice.text} onChange={handleChoiceInputChange} required />
                                </label>
                                <label>
                                    Consequence:
                                    <input type="text" name="consequence" value={newChoice.consequence} onChange={handleChoiceInputChange} required />
                                </label>
                                <label>
                                    Stat Impact:
                                    <input type="text" name="statImpact" value={newChoice.statImpact} onChange={handleChoiceInputChange} required />
                                </label>
                                <label>
                                    Stat Requirement:
                                    <input type="text" name="statRequirement" value={newChoice.statRequirement} onChange={handleChoiceInputChange} required />
                                </label>
                                <label>
                                    Scenario ID:
                                    <input type="number" name="scenarioId" value={newChoice.scenarioId} onChange={handleChoiceInputChange} required />
                                </label>
                                <label>
                                    Next Scenario ID:
                                    <input type="number" name="nextScenarioId" value={newChoice.nextScenarioId} onChange={handleChoiceInputChange} required />
                                </label>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                )}
                <h2>Choices</h2>
                {choices.map((choice) => (
                    <div key={choice.id}>
                        <p>{choice.id}</p>
                        <p>Text: {choice.title}</p>
                        <p>Linked scenario: {choice.scenarId}</p>
                        <p>Next scenario: {choice.nextScenarId}</p>
                    </div>
                    )
                )}
                </div>
            </div>
        </div>
    )
}
