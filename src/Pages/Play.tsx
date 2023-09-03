import React from 'react'
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FormButton, FormInput } from '../components/Inputs';
import { selectUser, setUser, User } from '../redux/redux';
import { useNavigate } from "react-router-dom";
import Graph from '../components/Graph';
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from 'styled-components';


const Play:React.FC = () => {
  const [QuoteArray, setQuoteArray] = useState([]);
  const [SpaceCount, setSpaceCount] = useState(0);
  const [TestDuration, setTestDuration] = useState(-1);
  const [Time, setTime] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [WordsEntered, setWordsEntered] = useState(0);
  const [WordAccuray, setWordAccuray] = useState(0);
  const [CorrectWords, setCorrectWords] = useState(0);
  const [GraphDataState, setGraphDataState] = useState<any>([])
  const [started, setstarted] = useState(false);
  const [ErrorDisplay, setErrorDisplay] = useState('none')
  const [ErrorMessage, setErrorMessage] = useState('');
  const [ReadOnlyBool, setReadOnlyBool] = useState(true)
  const userSelect = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var time: number = 0;
  var timeout: NodeJS.Timer | undefined ;


  useEffect(() => {
    
    if(Time === TestDuration)
      navigate("/results", {state: {GraphDataState, WordAccuray, WPM}});
    else if(Time > 0)
      setGraphDataState((GraphDataState: any) => [...GraphDataState, WPM]);
  }, [Time])
  
  useEffect(() => {
    getQuote();
    
    if(!Cookies.get('logged_in'))
    navigate('/login');
    else if(userSelect.Username === "" && Cookies.get('user_name')){
      axios.get(`http://localhost:5002/user/GetUserData/?username=${Cookies.get('user_name')}`)
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
          })
        }
}, [])
  

  const StartTimer = async() =>{
      timeout = setInterval(async() => {
        time++;
        await setTime(time);
        if(time === TestDuration){
            clearInterval(timeout); 
        }
    }, 1000);
  }
 
  const getQuote = async() =>{
    return await fetch('http://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
        const words = data.content;
        setQuoteArray(words.split(' '));
        setSpaceCount(0);
    });
}
const handleTyping = async(event: React.SyntheticEvent<EventTarget>) =>{
  const target = event.target as HTMLTextAreaElement;
  const typing = target.value;
 
  if(started === false){
    StartTimer();
    setstarted(true);
  }
  if(typing.charAt(typing.length -1) === ' ')
  {
      await setWordsEntered(WordsEntered +1);
      await setWordAccuray(Math.floor((CorrectWords / WordsEntered) *100));
      if(typing.replace(' ', '') === QuoteArray[SpaceCount])
      {
          document.getElementById(SpaceCount.toString())!.style.color = "green";
          await setCorrectWords(CorrectWords + 1);
          await setSpaceCount(SpaceCount + 1);
          await setWPM(Math.floor((CorrectWords / Time) * 60));

          target.value = '';
      }
      else
      {
          document.getElementById(SpaceCount.toString())!.style.color = "red";
      }
      if(SpaceCount+1 === QuoteArray.length){
          for (var i = 0; i < QuoteArray.length; i++)
          {
              document.getElementById(i.toString())!.style.color = "black";
          }
          getQuote();
          target.value = '';
      }
  }
}
const handleClick = (e:React.MouseEvent<HTMLElement>, duration: number) =>{
  setReadOnlyBool(false);
  const target = e.target as HTMLElement;
  setTestDuration(duration);
  
  document.getElementById('10')!.style.color = "black";
  document.getElementById('15')!.style.color = "black";
  document.getElementById('30')!.style.color = "black";
  target!.style!.color = "#e2b714"

}
const checkLocked = () =>{
  if(TestDuration === -1){
    setErrorDisplay('flex');
    setErrorMessage('please select a duration for your test.');
    
  }else{
    setReadOnlyBool(false);
  }
  }
  
  return (
    <div style={{backgroundColor: '#323437', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: "flex", flexDirection: 'column'}}>
        <p>  {QuoteArray.map((word, index) => (
                          <span id={index.toString()}>{word} </span>
                      ))}</p>
          <textarea disabled={ReadOnlyBool} onChange={handleTyping} onClick={checkLocked}style={{ resize: 'none', color: 'white', margin: '1em', padding: '0.5em', fontSize: '1.5em', backgroundColor: 'rgb(39, 40, 41)', borderRadius: '10px', height: '30vh', width: '60vw', outline: 'none'}}></textarea>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', height: '10vh'}}>
            <p style={{margin: '0.7em'}}>Duration: </p>
            <p id="10" onClick ={e => handleClick(e, 10)}style={{margin: '0.7em', fontWeight: 'bold'}}> 10 </p>
            <p id="15" onClick ={e => handleClick(e, 15)} style={{margin: '0.7em', fontWeight: 'bold'}}> 15 </p>
            <p id="30" onClick ={e => handleClick(e, 30)} style={{margin: '0.7em', fontWeight: 'bold'}}> 30 </p>
          </div>
          <p style={{display: `${ErrorDisplay}`, color: 'red'}}>{ErrorMessage}</p>
      </div>
    </div>
  )
}

export default Play;