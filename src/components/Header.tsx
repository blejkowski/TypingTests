import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {FaRegKeyboard, FaUserAlt, FaCrown, FaCog} from 'react-icons/fa';
import GlobalStyle from './globalstyle'

const Header:React.FC = () => {
  return (
    <div style={{width: '100vw', height: '8vh', display: 'flex', flexDirection: 'row', backgroundColor: '#272829', justifyContent: 'space-between', alignItems: 'center'}}>
        <GlobalStyle/>
            <div style={{marginLeft: '1em'}}>
                <HeaderLink to='/'>
                    <p style={{color: '#e2b714', textDecoration: 'none', fontWeight: 'bold' }}>typing tests</p>
                </HeaderLink>
            </div>
           <div style={{marginRight: '1em'}}>
                <HeaderLink to='/play'>
                    <FaRegKeyboard size="15px"/>
                </HeaderLink>
                <HeaderLink to='/leaderboard'>
                    <FaCrown size="15px"/>
                </HeaderLink>
                <HeaderLink to='/profile'>
                    <FaUserAlt size="15px"/>
                </HeaderLink>
                <HeaderLink to='/settings'>
                    <FaCog size="15px"/>
                </HeaderLink>
           </div> 
    </div>
  )
}

const HeaderLink = styled(Link)`
    color: #646669;
    text-decoration: none;
    margin: 1em;
    &:hover{
        color: #797b7d;
    }
`;

export default Header