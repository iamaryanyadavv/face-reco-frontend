import React from 'react';
import logo from './Logo.png';
import './Logo.css';
const Logo = () => {
    return(
        <div>
            <div className="Tilt" options={{ max : 25 }}>
                <div className="Tilt-inner"><img alt='logo' src={logo} className='logo'></img> </div>
            </div>
        </div>
    );
} 

export default Logo;