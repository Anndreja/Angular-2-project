import { Component,OnInit } from 'angular2/core';  
import { UsersService } from './users.service';
import {RouterLink} from 'angular2/router'; 



@Component({
    templateUrl:'app/users/users.component.html',
    providers:[UsersService],
    directives: [RouterLink]
})

export class UsersComponent{
    users: any [];
    constructor(private _users:UsersService){
     
    }   
    
    // Get User 
    
	ngOnInit() {
        	 this._users.getUsers().subscribe(users => this.users = users);
    }
    
    // delete user
     deleteUser(user){
		if (confirm("Are you sure you want to delete " + user.name + "?")) {
			let index = this.users.indexOf(user)
            this.users.splice(index, 1);
			this._users.deleteUser(user.id)
				.subscribe(null, 
					err => {
                        alert("Opps problem , could not delete this user !");          
						this.users.splice(index, 0, user);
					});           
		}
	}
  
}