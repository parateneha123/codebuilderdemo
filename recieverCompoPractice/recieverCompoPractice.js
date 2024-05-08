import { LightningElement } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import ComponentHeaderStyles from '@salesforce/resourceUrl/ComponentHeaderStyles'
import pubsub from 'c/pubsub';

export default class RecieverCompoPractice extends LightningElement {

    recievedData

    connectedCallback(){
        this.receivedDataHandler()
    }

    receivedDataHandler(){
        pubsub.subscribe("sendDataEvent" , (message) => {
           this.recievedData = message
        });
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