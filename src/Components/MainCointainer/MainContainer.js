import React from 'react';

import Line from '../../imgs/DotLine.svg'
import Logo from '../../imgs/logo-navy.png'

import 'bootstrap';
import './MainContainer.scss';

const MainContainer = (props) => {
    let signedIn = props.signedIn;
    let user = props.user;
    let style;

    if(props.style !== null || props.style !== undefined){
        style = props.style;
    }

    if(signedIn === false){
        return(
            <main style={style}  className={'main-container container-fluid'}>
                <img src={Line}
                     className={'line'}/>
                {props.children}
            </main>
        );
    }else{
        return(
            <main style={style} className={'main-container container-fluid'}>
                <div className={'container d-none d-lg-flex justify-content-between signed-in-view'}>
                    <img src={Logo} />
                    <h1 id={'user'} className={'align-self-center'}>{user.username || 'Användare'}</h1>
                </div>
                <img src={Line}
                     className={'line'}/>
                {props.children}
            </main>
        );
    }
};
export default MainContainer;