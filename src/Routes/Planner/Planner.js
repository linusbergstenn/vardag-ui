import React , { Component } from 'react';
import { Redirect } from "react-router-dom";

import $ from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainContainer from "../../Components/MainCointainer/MainContainer";
import DayView from "../../Components/DayView/DayView";
import EditModal from "../../Components/EditModal/EditModal";
import AddModal from "../../Components/AddModal/AddModal";

import axios from "axios";
import currentWeekNumber from 'current-week-number'

import './Planner.scss';


class Planner extends Component{
    constructor(props){
        super(props);
        this.date = new Date();
        this.state = {
            activities: [],
            clickedActivity: '',
            loadDay: this.date.getDay() -1
        };

        console.log('THIS DATE: ', this.date);

        this.user = props.user;
        this.signedIn = props.signedIn;

        this.getUserActivities(this.user);
    }

    sendToModal(activity){
        if(activity !== null){
            console.log('sendToModal', activity);
            this.setState({clickedActivity: activity})
        }
    };
    getUserActivities(user){

        axios({
            method: 'get',
            url: 'http://localhost:5000/activity/GetActivities',
            params: {
                username: user.name,
            }
        }).then((response) => {
            this.setState({
                activities: response.data
            });
        });
    };

    render(){
        let loremPicsum = 'https://picsum.photos/300/200/?random';

        let active = (index, e) => {
            this.setState({loadDay: index});
            $('.active').removeClass('active');
            $(e.target).addClass('active');

            document.getElementsByClassName('day-container').scrollTop = 0;
        };
        let weekdayString = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];
        let daysArray = [[], [], [], [], [], [], []];
        let sortActivitiesToDays = () => {
            this.state.activities.map( (activity, index) => {
                let weekdays = weekdayString.map( (day, index) => {
                    let weekday = [activity.Monday, activity.Tuesday, activity.Wednesday, activity.Thursday, activity.Friday, activity.Saturday, activity.Sunday];
                    if(weekday[index] === true){
                        daysArray[index].push(activity);
                    }

                    daysArray[index].sort( (a, b) => {
                       let aDate = new Date(a.Date.slice(0, 11) + a.TimeStart);
                       let bDate = new Date(b.Date.slice(0, 11) + b.TimeStart);

                        return aDate - bDate});
                });
                return(weekdays);
            });
        };

        sortActivitiesToDays();
        console.log('daysarray[loadDay] längd: ', daysArray[this.state.loadDay].length);
        let daysNav = weekdayString.map( (day, index) => {
            let cName = '';
            if(index === this.date.getDay() -1){
                cName = 'active';
            }
            return(
                <div key={index}>
                    <a className={'p-4'} onClick={(e) => active(index, e)}><h4 className={cName + ' mr-2'}>{day}dag<span className={'position-relative badge badge-info d-none d-md-inline'}>{daysArray[index].length}</span></h4></a>
                </div>
            );
        });
        let activities = daysArray[this.state.loadDay].map( (activity, index) => {

            let energyArray = [];
            let maxEnergy = 10;
            let energy = activity.energy;

            let modalContent = (activity) => {
                console.log('modal-content-activity: ', activity);
                this.sendToModal(activity);
            };


            for (let i = 0; i < maxEnergy; i++) {
                energyArray.push(<FontAwesomeIcon className={'fa-2x'} icon={'bolt'}/>);
            }

            let energyAmount = energyArray.map( (e, index) => {
                let classname;

                if(energy >= index+1){
                    classname = 'text-warning';
                }


                return(
                    <div key={index} className={'p-3 ' + classname}>
                        {e}
                    </div>
                );
            });

            let weekdays = weekdayString.map( (day, index) => {

                let weekday = [activity.Monday, activity.Tuesday, activity.Wednesday, activity.Thursday, activity.Friday, activity.Saturday, activity.Sunday];
                let cName;
                if(weekday[index] !== true){
                    cName = 'bg-alt2';
                }
                else {
                    cName = 'bg-alt1'
                }

                return (
                    <div key={index} className={'week-day ' + cName}>
                        <h4><span>{day}</span></h4>
                    </div>
                );
            });

            let date = new Date(activity.Date);
            let timeString = () => {
              let hour = date.getHours();
                let minutes = date.getMinutes();
                if(hour < 10){
                    hour = '0' + hour;
                }
                if(minutes < 10){
                    minutes = '0' + minutes;
                }
                return hour + ':' + minutes
            };

                if( daysArray[this.state.loadDay].length === 0){
                    return <h4> Du har inga aktiviteter idag! </h4>
                }else {
                    return(
                        <div key={index} className={'container mb-5 border-bottom border-dark'}>
                            <h4>{activity.Name}</h4>
                            <div className={'container-fluid fa-2x'}><FontAwesomeIcon onClick={() => modalContent(activity)} data-toggle={'modal'} data-target={'#edit-content-modal'} className={'edit-icon'} icon={'pencil-alt'}/></div>
                            <div className={'container-fluid description-container d-flex flex-column flex-md-row justify-content-between'}>
                                <img src={loremPicsum} />
                                <div>
                                    <p>{activity.Description}</p>
                                    <b><time>{activity.TimeStart} - {activity.TimeEnd}</time></b>
                                </div>
                            </div>
                            <div className={'mt-2 container-fluid week-day-container d-flex flex-wrap justify-content-between p-3'}>
                                {weekdays}
                            </div>
                            <div className={'container-fluid energy-container d-flex flex-wrap mt-2'}>
                                {energyAmount}
                            </div>
                        </div>
                    );
                }
        });
        let dayContainer = () => {
            return(
                <div className={'day-container'}>
                    <div className={'container  mb-2 d-flex justify-content-around'}>
                        <span className={'d-flex'}>
                            <a className={'btn btn-muted'}><FontAwesomeIcon icon={'arrow-left'}/> </a>
                            <h4 className={'align-self-center'}>Vecka: {currentWeekNumber(this.date)}</h4>
                            <a  className={'btn btn-muted'}><FontAwesomeIcon icon={'arrow-right'}/> </a>
                        </span>
                        <a title={'Lägg till aktivitet'} className={'btn btn-alt1 pr-4 pl-4'} data-toggle={'modal'} data-target={'#add-content-modal'}><FontAwesomeIcon icon={'plus'}/></a>
                    </div>
                    <nav className={'d-flex flex-wrap justify-content-around bg-primary'}>
                        {daysNav}
                    </nav>
                    <div className={'container-fluid bg-light'}>
                        <div className={'activity-list'}>
                            {activities}
                        </div>
                    </div>
                </div>
            );
        };

        if(this.signedIn === false){
            return <Redirect to={'/login'} />
        }else{
            return(
                <MainContainer signedIn={this.signedIn} user={this.user}>
                    <div className={'container'}>
                        <div className={'container'}>
                            <h2 className={'title'}>Planera</h2>
                        </div>
                        {dayContainer()}
                    </div>
                    <EditModal reloadActivities={ () => this.getUserActivities(this.user)} activity={this.state.clickedActivity}/>
                    <AddModal reloadActivities={() => this.getUserActivities(this.user)} user={this.user}/>
                </MainContainer>
            );
        }
    }
};
export default Planner;