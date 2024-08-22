import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/story"> story</Link>
            <Link to="/login"> login</Link>
        </div>
    )
}