import React from 'react';

import Line from '../../imgs/DotLine.svg'
import Logo from '../../imgs/logo-navy.png'

import 'bootstrap';
import './MainContainer.scss';

const MainContainer = (props) => {
    console.log('MainContainer props: ', props);
    let signedIn = props.signedIn;
    let user = props.user;

    if(signedIn === false){
        return(
            <main className={'main-container container-fluid '}>
                <img src={Line}
                     className={'line d-none d-md-block'}/>
                {props.children}
            </main>
        );
    }else{
        return(
            <main className={'main-container container-fluid'}>
                <div className={'container d-none d-lg-flex justify-content-between signed-in-view pt-4'}>
                    <img src={Logo} />
                    <h1 id={'user'} className={'align-self-center'}>{user.name || 'Användare'}</h1>
                </div>
                <img src={Line}
                     className={'line d-none d-md-block'}/>
                {props.children}
            </main>
        );
    }
};
export default MainContainer;