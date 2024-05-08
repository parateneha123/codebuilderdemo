import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import ComponentHeaderStyles from '@salesforce/resourceUrl/ComponentHeaderStyles'

export default class ResetSliderCompo extends LightningElement {

    isCssLoaded = false

    resetButtonHandler(event){
        const lwcInputFields =this.template.querySelector('c-slider-compo').resetSliderValue();


        if (lwcInputFields) {
            lwcInputFields.forEach(event => {
                event.reset();
            });
        }

    }

    renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, ComponentHeaderStyles).then(()=>{
            console.log("Applicant's Compo CSS Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }
    
}