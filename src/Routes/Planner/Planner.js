import React , { Component } from 'react';
import { Redirect } from "react-router-dom";

import $ from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainContainer from "../../Components/MainCointainer/MainContainer";
import DayView from "../../Components/DayView/DayView";
import EditModal from "../../Components/EditModal/EditModal";
import AddModal from "../../Components/AddModal/AddModal";

import axios from "axios";

import currentWeekNumber from 'current-week-number';

import './Planner.scss';


class Planner extends Component{
    constructor(props){
        super(props);
        this.date = new Date();
        this.state = {
            activities: [],
            clickedActivity: '',
            date: this.date,
            day: this.date.getDay()
        };
        console.log('THIS DATE: ', this.date);
        console.log('Planner props: ', props);
        this.a = props.api;
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
    getDateString() {
        let year = this.state.date.getUTCFullYear();
        let month = this.state.date.getUTCMonth() + 1;
        let day = this.state.date.getUTCDate();

        if (month < 10)
            month = '0' + month;
        if (day < 10)
            day = '0' + day;
        let dateString = `${year}-${month}-${day}`;
        console.log('dateString: ', dateString);
        return dateString;
    }
    getUserActivities(user){

        axios({
            method: 'get',
            url: this.a + '/activity/GetActivities',
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
        let newDate = new Date(this.state.date);
        let dateAdd = () => {
            newDate.setDate(newDate.getDate() + 1);
            this.setState({
                date: newDate,
                day: newDate.getDay()
            });
        };

        let dateSubtract = () => {
            newDate.setDate(newDate.getDate() - 1);
            this.setState({
                date: newDate,
                day: newDate.getDay()
            });
        };

        let specificDate = () => {
            let inpVal = document.getElementById('specificDate').value;
            console.log('moved from: ', this.state.date);

            this.setState({
                date: new Date(inpVal),
                day: new Date(inpVal).getDay()
            });
            console.log('to:  ', this.state.date);
        };
        let getDayString = () => {
            let weekdayString = ['Sön', 'Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör'];
            let todayString;

            if(window.innerWidth > 1023){
                todayString =weekdayString[this.state.day] + 'dag ' + this.state.date.getUTCDate() + ' / ' + (this.state.date.getUTCMonth() + 1 )+ ' - ' + this.state.date.getUTCFullYear();
            }else{
              todayString = weekdayString[this.state.day] + ' ' + this.state.date.getUTCDate() + ' / ' + (this.state.date.getUTCMonth() + 1 )+ ' - ' + this.state.date.getUTCFullYear().toString().slice(2);
            }

            return todayString;
        };
        let dayContainer = () => {


            return(
                <div className={'day-container bg-light'}>
                    <nav className={'day-nav d-flex justify-content-between bg-primary'}>
                        <a className={'day-navigator w-25'} onClick={() => dateSubtract()}><FontAwesomeIcon className={'fa-3x align-self-center'} icon={'arrow-left'}/></a>
                        <div>
                            <div className={'p-3 d-flex justify-content-between'} data-toggle="collapse"
                                 data-target="#datePicker" aria-expanded="false" aria-controls="datePicker">
                                <h4>{getDayString()}</h4>
                                <FontAwesomeIcon icon={'caret-down'} className={'fa-2x ml-2 align-self-center'}/>
                            </div>
                            <div className={'collapse p-4 bg-primary'} id={'datePicker'}>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="specificDate">Välj ett datum: </label>
                                        <input type="date" className="form-control" id="specificDate" defaultValue={this.getDateString()}/>
                                    </div>
                                    <a onClick={specificDate} className={'btn btn-light text-uppercase text-dark'}> Välj datum </a>
                                </form>
                            </div>
                        </div>
                        <a className={'day-navigator w-25'} onClick={() => dateAdd()}><FontAwesomeIcon className={'fa-3x align-self-center'} icon={'arrow-right'}/></a>
                    </nav>
                    <DayView date={this.state.date} activities={this.state.activities} sendToModal={(...args) => this.sendToModal(...args)}/>
                </div>
            );
        };
        if(this.signedIn === false){
            return <Redirect to={'/login'} />
        }else{
            return(
                <MainContainer signedIn={this.signedIn} user={this.user}>
                    <div className={'container mt-2 mb-4'}>
                        <div className={'container d-flex justify-content-between mb-1'}>
                            <h2 className={'title'}>Planera</h2>
                            <h2>Vecka: {currentWeekNumber(this.state.date)}</h2>
                            <div title={'Lägg till aktivitet'} className={'btn btn-alt1 pr-4 pl-4 add-activity-btn'} data-toggle={'modal'} data-target={'#add-content-modal'}><FontAwesomeIcon icon={'plus'}/></div>
                        </div>
                        {dayContainer()}
                    </div>
                    <EditModal reloadActivities={ () => this.getUserActivities(this.user)} activity={this.state.clickedActivity}
                               date={this.state.date} url={this.a}/>
                    <AddModal reloadActivities={() => this.getUserActivities(this.user)} user={this.user} date={this.state.date}
                              dateString={(...args) => this.getDateString(...args) } url={this.a}/>
                </MainContainer>
            );
        }
    }
};
export default Planner;