import {Component, OnInit} from 'angular2/core';
import {GridService, Item} from './grid.service';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { Rating,Alert, PAGINATION_DIRECTIVES  } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    
     templateUrl:'app/test/grid.component.html',
     providers:[GridService],
     directives: [Alert,BUTTON_DIRECTIVES,Rating,PAGINATION_DIRECTIVES ]
  
})

export class GridComponent implements OnInit{
    items : Item[] = [];
    pageItems : Item[] = [];
    alerts : string[] = [];
    
    numItems : number = 15;
    maxStars : number = 9;
    loadDataStatus : boolean = false;
    pageSettings = {
        perPage : 5,
        currentPage:1,
        firstIndex:0
    };

    constructor(private _service : GridService) { }
    
    ngOnInit() {
       this.loadData();
	}
    
    loadData(){
        this.loadDataStatus = true;
        this._service.getTitles().subscribe((titles)=>{
           this.items.length = 0; 
           this.pageItems.length = 0;
           //generating titles and rating
           for(let count = 0; count<this.numItems; count++){
               let randTitle : number = Math.floor((Math.random() * (titles.length-1)) + 0);
               let randRating : number = Math.floor((Math.random() * 9) + 1);
               this.items.push(new Item(titles[randTitle],randRating));
           }
           this.pageItems = _.take(this.items, this.pageSettings.perPage);
           
        },null,() => { this.loadDataStatus = false; });
    }
    
     remove(item){
       this.alerts.push(item.title);
       this.items.splice(this.items.indexOf(item),1);
       this.numItems = this.items.length;
       this.reloadPage();
     }
    
    newPage($event){
        this.pageSettings.firstIndex = ($event.page-1)*this.pageSettings.perPage;
        this.reloadPage();
    }
    reloadPage(){
        this.pageItems = _.take(_.rest(this.items, this.pageSettings.firstIndex), this.pageSettings.perPage);  
    }
    closeAlert(index){
       this.alerts.splice(index,1);
    }
}