import {Route, Routes} from "react-router-dom"
import HomePage from "../pages/HomePage"
import StoryPage from "../pages/StoryPage"
import LoginPage from "../pages/LoginPage"
import AdminPage from "../pages/AdminPage"
import { useUserContext } from './AuthContext.jsx'


export default function Router() {
    const { isConnected } = useUserContext();
    return(
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/story/:storyId' element={<StoryPage/>} />
            {isConnected ? <Route path='admin' element={<AdminPage/>} /> : null}
        </Routes>
    )
}