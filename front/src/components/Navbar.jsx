import { Link } from 'react-router-dom'
import { useUserContext } from './AuthContext.jsx'

export default function Navbar() {
    const { isConnected, tokenDisconnect } = useUserContext();

    return (
        <div className='bg-blue-400 h-8 flex space-x-5 text-xl px-8'>
            <Link to="/">Home</Link>
            {
                isConnected ?
                    <>
                        <Link to="/admin"> admin</Link>
                        <Link onClick={() => tokenDisconnect()}> logout</Link> 
                    </>
                : 
                    <Link to="/login">Login</Link>
            }
        </div>
    )
}