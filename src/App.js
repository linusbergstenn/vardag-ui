import React, { Component } from 'react';

import Router from './Routes/Router';
import axios from 'axios';
import $ from 'jquery';

import PerfectScrollBar from 'react-perfect-scrollbar';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone, faEnvelope, faUserAlt, faPowerOff, faLock, faLockOpen,
    faScrewdriver, faXRay, faFingerprint, faBolt, faPencilAlt,
    faBars, faPlus, faArrowRight, faArrowLeft, faCaretDown, faTrash}
    from '@fortawesome/free-solid-svg-icons';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'react-perfect-scrollbar/dist/css/styles.css'
import './css/App.scss';
import './css/animate.css';
import Config from './Config.json';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: {}
        };
        this.url = Config.URL.PUBLISH
    }


    handleLogin = (name, id) => {
        console.log('handle login');
        let stringedName =  name.charAt(0).toUpperCase() + name.slice(1);


        this.setState({
            loggedIn: true,
            user: {
                username: name,
                name: stringedName,
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
            url: this.url + '/auth/ValidateUser',
            params: {
                username: user,
                password: pass
            }
        }).then((response) => {
            console.log('login response: ', response);
            this.handleLogin(user, response.data.accountId);
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
                alert('Server error.')
            }
        });
    };



    render() {
    console.log('api url: ', this.url);
    let quickSign = (event) => {
        if(event.code === 'Backslash' && this.state.loggedIn === false){
            this.login('Linus', 'linus');
        }
    };

    library.add(faEnvelope, faPhone, faUserAlt, faPowerOff, faLock, faLockOpen, faScrewdriver,
        faXRay, faFingerprint, faBolt, faPencilAlt, faBars, faPlus, faArrowRight, faArrowLeft, faCaretDown, faTrash);
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
