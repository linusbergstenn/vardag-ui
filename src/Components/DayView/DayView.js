import React from 'react';

import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';

import './DayView.scss'
import axios from "axios";
const DayView = (props) => {
    let date = props.date;
    let activities = props.activities;
    let weekdayString = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];
    let todaysActivities = [];
    let activityImage;

    console.log('activities recieved in dayview: ', activities);


    let getImage = async (a) => {
      console.log('Aktivitet ' + a.Name + ' har ett bildId:', a.ImageId);
      activityImage = props.api + '/image/GetImage?id=' + a.ImageId;
    };


    let aktiviteter = activities.map( (activity) => {
        let d = new Date(activity.Date);
        let weekday = [activity.Sunday, activity.Monday, activity.Tuesday, activity.Wednesday, activity.Thursday, activity.Friday, activity.Saturday];



        if(weekday[date.getDay()] === true){
            if(d.getTime() <= date.getTime()){
                todaysActivities.push(activity);
            }
        }else{
            if (d.toDateString() === date.toDateString())
            todaysActivities.push(activity);
        }

       todaysActivities.sort( (a,b) => {
           let adate= new Date(a.Date.slice(0, 11) + a.TimeStart);
           let bdate = new Date(b.Date.slice(0, 11) + b.TimeStart);

           let aDate = adate.getHours();
           let bDate = bdate.getHours();
           return aDate - bDate
       })
    });
    console.log('todyasActivities: ', todaysActivities);
    let dgnsAktiviteter = todaysActivities.map( (activity, index) => {
        let subActivitiesArray = [activity, activity];
        let energyArray = [];
        let maxEnergy = 10;
        let energy = activity.energy;
        let actImage;

        if(activity.ImageId !== null){
            getImage(activity);
             actImage = () =>{
                return(
                    <div style={{width: 250 +'px', height: 250 +'px', padding: .1 + 'em',
                        marginBottom: .5 + 'em', display: 'grid', placeItems: 'center', overflow: 'hidden'}} className={'border bg bg-light align-self-md-center'}>
                    <img src={activityImage} alt={'Activity image'} className={'img-fluid'}/>
                    </div>
                )
            }
        }else{
             actImage = () => {return null};
        }

        let modalContent = (activity) => {
            props.sendToModal(activity);
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
                <div key={index} className={'p-md-3 ' + classname}>
                    {e}
                </div>
            );
        });

        let weekdays = weekdayString.map( (day, index) => {

            let weekday = [activity.Monday, activity.Tuesday, activity.Wednesday, activity.Thursday, activity.Friday, activity.Saturday, activity.Sunday];
            let engWeekday = [activity.Sunday, activity.Monday, activity.Tuesday, activity.Wednesday, activity.Thursday, activity.Friday, activity.Saturday];
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

        let subactivities = subActivitiesArray.map( (sub, index) => {
            let energy = sub.energy;

            let subEnergyAmount = energyArray.map( (e, index) => {
                let classname;

                if(energy >= index+1){
                    classname = 'text-warning';
                }


                return(
                    <div key={index} className={'p-1 ' + classname}>
                        {e}
                    </div>
                );
            });
            return(
                <div key={index} className={'card p-2 mb-2'}>
                    <div className={'card-body'}>
                        <div className={'d-flex justify-content-between'}>
                            <h4>{sub.Name}</h4>
                            <FontAwesomeIcon onClick={() => modalContent(sub)}
                                             data-toggle={'modal'} data-target={'#edit-content-modal'} className={'edit-icon'} icon={'pencil-alt'}/>
                        </div>
                        <p> {sub.Description}</p>
                        <div className={'d-flex justify-content-between flex-wrap'}>
                            {subEnergyAmount}
                        </div>
                    </div>
                </div>
            );
        });
        return(
            <div key={index} className={'container p-3 card mt-1 mb-2 mx-auto'}>
               <div className={'card-body'}>
                   <div className={'d-flex justify-content-between mb-2 border-bottom align-items-center'}>
                       <h4 style={{flex: '1 1 100%'}}>{activity.Name}</h4>
                       <div className={'container-fluid fa-2x'}>
                           <FontAwesomeIcon onClick={() => modalContent(activity)}
                                            data-toggle={'modal'} data-target={'#edit-content-modal'} className={'edit-icon'} icon={'pencil-alt'}/>
                       </div>
                   </div>
                   <div className={'container-fluid description-container d-flex flex-column flex-md-row-reverse justify-content-between'}>
                       {actImage()}
                       <div>
                           <p>{activity.Description}</p>
                           <b><time>{activity.TimeStart} - {activity.TimeEnd}</time></b>
                       </div>
                   </div>
                   <div className={'mt-2 container-fluid week-day-container d-flex flex-wrap justify-content-around justify-content-md-between p-3'}>
                       {weekdays}
                   </div>
                   <div className={'container-fluid energy-container d-flex flex-wrap justify-content-around justify-content-md-between mt-2'}>
                       {energyAmount}
                   </div>
                   <div className={'mt-2'} id={"accordion"}>
                       <div className="card">
                           <div className="card-header d-flex justify-content-between" id={"heading" + index} data-toggle="collapse"
                                data-target={"#collapse" + index} aria-expanded="false"
                                aria-controls={"collapse" + index}>
                               <h5 className="align-self-center">
                                   VISA SUBACTIVITIES
                               </h5>
                               <FontAwesomeIcon icon={'caret-down'} className="fa-2x" />
                           </div>

                           <div id={"collapse" + index} className="collapse" aria-labelledby={"heading" + index}
                                data-parent="#accordion">
                               <div className="card-body bg-light">
                                   {subactivities}
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
        );
    });


    if(todaysActivities.length === 0){
        return(
            <div className={'activity-list'}>
                <div className={'container no-activities'}>
                    <h1 className={'m-3'}>DET FINNS INGA AKTIVITETER IDAG</h1>
                </div>
            </div>
        );
    }else{
        return(
            <div className={'activity-list'}>
                <PerfectScrollbar>
                    {dgnsAktiviteter}
                </PerfectScrollbar>
            </div>
        );
    }

};
export default DayView;