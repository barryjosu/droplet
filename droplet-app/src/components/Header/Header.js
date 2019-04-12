import React from 'react'
import './Header.css'
import Logo from './logo.png'
import Auth from '../Auth/Auth.js'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

// const currentThemeDotState = store.getState().themeDotReducer.currentTheme

function logout(){
    Auth.eraseCookie('token');
    window.location.assign('/login');
    //return <Redirect to='/login' />
}

function displayLogout(){
    return (<div>heyho</div>)
    if(Auth.isAuthenticated() === true){
        return <button onClick={logout}>Logout</button>
    }
}

const Header = () => (
    <header className="app-header">
        <img className='logo' src={Logo} alt='Droplet logo' />
        <displayLogout/>
        <div className='theme-dot' alt='Theme switcher'></div>
    </header>
)

export default Header
