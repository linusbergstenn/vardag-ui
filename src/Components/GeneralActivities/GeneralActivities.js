import React from 'react'
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const GeneralActivities = (props) => {
    let activities = props.activities;
    let activityImage;
    console.log('General Activities:', activities);

    let removeActivity = async (name, id) => {
        console.log('remove activity with id: ', id);

        let cnfrm = window.confirm('Vill du ta bort ' + name + '?');

        if(cnfrm){

            await axios({
                method: 'post',
                url: props.api + '/GeneralActivity/DeleteGeneralActivity',
                params: {
                    ActivityId: id
                }
            })
                .then( response => {
                    console.log(response.data);
                    props.reloadActivities();
                })
                .catch( error => {

                })
        }else
            alert('´sdasadsdasadsadsad')
    };

    let getImage = async (a) => {
        console.log('Aktivitet ' + a.Name + ' har ett bildId:', a.ImageId);
        activityImage = props.api + '/image/GetImage?id=' + a.ImageId;
    };

    let asd = activities.map( (activity, index) => {

        let editor = () => {
            if(activity.Contributor === props.user.name){
                return(
                    <div className='d-flex'>
                        <FontAwesomeIcon icon={'trash'} className='text-danger icon m-2' onClick={ () => removeActivity(activity.Name, activity.ActivityId) }/>
                        <FontAwesomeIcon icon={'pencil-alt'} className='icon m-2' onClick={ () => props.sendToModal(activity) }
                                         data-toggle={'modal'} data-target={'#edit-generalActivity-modal'}/>
                    </div>
                )
            }else return (<h4> Tillagd av: {activity.Contributor} </h4>);
        };
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

        return(
            <div className='card mb-2' key={index}>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center border-bottom mb-2'>
                        <h2>{activity.Name}</h2>
                        {editor()}
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p>{activity.Description}</p>
                        {actImage()}
                    </div>
                </div>
            </div>
        );
    });

    if(activities.length > 0){
        return(
            <div>
                {asd}
            </div>
        );
    }else return(<div className='d-flex justify-content-center align align-items-center'> <h1>OJ, HÄR VAR DET TOMT!!</h1></div>)

};
export default GeneralActivities