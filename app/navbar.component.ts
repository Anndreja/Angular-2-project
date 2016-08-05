import { Component } from 'angular2/core'; 
import {ROUTER_DIRECTIVES, Router} from 'angular2/router'; 


@Component({
    selector:'navbar',
    templateUrl:'app/navbar.component.html',
    directives: [ROUTER_DIRECTIVES]
   
})

export class NavbarComponent{
   nav;
    constructor(private _router: Router){
    }
    
    isActiveRoute(route){
        this.nav = this._router.generate(route);
        return this._router.isRouteActive(this.nav);
    }
 
}

