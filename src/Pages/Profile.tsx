import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Graph from '../components/Graph';
import { selectUser, setUser, Test, User } from '../redux/redux';
type Props = {}

const Profile = (props: Props) => {
    const userSelect = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [GraphTitle, setGraphTitle] = useState('Average WPM per Test');
    const [labels, setlabels] = useState<string[]>(['1','2','3','4','5']); //hard code this because it will always be 5
    const [pts, setpoints] = useState<any>([])
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    useEffect(() => {
        if(!Cookies.get('logged_in'))
            navigate('/login');
        else if(userSelect.Username !== ""){
            displayWPM(userSelect.Tests);   
        }
        else if(userSelect.Username === "" && Cookies.get('user_name')){
            axios.get(`http://localhost:5002/user/GetUserData/?username=${Cookies.get('user_name')}`)
                .then(response=>{
                    let userData = response.data;
                    let user: User = {
                        Username: userData.username,
                        ProfileImage: userData.profileImage,
                        BestWpm: userData.bestWpm,
                        AverageWpm: userData.averageWpm,
                        TypingTests: userData.typingTests,
                        Tests: userData.tests
                    }
                    
                    dispatch(setUser(user));
                    displayWPM(userData.tests);   
                })
                
        }}, [])

        const displayAccuracy = (tests: any[]) =>{
            setGraphTitle('Average Accuracy per Test')
            setpoints(tests.map((value) =>{
                return value.accuracy;
            }))
        }

        const displayWPM = (tests: any[]) =>{
            setGraphTitle('Average WPM per Test')
            setpoints(tests.map((value: Test, index) =>{
                return value.wordsPerMinute;
            }))
        }


  return (
    <div style={{backgroundColor: '#323437', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{border: 'solid 2px black',  borderRadius: '10px', backgroundColor: '#272829', height: '70vh', width: '70vw', display: 'flex', flexDirection: 'column'}}>
            <div style={{height: '15%', display: 'flex', flexDirection: 'row', width: '100%', margin: "1em", justifyContent: 'space-between'}}>
                <div className="image" style={{height: '100%', width: '100%'}}>
                    <img src={userSelect.ProfileImage} alt="" style={{height: '5em', width: '5em', borderRadius: '50px'}}/>
                </div>
                <div className="numbers"style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <h3>Typing Tests: {userSelect.TypingTests.toString()}</h3>
                    <h3>Average WPM: {userSelect.AverageWpm}</h3>
                    <h3>Best WPM: {userSelect.BestWpm}</h3>
                </div>
              
            </div>
            <div style={{display: 'flex', height: '50vh', width: '50vw', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <Graph title={GraphTitle}points={pts} labels={labels}/>
                <div style={{display: 'flex', flexDirection: 'row', height: '10vh'}}>
                    <label style={{margin: '1em'}}>Accuracy  <input id="Accuracy" onChange={e => displayAccuracy(userSelect.Tests)} name="dataToDisplay" type='radio'/></label>
                    <label style={{margin: '1em'}}>Words Per Minute  <input defaultChecked id="WPM" onChange={e => displayWPM(userSelect.Tests)} name="dataToDisplay" type='radio'/></label>
                </div>
            </div>
          
           
        </div>
    </div>
  )
}
//need a model for typing tests
//word per minute
//accuracy

export default Profile