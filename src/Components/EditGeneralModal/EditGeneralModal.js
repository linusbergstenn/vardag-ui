import React from 'react';

import axios from "axios";

const EditGeneralModal = (props) => {
    console.log('Modal props', props);
    let url = props.url;
    let imageSrc;
    let choosenFile;


    let addImage = async (image) => {
        console.log('image from input ', image);
        let data = new FormData();
        data.append('pic' ,image, image.name);

        data.append("accountid", aktivitet.AccountId);
        data.append("activityid", aktivitet.ActivityId);

        console.log("data in image: ",data);

        var axiosConfig = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type':'application/x-www-form-urlencoded'
            }
        };

        await axios({
            method: 'post',
            url: url + '/image/UploadImage',
            data: data,
            config: axiosConfig
        }).then((response) => {
            console.log('Image response: ', response.data);
            props.reloadActivities();
        }).catch((error) => {
            console.log('Activity iamge-Error', error);
        });
    };
    let updateActivity = async () => {

        await axios({
            method: 'post',
            url: url + '/GeneralActivity/EditGeneralActivity',
            params: {
            }
        }).then((response) => {
            console.log('imageInput: ', document.getElementById('imageInput').value);
            console.log('update acticity: ', response);
            if(choosenFile){
                addImage(choosenFile);
            }else{
                props.reloadActivities();
            }
        }).catch((error) => {
            console.log('Activity-Error: ', error)
        });


    };
    let aktivitet = props.activity;
    let acDate = new Date(aktivitet.Date);
    let getDateString = () => {
        let year = acDate.getUTCFullYear();
        let month = acDate.getUTCMonth() + 1;
        let day = acDate.getUTCDate();

        if (month < 10)
            month = '0' + month;
        if (day < 10)
            day = '0' + day;
        let dateString = `${year}-${month}-${day}`;
        return dateString;
    };

    let getImageSrc = () => {
        console.log('Aktivitet imageId - getimageSrc: ', aktivitet.ImageId);
      if(aktivitet.ImageId === null || aktivitet.ImageId === undefined ){
          console.log('GetImageSrc: har ingen bild');
          return imageSrc = 'https://picsum.photos/200/?random';

      }else{
          console.log('GetImageSrc: Aktivitet har en bild');
          return imageSrc = url + '/image/GetImage?id=' + aktivitet.ImageId;

      }
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
if(props.activity !== null || props.activity !== undefined){

    getImageSrc();

    return(
        <div className="modal fade" id="edit-generalActivity-modal" tabIndex="-1" role="dialog"
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
                                <input id={'activity-name'} defaultValue={aktivitet.Name} type={'text'} className={'form-control'}/>
                            </div>
                            <div className="input-group d-flex flex-column-reverse">
                                <div>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="editGeneralActivityimageInput" accept="image/*" placeholder={'Välj bild: '} onChange={() =>loadImageSrc()}/>
                                        <label className="custom-file-label" htmlFor="editGeneralActivityimageInput">Välj bild:</label>
                                    </div>
                                </div>
                                <div style={{width: 200 +'px', height: 200 +'px', padding: .1 + 'em',
                                    marginBottom: .5 + 'em', display: 'grid', placeItems: 'center', overflow: 'hidden'}}
                                     className={'border border-dark bg bg-light align-self-center'}>

                                    <img style={{width: 200 +'px'}} src={imageSrc} alt={'Activity image'}
                                    className={'img-fluid'} id={'imageOutput'}/>
                                    
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="activity-description">Beskrivning</label>
                                <textarea defaultValue={aktivitet.Description} className="form-control" id="activity-description" rows={'3'}/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
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
export default EditGeneralModal;