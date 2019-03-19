import React from 'react';
import MainContainer from "../../Components/MainCointainer/MainContainer";
import axios from "axios";

import bg from '../../imgs/lightabstract.jpg'

export const AddActivity = (props) => {
    let url = props.api;

    let choosenFile;
    let imageSrc = 'https://picsum.photos/200/?random';
    let date = new Date();

    let getDateString = () => {

        let year = date.getUTCFullYear();
        let month = date.getUTCMonth() + 1;
        let day = date.getUTCDate();

        if (month < 10)
            month = '0' + month;
        if (day < 10)
            day = '0' + day;
        let dateString = `${year}-${month}-${day}`;
        console.log('dateString: ', dateString);
        return dateString;
    };

    let loadImageSrc = () => {

        let file = document.querySelector('input[type=file]').files[0];
        console.log('choosen file', file);
        let reader  = new FileReader();

        reader.onloadend = () => {
            document.getElementById('imageOutput').src = reader.result;
        };
        if(file){
            reader.readAsDataURL(file);
            choosenFile = file;

        }
    };
    let addImage = async (image) => {
        console.log('image from input ', image);
        let data = new FormData();
        data.append('pic' ,image, image.name);

        await axios({
            method: 'post',
            url: url + '/image/UploadImage',
            data: data
        }).then((response) => {
            console.log('Image response: ', response.data);
            props.reloadActivities();
        }).catch((error) => {
            console.log('Error', error);
        });
    };

    let maxEnergy = 10;
    let optionsArray = [];
    for(let i = 0; i < maxEnergy; i++)
        optionsArray.push(i+1);
    let options = optionsArray.map ( (option, index) => {
        return <option key={index}>{option}</option>
    });

    let currHour = () => {
        let hour = date.getHours();
        let minute = date.getMinutes();
        if(hour < 10)
            hour = '0'+hour;
        if(minute < 10)
            minute = '0'+minute;

        let string = `${hour}:${minute}`;
        return string;
    };
    let nextHour = () => {
        let hour = date.getHours() + 1;
        let minute = date.getMinutes();
        if(hour < 10)
            hour = '0'+hour;
        if(minute < 10)
            minute = '0'+minute;

        let string = `${hour}:${minute}`;
        return string;
    };

    let style = {
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      height: 100 + 'vh',
        width: 100 + 'vw'
    };
    return(
        <MainContainer user={props.user} signedIn={props.signedIn} style={style}>
                <div className={'container bg-light'}>
                    <div className={'container p-3'}>
                        <h2 className={'title'}>Lägg till en allmänn aktivitet: </h2>
                    </div>
                    <div className=''>
                        <form>
                            <div className='d-flex align-items-center justify-content-around flex-column-reverse flex-md-row'>
                                <div className={'w-75 d-flex flex-column-reverse flex-md-column'}>
                                    <div className='form-group'>
                                        <label htmlFor={'activity-name'}>Namn på aktivitet:</label>
                                        <input id={'activity-name'} type={'text'} className={'form-control'}/>
                                    </div>
                                    <div className='mb-2 mb-md-0'>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="imageInput" accept="image/*" placeholder={'Välj bild: '} onChange={() =>loadImageSrc()}/>
                                            <label className="custom-file-label" htmlFor="imageInput">Välj bild för aktivitet:</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group d-flex flex-column-reverse">
                                    <div style={{width: 200 +'px', height: 200 +'px', padding: .1 + 'em',
                                        marginBottom: .5 + 'em', display: 'grid', placeItems: 'center', overflow: 'hidden'}} className={'border border-dark bg bg-light align-self-center'}>
                                        <img style={{width: 200 +'px'}} src={imageSrc} alt={'Activity image'} className={'img-fluid'} id={'imageOutput'}/>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label htmlFor={'activity-name'}>Beskrivning av aktivitet</label>
                                <textarea id={'activity-name'} className={'form-control'}/>
                            </div>
                        </form>
                    </div>
                </div>
        </MainContainer>
    );
};