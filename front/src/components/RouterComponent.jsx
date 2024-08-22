import {Route, Routes} from "react-router-dom"
import HomePage from "../pages/HomePage"
import StoryPage from "../pages/StoryPage"
import LoginPage from "../pages/LoginPage"
import AdminPage from "../pages/AdminPage"

export default function Router() {
    return(
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/story' element={<StoryPage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='admin' element={<AdminPage/>} />
        </Routes>
    )
}