import {Route, Routes} from "react-router-dom"
import HomePage from "../pages/HomePage"
import StoryPage from "../pages/StoryPage"

export default function Router() {
    return(
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/story' element={<StoryPage/>} />
            <Route path='/login' element={<HomePage/>} />
        </Routes>
    )
}