import React from 'react';



import './EditModal.scss';
import axios from "axios";
import $ from "jquery";
const EditModal = (props) => {
    console.log('Modal props', props);
    let deleteActivity = async () => {
     let cnfrm = window.confirm('Vill du ta bort: ' + props.activity.Name +'?');

     if(cnfrm){
         await  axios({
             method: 'post',
             url: 'http://localhost:5000/activity/DeleteActivity',
             params: {
                 id: props.activity.ActivityId
             }
         }).then((response) => {
             console.log('data: ', response.data);
             props.reloadActivities();
         }).catch((error) => {
             console.log('Error: ', error)
         });
     };

    };
    let updateActivity = async () => {

        await axios({
            method: 'post',
            url: 'http://localhost:5000/activity/EditActivity',
            params: {
                    ActivityId: props.activity.ActivityId,
                    ActivityName: document.getElementById('activity-name').value || props.activity.Name,
                    Description: document.getElementById('activity-description').value || props.activity.Description,
                    TimeStart: document.getElementById('timeStart').value || props.activity.TimeStart,
                    TimeEnd: document.getElementById('timeEnd').value || props.activity.TimeEnd,
                    Date: document.getElementById('date').value || props.activity.Date,
                    Monday: document.getElementById('optionBox0').checked,
                    Tuesday: document.getElementById('optionBox1').checked,
                    Wednesday: document.getElementById('optionBox2').checked,
                    Thursday: document.getElementById('optionBox3').checked,
                    Friday: document.getElementById('optionBox4').checked,
                    Saturday: document.getElementById('optionBox5').checked,
                    Sunday: document.getElementById('optionBox6').checked,
                    Energy: document.getElementById('energyOptions').value || props.activity.Energy,
                    Privat: document.getElementById('permBox0').checked,
                    Hemma: document.getElementById('permBox1').checked,
                    Skola: document.getElementById('permBox2').checked,
                    Repeat: props.activity.Repeat
            }
        }).then((response) => {
            console.log('data: ', response.data);
            props.reloadActivities();
        }).catch((error) => {
            console.log('Error: ', error)
        });


    };
    let aktivitet = props.activity;

    let weekdayString = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];
    let weekdays = weekdayString.map( (day, index) => {
        let weekday = [aktivitet.Monday, aktivitet.Tuesday, aktivitet.Wednesday, aktivitet.Thursday, aktivitet.Friday, aktivitet.Saturday, aktivitet.Sunday];
        if(weekday[index] !== true){
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"optionBox" + index} />
                    <label className="custom-control-label" htmlFor={"optionBox" + index}>{day}</label>
                </div>
            );
        }else{
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"optionBox" + index} defaultChecked/>
                    <label className="custom-control-label" htmlFor={"optionBox" + index}>{day}</label>
                </div>
            );
        }

    });

    let permissionsArray = ['privat', 'hemma', 'skola'];

    let permissions = permissionsArray.map( (permLevel, index) => {
        if (permLevel !== true){
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"permBox" + index} />
                    <label className="custom-control-label" htmlFor={"permBox" + index}>{permLevel}</label>
                </div>
            );
        }else{
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"permBox" + index} checked/>
                    <label className="custom-control-label" htmlFor={"permBox" + index}>{permLevel}</label>
                </div>
            );
        }
    });


    let maxEnergy = 10;
    let optionsArray = [];
    for(let i = 0; i < maxEnergy; i++)
        optionsArray.push(i+1);
    let options = optionsArray.map ( (option, index) => {


        if (aktivitet.energy === index+1){
            return <option key={index} selected>{option}</option>
        }else
            return <option key={index}>{option}</option>
    });

if(props.activity !== null || props.activity !== undefined){
    return(
        <div className="modal fade" id="edit-content-modal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Redigera aktivitet: <span className={'text-muted'}>#{aktivitet.ActivityId}</span></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className={'form-group'}>
                                <label htmlFor={'activity-name'}>Namn på aktivitet:</label>
                                <input id={'activity-name'} placeholder={aktivitet.Name} type={'text'} className={'form-control'}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="activity-description">Beskrivning</label>
                                <textarea placeholder={aktivitet.Description} className="form-control" id="activity-description" rows={'3'}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="date">Datum för aktivitet: </label>
                                <input className={'form-control'} type={'date'} id={'date'} placeholder={aktivitet.Date} />
                            </div>
                            <div className={'form-group d-flex justify-content-around'}>
                                <div>
                                    <label htmlFor="timeStart">Aktiviteten start: </label>
                                    <input className={'form-control'} type={'time'} id={'timeStart'} defaultValue={aktivitet.TimeStart} />
                                </div>
                                <div>
                                    <label htmlFor="timeEndt">Aktiviteten slutar: </label>
                                    <input className={'form-control'} type={'time'} id={'timeEnd'} defaultValue={aktivitet.TimeEnd} />
                                </div>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor={'weekdays'}>Vilka dagar utförs arbetet</label>
                                <div id={'weekdays'}>
                                    {weekdays}
                                </div>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="energyOptions">Energikrävande</label>
                                <select className="form-control" id="energyOptions">
                                    {options}
                                </select>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="permissions">Behörigheter</label>
                                <div id="permissions">
                                    {permissions}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-alt2" data-dismiss="modal" onClick={() => {deleteActivity()}}>Delete Activity</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => updateActivity()}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}else{
    return(
        <div className="modal fade" id="edit-content-modal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                </div>
            </div>
            );
}

};
export default EditModal;