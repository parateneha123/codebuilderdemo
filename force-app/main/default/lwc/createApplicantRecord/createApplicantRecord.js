import { LightningElement } from 'lwc';
import createApplicantRecord from '@salesforce/apex/ApplicantProvider.createApplicantRecord';
export default class CreateApplicantRecord extends LightningElement {

    date
    applicantObj = {'sobjectType' : 'Applicant__c'}
    
    saveButtonHandler(){

        this.applicantObj.First_Name__c = this.template.querySelector('lightning-input[data-formfield="firstName"]').value;
        this.applicantObj.Last_Name__c = this.template.querySelector('lightning-input[data-formfield="lastName"]').value;
        this.applicantObj.Mobile_Number__c = this.template.querySelector('lightning-input[data-formfield="mobnumber"]').value;
        this.applicantObj.DOB__c = this.template.querySelector('lightning-input[data-formfield="dateOfBirth"]').value;
        this.applicantObj.EmailID__c = this.template.querySelector('lightning-input[data-formfield="emailID"]').value;
        this.applicantObj.PAN_Card__c = this.template.querySelector('lightning-input[data-formfield="panCard"]').value;

        console.log(this.applicantObj.First_Name__c)
        console.log(this.applicantObj.Last_Name__c)
        console.log(this.applicantObj.Mobile_Number__c)
        console.log(this.applicantObj.DOB__c)
        console.log(this.applicantObj.EmailID__c)
        console.log(this.applicantObj.PAN_Card__c)

        createApplicantRecord({ objApplicant : this.applicantObj})
      .then((result) => {
        this.result = result;
        this.error = undefined;
        })
        .catch((error) => {
            this.error = error;
            this.result = undefined;
        });
        

    }

}