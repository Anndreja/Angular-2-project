import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';


@Injectable()

export class PostsService{
    url = 'http://jsonplaceholder.typicode.com/posts';
    constructor( private _http : Http ){
        
    }
    
    getPosts(byUserId?: number){
         let url = this.url;
         if(byUserId)
           url += '?userId='+  byUserId;
           
           return this._http.get(url).map(posts => posts.json());
    }
    
    getPostsInfo(postId: number){
        return this._http.get("http://jsonplaceholder.typicode.com/posts/"+ postId +"/comments").map(posts => posts.json());
    }
}