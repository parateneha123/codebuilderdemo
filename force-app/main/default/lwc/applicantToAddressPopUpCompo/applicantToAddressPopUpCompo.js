import { LightningElement } from 'lwc';
import searchAddresses from '@salesforce/apex/ApplicantProvider.searchAddresses';
export default class ApplicantToAddressPopUpCompo extends LightningElement {

    applicantID
    appAddressList
    showPopUpFlag =false

    showApplicantAddressHandler() {
        this.showPopUpFlag = true
        this.applicantID = this.template.querySelector('lightning-input[data-formfield="applicantID"]').value
        console.log(this.applicantID)

        searchAddresses({appName : this.applicantID})
        .then((result) => {
            this.appAddressList = result
            console.log(JSON.stringify(this.result))
        })
        .catch((error) => {
            this.error = error
        })
    }

    closePopUpHandler(event) {
        this.showPopUpFlag = event.detail
    }

  
}