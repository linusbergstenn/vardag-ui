import React from 'react';
import axios from "axios";

const AddModal = (props) => {
    console.log('Add_Modal props', props);
    let addActivity = async () => {

        await axios({
            method: 'post',
            url: 'http://localhost:5000/activity/AddActivity',
            params: {
                AccountId: props.user.userId,
                ActivityName: document.getElementById('add_activity-name').value,
                Description: document.getElementById('add_activity-description').value,
                TimeStart: document.getElementById('add_timeStart').value,
                TimeEnd: document.getElementById('add_timeEnd').value,
                Date: document.getElementById('add_date').value,
                Monday: document.getElementById('add_optionBox0').checked,
                Tuesday: document.getElementById('add_optionBox1').checked,
                Wednesday: document.getElementById('add_optionBox2').checked,
                Thursday: document.getElementById('add_optionBox3').checked,
                Friday: document.getElementById('add_optionBox4').checked,
                Saturday: document.getElementById('add_optionBox5').checked,
                Sunday: document.getElementById('add_optionBox6').checked,
                Energy: document.getElementById('add_energyOptions').value,
                Privat: document.getElementById('add_permBox0').checked,
                Hemma: document.getElementById('add_permBox1').checked,
                Skola: document.getElementById('add_permBox2').checked,
                Repeat: document.getElementById('repeatable').checked
            }
        }).then((response) => {
            props.reloadActivities();
        }).catch((error) => {
            console.log('Error: ', error)
        });


    };
    let aktivitet = props.activity;

    let weekdayString = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];
    let weekdays = weekdayString.map( (day, index) => {
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"add_optionBox" + index} />
                    <label className="custom-control-label" htmlFor={"add_optionBox" + index}>{day}</label>
                </div>
            );

    });

    let permissionsArray = ['privat', 'hemma', 'skola'];

    let permissions = permissionsArray.map( (permLevel, index) => {
            return(
                <div key={index} className="custom-control custom-checkbox custom-control-inline">
                    <input className="custom-control-input" type="checkbox" id={"add_permBox" + index} />
                    <label className="custom-control-label" htmlFor={"add_permBox" + index}>{permLevel}</label>
                </div>
            );
    });


    let maxEnergy = 10;
    let optionsArray = [];
    for(let i = 0; i < maxEnergy; i++)
        optionsArray.push(i+1);
    let options = optionsArray.map ( (option, index) => {
        return <option key={index}>{option}</option>
    });

    if(props.activity !== null || props.activity !== undefined){
        return(
            <div className="modal fade" id="add-content-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Lägg till aktivitet:</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className={'form-group'}>
                                    <label htmlFor={'add_activity-name'}>Namn på aktivitet:</label>
                                    <input id={'add_activity-name'} type={'text'} className={'form-control'}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="add_activity-description">Beskrivning</label>
                                    <textarea className="form-control" id="add_activity-description" rows={'3'}/>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="add_date">Datum för aktivitet: </label>
                                    <input className={'form-control'} type={'date'} id={'add_date'} />
                                </div>
                                <div className={'form-group d-flex justify-content-around'}>
                                    <div>
                                        <label htmlFor="add_timeStart">Aktiviteten start: </label>
                                        <input className={'form-control'} type={'time'} id={'add_timeStart'}/>
                                    </div>
                                    <div>
                                        <label htmlFor="add_timeEnd">Aktiviteten slutar: </label>
                                        <input className={'form-control'} type={'time'} id={'add_timeEnd'}/>
                                    </div>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor={'weekdays'}>Vilka dagar utförs arbetet</label>
                                    <div id={'weekdays'}>
                                        {weekdays}
                                    </div>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="add_energyOptions">Energikrävande</label>
                                    <select className="form-control" id="add_energyOptions">
                                        {options}
                                    </select>
                                </div>
                                <div className={'form-group'}>
                                    <label htmlFor="add_permissions">Behörigheter</label>
                                    <div id="add_permissions">
                                        {permissions}
                                    </div>
                                </div>
                                <div className={'form-group'}>
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                        <label className={'custom-control-label'} htmlFor="repeatable">repeatable</label>
                                        <input className={'custom-control-input'} type={'checkbox'} id="repeatable" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-alt2" data-dismiss="modal">Stäng</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => addActivity()}>Lägg till aktivitet</button>
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
export default AddModal;