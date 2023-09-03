import React from 'react'
import GlobalStyle from '../components/globalstyle'
import { FormButton } from '../components/Inputs'
import {FaPlay} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Home:React.FC = () => {
  const navigate = useNavigate();
  return (
    <div style={{backgroundColor: '#323437', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column'}}> 
        <GlobalStyle/>
        <div style={{height: "100vh", width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div>
           <h2 style={{color: '#8a8a8a', margin: '0'}}>about<h2 style={{color: '#e2b714', margin: '0'}}> typing tests</h2></h2>
            <p style={{color: '#8a8a8a'}}>a minimalistic web application used to test and display a users average words per minute.</p>
            <p style={{color: '#8a8a8a'}}>press the play button to take a typing test</p>
            <p style={{color: '#8a8a8a'}}>or you may <a style={{color: '#8a8a8a'}}href="/login">create an account</a> to save your typing tests and see how you compare to other users, as well as customize your experience</p>
          </div>
          <div style={{display: 'flex', height: '10vh', width: '100vw', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <FormButton onClick={e => navigate('/play')}>play<FaPlay style={{margin: '0.2em'}}/></FormButton>
          </div>
        
        </div>
    </div>
    

  )
}

export default Home