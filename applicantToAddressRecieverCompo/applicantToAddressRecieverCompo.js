import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import ComponentHeaderStyles from '@salesforce/resourceUrl/ComponentHeaderStyles'
import pubsub from 'c/pubsub';
import searchAddresses from '@salesforce/apex/ApplicantProvider.searchAddresses';

const columns = [
    { label: 'Address ID', fieldName: 'Name' },
    { label: 'Country',  fieldName: 'Country__c' },
    { label: 'State', fieldName: 'State__c' },
    { label: 'City', fieldName: 'City__c' },
  ];

export default class ApplicantToAddressRecieverCompo extends LightningElement {

    draftValues=[];
    columns = columns;

    applicantAddressList
    applicantID

    connectedCallback(){
        this.receivedDataHandler()
    }

    receivedDataHandler(){
           pubsub.subscribe("sendDataEvent" , (message) => {
           this.applicantID = message;
           console.log("Recieved Appicant ID = " + this.applicantID)

           this.getApplicantAddressHandler()
          
        });

    }

    getApplicantAddressHandler() {
        searchAddresses({appName : this.applicantID})
           .then( (result) => {
               this.applicantAddressList = result;
               
           })
           .catch( (error) => {
               this.error = error
           })
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