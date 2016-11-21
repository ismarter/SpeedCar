import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    selector: 'page-form-validate',
    templateUrl: 'form-validate.html'
})
export class FormValidatePage {

    validateModel: any = {};

    constructor(public navCtrl: NavController) {
    }

    ionViewDidLoad() {
        console.log('Hello FormValidatePage Page');
    }

    submit($event, ngForm) {
        console.log($event);
        console.log(ngForm);
    }
}
