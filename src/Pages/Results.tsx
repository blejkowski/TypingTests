import React, { useState, useEffect } from 'react'
import {useLocation, useNavigate } from 'react-router-dom'
import Graph from '../components/Graph'
import {FaRedoAlt} from 'react-icons/fa'
import { FormButton } from '../components/Inputs'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser, User } from '../redux/redux'
import axios from 'axios'
import Cookies from 'js-cookie'
export type ResultsProps = {
    points:{
        x: number,
        y: number,
    }[],
    AverageWpm: number,
    Accuracy: number,
  }
const Results = () => {
    const [notLoggedInDisplay, setnotLoggedInDisplay] = useState('flex');
    const userSelect = useSelector(selectUser);
    const data = useLocation();
    const dispatch = useDispatch();

  useEffect(() => {
      if(Cookies.get('logged_in') === 'true'){
        setnotLoggedInDisplay('none');
          let User: User = {
            Username: userSelect.Username,
            ProfileImage: userSelect.ProfileImage,
            BestWpm: userSelect.BestWpm,
            AverageWpm: userSelect.AverageWpm,
            TypingTests: userSelect.TypingTests,
            Tests: userSelect.Tests
          }
          axios.post(`http://localhost:5002/user/UpdateUserData/?WordsPerMinute=${data.state.WPM}&Accuracy=${data.state.WordAccuray}`, User)
          .then(response =>{
            console.log(`run once ${response}`);
            dispatch(setUser(User));
          })
         
    }
  },[]);
    
   
    const navigate = useNavigate();
    const getLabels = ()=>{
      let result: string[];
      result = data.state.GraphDataState.map((value: number, index:number) =>{return (index+1).toString()})
      return result;
    }
  return (
    <div style={{backgroundColor: '#323437', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{height: '50vh', width: '100vw',  display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Graph title ={"Average WPM per second"} points={data.state.GraphDataState} labels = {getLabels()}/>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', height: '10vh', width: '100vw',  alignItems: 'center', justifyContent: 'center'}}>
        <p style={{margin: '1em'}}>Accuracy: {data.state.WordAccuray}% </p>
        <p style={{margin: '1em'}}>Average WPM: {data.state.WPM}</p>
      </div>
      <div style={{display: `${notLoggedInDisplay}`, flexDirection: 'row', alignItems: 'center', padding: '0.5em'}}>
        <a href="/login" style={{ color: 'black', paddingRight: '0.3em'}}>Sign in </a> to save results
      </div>
        <FormButton onClick={e => navigate('/play')}>Play Again <FaRedoAlt style={{marginLeft: '0.5em'}}/></FormButton>
      <div>

      </div>
    </div>
  
  )
}

export default Results