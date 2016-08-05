import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';

export class Item{
    title : string;
    rating : number;
    constructor(title : string, rating : number){
        this.title = title;
        this.rating = rating;
    }
}

@Injectable()
export class GridService{
    
    constructor(private _http : Http) { }
    
    getTitles(){
       return this._http.get("app/test/bookTitles.txt").map( data => data.text().split('\n'));
    }
    
}