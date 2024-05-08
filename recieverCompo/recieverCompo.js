import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';
import searchApplicantAddresses from '@salesforce/apex/ApplicantProvider.searchApplicantAddresses';

const columns = [
    { label: 'Address ID', fieldName: 'Name' },
    { label: 'Country',  fieldName: 'Country__c' },
    { label: 'State', fieldName: 'State__c' },
    { label: 'City', fieldName: 'City__c' },
  ];
export default class RecieverCompo extends LightningElement {

    draftValues=[];
    columns = columns;
    applicantAddressList

    objApplicant = {'sobjectType' : 'Applicant__c'}

    connectedCallback(){
        this.receivedDataHandler()
    }

    receivedDataHandler(){
           pubsub.subscribe("sendDataEvent" , (message) => {
           this.objApplicant.Name = message;
           console.log("Recieved Appicant ID = " + this.objApplicant.Name)

           this.getApplicantAddressHandler()
           
        });

        
    }

    getApplicantAddressHandler(){
        searchApplicantAddresses({appName : this.objApplicant})
        .then((result) => {
            this.applicantAddressList = result
            console.log("Addresses = " + JSON.stringify(this.applicantAddressList))
        })
        .catch((error) => {
            this.error = error
            console.log(this.error)
        })
    }
}