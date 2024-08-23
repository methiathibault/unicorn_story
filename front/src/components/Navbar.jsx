import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useUserContext } from './AuthContext.jsx'

export default function Navbar() {
    const { isConnected, tokenDisconnect } = useUserContext();

    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/story"> story</Link>
            {
                isConnected ?
                    <>
                        <Link to="/admin"> admin</Link>
                        <Link onClick={() => tokenDisconnect()}> logout</Link> 
                    </>
                : 
                    <Link to="/login"> login</Link>
            }
        </div>
    )
}