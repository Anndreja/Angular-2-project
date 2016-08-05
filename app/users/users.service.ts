import {Injectable} from 'angular2/core'
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()

export class UsersService{
    
    constructor(private _http: Http){
        
    }
    
    getUsers(){
      return this._http.get('http://jsonplaceholder.typicode.com/users').map(result => result.json())
      
    }
    
    addUser(user){
        return this._http.post('http://jsonplaceholder.typicode.com/users',JSON.stringify(user)).map(add => add.json());
    } 
    
    getUserForEdit(userId) {
        return this._http.get('http://jsonplaceholder.typicode.com/users/'+ userId ).map(edit=> edit.json());
    }
   
    updateUser(user,userId){
        return this._http.put('http://jsonplaceholder.typicode.com/users/'+ userId, JSON.stringify(user)).map(update => update.json());
    }
    deleteUser(userId) {
		return this._http.delete('http://jsonplaceholder.typicode.com/users/'+ userId)
			.map(res => res.json());
	}
    
}