import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Router from './Routes/Router';
import axios from 'axios';
import $ from 'jquery';

import PerfectScrollBar from 'react-perfect-scrollbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faEnvelope, faUserAlt, faPowerOff, faLock, faLockOpen,
    faScrewdriver, faXRay, faFingerprint, faBolt, faPencilAlt,
    faBars, faPlus, faArrowRight, faArrowLeft, faCaretDown}
    from '@fortawesome/free-solid-svg-icons';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'react-perfect-scrollbar/dist/css/styles.css'
import './css/App.scss';
import './css/animate.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: {}
        };
    }


    handleLogin = (name, id) => {
        console.log('handle login');
        this.setState({
            loggedIn: true,
            user: {
                username: name,
                name: name,
                userId: id
            }
        });
    };

    logOut = (user) => {
      this.setState({
          loggedIn: false
      });
      alert(user.username + ' loggades ut!');
    };


    async login(user, pass, passInput)
    {

        let axiosConfig = {
            headers: {
                'content-type': 'application/json',
            }
        };
        $('.spinner-border').removeClass('d-none');
        await axios({
            method: 'post',
            url: 'http://www.altrankarlstad.com/vardag-api/auth/ValidateUser',
            params: {
                username: user,
                password: pass
            }
        }).then((response) => {
            this.handleLogin(user, response.data.AccountId);
        }).catch((error) => {
            console.log(error.response);
            $('.spinner-border').addClass('d-none');
            if(error.response.status === 404) {
                $('#fail-alert').removeClass('d-none');
                passInput.value = '';
                setTimeout( () => {
                    $('#fail-alert').addClass('d-none');
                }, 2000)
            }
            else {
                alert('asdasdasd');
            }
        });
    };



    render() {

    let quickSign = (event) => {
        if(event.code === 'Backslash' && this.state.loggedIn === false){
            this.login('Linus', 'linus');
        }
    };

    library.add(faEnvelope, faPhone, faUserAlt, faPowerOff, faLock, faLockOpen, faScrewdriver,
        faXRay, faFingerprint, faBolt, faPencilAlt, faBars, faPlus, faArrowRight, faArrowLeft, faCaretDown);
    window.addEventListener('keypress', quickSign);
    return(
        <div className={'App'}>
          <div className={'scroll-container'}>
            <PerfectScrollBar>
              <Router state={this.state} url={this.url}
                      signIn={(...args) => this.login(...args)}
                      signOut={(...args) => this.logOut(...args)}/>
            </PerfectScrollBar>
          </div>
        </div>
    );
  }
}

export default App;
