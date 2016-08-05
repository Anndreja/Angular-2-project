import {Control} from 'angular2/common';

export class CustomValidators{
    static email(control: Control){
        let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let pass = regEx.test(control.value);
        return pass ? null : { email: true };
    }
}