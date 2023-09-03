import React from 'react'

export type LeaderboardProps = {
    Rank: number,
    Username: string,
    AverageWpm: number,
    typingTests: number,
}

const LeaderboardRow = (props: LeaderboardProps) => {
  return (
    <div style={{height: '50%', width: '50%'}}>
    <div style={{ justifyContent: 'space-between', backgroundColor: '#272829', height: '6vh', borderRadius: '5px', margin: '0.5em', display: 'flex', flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'row', paddingRight: '0.7em'}}> 
            <p style={{ paddingLeft: '0.7em', color: 'rgb(226, 183, 20)'}}>{props.Rank}</p>
            <p style={{ paddingLeft: '2em'}}>{props.Username}</p>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', paddingRight: '0.7em'}}> 
            <p style={{margin: '1em'}}>Average WPM: {props.AverageWpm}</p>
            <p>Tests: {props.typingTests}</p>
        </div>
        
    </div>
   

</div>
  )
}

export default LeaderboardRow