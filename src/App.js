import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Router from './Routes/Router';
import axios from 'axios';
import $ from 'jquery';

import PerfectScrollBar from 'react-perfect-scrollbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faEnvelope, faUserAlt, faPowerOff, faLock, faLockOpen, faScrewdriver, faXRay, faFingerprint, faBolt, faPencilAlt, faBars, faPlus, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'react-perfect-scrollbar/dist/css/styles.min.css'
import './css/App.scss';
import './css/animate.css';

class App extends Component {

    state = {
        loggedIn: false,
        user: {},
        activities: []
    };

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
      console.log('loggedout user: ' ,user);
      alert(user.username + ' loggades ut!');

    };


    async login(user, pass, passInput)
    {

        let axiosConfig = {
            headers: {
                'content-type': 'application/json',
            }
        };

        await axios({
            method: 'post',
            url: 'http://localhost:5000/auth/ValidateUser' /*'http://127.0.0.1:5000/auth/ValidateUser'*/,
            params: {
                username: user,
                password: pass
            }
        }).then((response) => {
            console.log('logged in usr: ', user, '\n response data:  ', response.data);
            this.handleLogin(user, response.data.AccountId);
        }).catch((error) => {
            console.log(error.response);
            if(error.response.status === 404) {
                $('#fail-alert').removeClass('d-none');
                $(passInput).val('');
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
            this.login('Joar', 'joar');
        }
    };

    library.add(faEnvelope, faPhone, faUserAlt, faPowerOff, faLock, faLockOpen, faScrewdriver, faXRay, faFingerprint, faBolt, faPencilAlt, faBars, faPlus, faArrowRight, faArrowLeft);
    window.addEventListener('keypress', quickSign);
    return(
        <div className={'App'}>
          <div className={'scroll-container'}>
            <PerfectScrollBar>
              <Router state={this.state}
                      pics={this.pictures}
                      signIn={(...args) => this.login(...args)}
                      signOut={(...args) => this.logOut(...args)}/>
            </PerfectScrollBar>
          </div>
        </div>
    );
  }
}

export default App;
