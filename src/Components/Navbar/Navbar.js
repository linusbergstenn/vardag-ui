import React from 'react';
import $ from 'jquery'

import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../imgs/logo-white.png';

import './Navbar.scss'
const Navbar = (props) => {

    let signedIn = props.signedIn;
    let signOut = props.signOut;
    let user = props.user;
    let show = false;
    console.log('signOut user: ', user);

    let toggleMenu = () => {
            $('.md-menu').toggleClass('d-none').toggleClass('d-flex');
    };

    if (signedIn === false) {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-toggler"
                        aria-controls="navbar-toggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <img className="navbar-brand logo" src={Logo} />

                <div className="collapse navbar-collapse bg-primary" id="navbar-toggler">
                    <div className={' container-fluid d-flex justify-content-around'}>
                        <ul className="navbar-nav mt-2 mt-lg-0 d-lg-block p-2">
                            <NavLink className={'pr-4 link'} to={'/'}>Hem</NavLink>
                            <NavLink className={'pr-4 link'} to={'/About'}>Om vardag</NavLink>
                            <NavLink className={'pr-4 link'} to={'/Contact'}>Kontakt</NavLink>
                        </ul>
                        <div className="my-2 my-lg-0 align-self-center">
                            <NavLink className={'link d-flex'} to={'/LogIn'}>
                                <FontAwesomeIcon className={'sign-in'} icon={'user-alt'} />
                                <p className={'align-self-center'}>LOGGA IN</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }else{
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-toggler"
                        aria-controls="navbar-toggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <img className="navbar-brand logo d-none" src={Logo} />

                <div className="collapse navbar-collapse bg-primary" id="navbar-toggler">
                    <div className={' container-fluid d-flex justify-content-around'}>
                        <ul className="navbar-nav mt-2 mt-lg-0 d-lg-block p-2">
                            <NavLink className={'pr-4 link'} to={'/Events'}>Händelser</NavLink>
                            <NavLink className={'pr-4 link'} to={'/Planner'}>Planera</NavLink>
                            <NavLink className={'pr-4 link'} to={'/About'}>Om VarDag</NavLink>
                            <NavLink className={'pr-4 link'} to={'/Contact'}>Kontakt</NavLink>
                        </ul>
                        <div className="my-2 my-lg-0 align-self-center">
                            <NavLink onClick={ () => signOut(user)} className={'link d-flex sign-out '} to={'/signedout'}>
                                <FontAwesomeIcon  icon={'user-alt'} title={'Sign Out'}/>
                                <p className={'align-self-center'}>LOGGA UT</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
   /* if(signedIn === false){
        return(
            <nav className="navbar sticky-top navbar-light">
                <div className={'container d-flex justify-content-between'}>
                    <a className="navbar-brand" href="#">
                        <img src={Logo}
                             alt={'Logo'}
                             className={'logo'}/>
                    </a>

                    <div>
                        <div className={'d-none d-md-flex justify-content-between align-items-center'}>
                            <div className={'d-flex'}>
                                <NavLink className={'pr-4 link'} to={'/'}>Hem</NavLink>
                                <NavLink className={'pr-4 link'} to={'/About'}>Om VarDag</NavLink>
                                <NavLink className={'pr-4 link'} to={'/Contact'}>Kontakt</NavLink>
                            </div>
                            <div>
                                <NavLink className={'link d-flex align-items-center'} to={'/LogIn'}>
                                    <FontAwesomeIcon className={'sign-in'} icon={'user-alt'} />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => toggleMenu()} className={'d-md-none d-block'}>
                        <FontAwesomeIcon className={'hamburger fa-2x'} icon={'bars'}/>
                    </div>
                </div>

                <div className={'mt-3 container-fluid d-none md-menu bg-primary d-md-none flex-wrap flex-column justify-content-end animated'}>
                    <NavLink className={'pr-4 link'} to={'/'}>Hem</NavLink>
                    <NavLink className={'pr-4 link'} to={'/About'}>Om VarDag</NavLink>
                    <NavLink className={'pr-4 link'} to={'/Contact'}>Kontakt</NavLink>
                    <NavLink className={'link d-flex'} to={'/LogIn'}>
                        <FontAwesomeIcon className={'sign-in'} icon={'user-alt'} />
                        <p className={'align-self-center'}>LOGGA IN</p>
                    </NavLink>
                </div>
            </nav>
        );
    }else{
        return(
            <nav className="navbar sticky-top navbar-light">
                <div className={'container d-none d-md-flex flex-row'}>
                    <div className={'d-flex flex-fill'}>
                        <NavLink className={'pr-4 link'} to={'/Events'}>Händelser</NavLink>
                        <NavLink className={'pr-4 link'} to={'/Planner'}>Planera</NavLink>
                        <NavLink className={'pr-4 link'} to={'/About'}>Om VarDag</NavLink>
                        <NavLink className={'pr-4 link'} to={'/Contact'}>Kontakt</NavLink>
                    </div>
                    <div>
                        <NavLink className={'link d-flex align-items-center'} to={'/signedout'}>
                            <FontAwesomeIcon onClick={ () => signOut(user)} className={'sign-out'} icon={'power-off'} title={'Sign Out'}/>
                        </NavLink>
                    </div>
                </div>
                <div className={'container d-md-none d-flex justify-content-between'}>
                    <FontAwesomeIcon className={'hamburger fa-2x'} icon={'bars'}/>
                </div>
            </nav>
        );
    }*/
};
export default Navbar;