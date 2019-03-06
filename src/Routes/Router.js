import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from '../Components/Header/Header';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import LogIn from './LogIn/LogIn';
import Events from './Events/Events';
import Planner from './Planner/Planner';
import LogOut from './LogOut/LogOut';
import NotFound from './NotFound/NotFound';

const Routes = (props) =>{
    let signedIn = props.state.loggedIn;
    let user = props.state.user;
    console.log('signedIn: ', signedIn + '\n user: ', user);
        if(signedIn === false){
            return(
                <BrowserRouter>
                    <div>
                        <Header signedIn={signedIn} signOut={props.signOut} user={user}/>
                        <Switch>
                            <Route exact path={'/'} component={() => <Home signedIn={signedIn} user={user}/>} />
                            <Route path={'/About'} component={() => <About signedIn={signedIn} user={user}/>} />
                            <Route path={'/Contact'} component={() => <Contact signedIn={signedIn} user={user}/>} />
                            <Route path={'/LogIn'} component={() => <LogIn signedIn={signedIn} signIn={props.signIn} user={user}/>} />
                            <Route path={'/Events'} component={ () => <Events signedIn={signedIn} user={user}/>} />
                            <Route path={'/Planner'} component={ () => <Planner signedIn={signedIn} user={user}
                                                                                pics={props.pics} />} />
                            <Route path={'/signedout'} component={ () => <LogOut signedIn={signedIn}/>} />
                            <Route component={NotFound} />
                        </Switch>
                        <Footer/>
                    </div>
                </BrowserRouter>
            );
        }else{
            return(
                <BrowserRouter>
                    <div>
                        <Navbar signedIn={signedIn} signOut={props.signOut} user={user} />
                        <Switch>
                            <Route exact path={'/'} component={() => <Home signedIn={signedIn} user={user}/>} />
                            <Route path={'/About'} component={() => <About signedIn={signedIn} user={user}/>} />
                            <Route path={'/Contact'} component={() => <Contact signedIn={signedIn} user={user}/>} />
                            <Route path={'/LogIn'} component={() => <LogIn signedIn={signedIn} signIn={props.signIn} user={user}/>} />
                            <Route path={'/Events'} component={ () => <Events signedIn={signedIn} user={user} user={user}/>} />
                            <Route path={'/Planner'} component={ () => <Planner signedIn={signedIn} user={user}
                                                                                pics={props.pics}
                                                                                activities={props.state.activities}/>} />
                            <Route path={'/signedout'} component={ () => <LogOut signedIn={signedIn}/>} />
                            <Route component={NotFound} />
                        </Switch>
                        <Footer/>
                    </div>
                </BrowserRouter>
            );
        }
};
export default Routes;