import React, {useState, useEffect} from 'react'
import LeaderboardRow, { LeaderboardProps } from '../components/LeaderboardRow'
import axios from 'axios'



const Leaderboard:React.FC = () => {
const [LeaderBoardArray, setLeaderBoardArray] = useState<any[]>([]);

  useEffect(() => {
    async function getData(){
      let users: any;
      await axios.get('http://localhost:5002/user/GetLeadboard/')
              .then(response =>{
                users = response.data;
                setLeaderBoardArray(users);
              });
    }

    getData();
  }, [])
  
    let pr: LeaderboardProps = {
        Rank: 1,
        Username: "string",
        AverageWpm: 10,
        typingTests: 0,
    }
  return (
    <div style={{backgroundColor: '#323437', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{height: '60vh', width: '80vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        {LeaderBoardArray.map((user, index) =>{
          console.log(user);
          return <LeaderboardRow Rank = {index + 1} Username = {user.username} AverageWpm = {user.averageWpm} typingTests = {user.typingTests}/>
        })}
      </div>
      
    </div>
  )
}
export default Leaderboard