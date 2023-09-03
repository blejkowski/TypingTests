import React from 'react'
import GlobalStyle from '../components/globalstyle'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { FormButton, FormInput } from '../components/Inputs'
import {FaSignInAlt} from 'react-icons/fa'
import {RiUserAddFill} from 'react-icons/ri'
import {useSelector, useDispatch} from 'react-redux'
import {setUser, User, selectUser} from '../redux/redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Login:React.FC = () => {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [UsernameSI, setUsernameSI] = useState('');
    const [PasswordsSI, setPasswordsSI] = useState('');
    const userSelect = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
       if(Cookies.get('logged_in'))
        navigate('/play');
    }, [])
    
    const handleLogin = (event: React.SyntheticEvent<EventTarget>) =>{
        event.preventDefault(); 
        let user = {
            Username: UsernameSI,
            Password: PasswordsSI,
        }
        axios.post('http://localhost:5002/user/login/', user,  { withCredentials: true })
        .then(response =>{
            if(response.status === 200){
                axios.get(`http://localhost:5002/user/GetUserData/?username=${UsernameSI}`)
                .then(response=>{
                    let userData = response.data;
                    
                    let newUser: User = {
                        Username: userData.username,
                        ProfileImage: userData.profileImage,
                        BestWpm: userData.bestWpm,
                        AverageWpm: userData.averageWpm,
                        TypingTests: userData.typingTests,
                        Tests: userData.tests
                    }
                    dispatch(setUser(newUser));
                    Cookies.set('logged_in', 'true')
                    Cookies.set('user_name', `${newUser.Username}`)
                    navigate('/play');
                })
            }
        });
    }
    const handleSignup = (event: React.SyntheticEvent<EventTarget>) =>{
        event.preventDefault();
        let User = {
            Username: Username,
            Password: Password,
        }
        axios.post('http://localhost:5002/user/signup/', User)
        .then(response =>{
            if(response.status === 200){
                axios.get(`http://localhost:5002/user/GetUserData/?username=${Username}`)
                .then(response=>{
                    let userData = response.data;
                    
                    let newUser: User = {
                        Username: userData.username,
                        ProfileImage: userData.profileImage,
                        BestWpm: userData.bestWpm,
                        AverageWpm: userData.averageWpm,
                        TypingTests: userData.typingTests,
                        Tests: userData.tests,
                    }
                    dispatch(setUser(newUser));
                    Cookies.set('logged_in', 'true')
                    Cookies.set('user_name', `${newUser.Username}`)
                    navigate('/play');
                })
            }
        })
      
    
    }
  return (
    <>
    <GlobalStyle/>
    <div style={{backgroundColor: '#323437', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <form onSubmit ={handleLogin} style={{height: '60vh', width: '30vw', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 style={{color: '#8a8a8a', margin: '0'}}>login</h2>
            <FormInput value={UsernameSI}  onChange={e=> setUsernameSI(e.target.value)} placeholder="username"/>
            <FormInput type="password" value={PasswordsSI}  onChange={e=> setPasswordsSI(e.target.value)} placeholder="password"/>
            <FormButton type="submit"><FaSignInAlt style={{margin: '0.2em'}}/>login</FormButton>
        </form>
        <form onSubmit={handleSignup} style={{height: '60vh', width: '30vw', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2 style={{color: '#8a8a8a', margin: '0'}}>sign up</h2>
            <FormInput value={Username} onChange={e=> setUsername(e.target.value)} placeholder="username"/>
            <FormInput type="password" value={Password}  onChange={e=> setPassword(e.target.value)} placeholder="password"/>
            <FormButton type="submit"><RiUserAddFill style={{margin: '0.2em'}}/>signup</FormButton>
        </form>
    </div>
    <p>{userSelect.Username}</p>
    </>
   
  )
}

export default Login
