import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { useUserContext } from '../components/AuthContext';


export default function LoginPage() {
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
    const [connectionStatus, setConnectionStatus] = useState();
    const [myToken, setToken] = useState('');
    const { tokenSetter, token } = useUserContext();

    function Login() {
        axios.post('http://localhost:8000/api/user/login', {
            email: email,
            password: password
        })
            .then(res => {
                setToken(res.data.token)
                setConnectionStatus('You are connected')
            })
            .catch(err => {
                    console.log(err)
                    setConnectionStatus('Wrong email or password')
            })
    }

    useEffect(() => {
        if (myToken) {
            tokenSetter(myToken)
        }
    }, [myToken])

    if (token === "") {
        return(
            <div className='bg-gray-200 min-h-screen flex flex-col items-center '>
                <h1 className='text-6xl'>Login</h1>
                <div>
                    <p>Email: </p>
                    <input type='text' onChange={e => SetEmail(e.target.value)}  className='border rounded-full'/>
                </div>
                <div>
                    <p>Password :</p>
                    <input type='password' onChange={e => SetPassword(e.target.value)} className='border rounded-full'/>
                </div>
                <div><button onClick={Login} className='bg-green-400 rounded-full w-48 h-12 mt-6'>Login</button></div>
                <div>{connectionStatus}</div>
            </div>
        )
    } else {
        return (
            <div className='already-connected'>
                <h1>already connected</h1>
            </div>
        )
    }
}

