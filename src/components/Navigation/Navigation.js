import React from 'react';
import "./Navigation.css";

const Navigation = ({onRouteChange,isSignedIn}) => {
    
        if (isSignedIn){
            return(
            <nav className="nav-style br2 b--black-20">
                <p onClick={() => onRouteChange('signout')} className='signout'> Sign Out </p>
            </nav>
            );
        }
        else{
            return(
            <nav className="nav-style br2 b--black-20">
                <p onClick={() => onRouteChange('signin')} className='signout'> Sign In</p>
                <p onClick={() => onRouteChange('register')} className='signout'> Register</p>
            </nav>
            );
        }
}

export default Navigation;