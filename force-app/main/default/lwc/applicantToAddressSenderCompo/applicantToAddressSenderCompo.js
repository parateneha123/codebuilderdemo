import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import ComponentHeaderStyles from '@salesforce/resourceUrl/ComponentHeaderStyles'
import pubsub from 'c/pubsub';
export default class ApplicantToAddressSenderCompo extends LightningElement {

    applicantID

    showAddressHandler() {
        this.applicantID = this.template.querySelector('lightning-input[data-formfield="applicantID"]').value
        console.log(this.applicantID)

        pubsub.publish("sendDataEvent", this.applicantID);
    }

    renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, ComponentHeaderStyles).then(()=>{
            console.log("Product's Compo CSS Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }
}