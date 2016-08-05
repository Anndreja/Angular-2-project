import {Component, OnInit} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators} from 'angular2/common';
import {CustomValidators} from '../common/validators';
import {UsersService} from './users.service';
import {User} from './user';
import {CanDeactivate,ComponentInstruction, Router, RouteParams} from 'angular2/router';
// import {User} from './user';

@Component({
   templateUrl:'app/users/user-form.component.html',
   providers: [UsersService]

})

export class UserFormComponent implements CanDeactivate{
    
    form: ControlGroup;
    user = new User();
    active :boolean = true;
	constructor( 
        formBuilder: FormBuilder,
        private _router: Router,
        private _routerParam: RouteParams,
        private _userService: UsersService
        ) {

		this.form = formBuilder.group({
			name: ['', Validators.required],
			email: ['', CustomValidators.email],
			phone: ['', Validators.required],
			address: formBuilder.group({
				street: [],
				suite: [],
				city: [],
				zipcode: []
			})
		});
	}
    
    routerCanDeactivate(next,prev){

        if(this.form.dirty && this.active === true)
          return confirm("Are you sure you want leave ?");
  
          
         return true;       
    }
    
    save(){
         
         let result;
        
         (this.user.id) ? result = this._userService.updateUser(this.user,this.user.id) : result = this._userService.addUser(this.user)
		 result.subscribe(x => {
            this._router.navigate(['Users']);
         });
          this.active = false;
     
         
    }
    

    
    ngOnInit(){
        let id = this._routerParam.get("id");
  
        if (!id)
			return;
   
        let userId = this._routerParam.get('id');
        this._userService.getUserForEdit(userId).subscribe( user => this.user = user );
    }
    
   
    
   
}