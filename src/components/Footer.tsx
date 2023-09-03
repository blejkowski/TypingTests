import React from 'react'
import GlobalStyle from './globalstyle'
import {ImGithub} from 'react-icons/im';

const Footer:React.FC = () => {
  return (
    <div style={{display: 'flex', backgroundColor: '#323437', height: '3vh', width: '100vw', alignItems: 'center', padding: '1em'}}>
        <GlobalStyle/>
        <ImGithub/>
        <a href="github.com" style={{textDecoration: 'none', color: 'black', fontWeight: 'bold', padding: '0.5em'}}>code</a>
    </div>
  )
}

export default Footer