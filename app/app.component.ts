import {Component} from 'angular2/core';
import {NavbarComponent} from './navbar.component';
import {HomeComponent} from './home.component';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {UsersComponent} from './users/users.component';
import {PostsComponent} from './posts/posts.component';
import {UserFormComponent} from './users/user-form.component';
import {GridComponent} from './test/grid.component';


@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent , useAsDefault:true},
	{ path: '/users', name: 'Users', component: UsersComponent },
    { path: '/posts', name: 'Posts', component: PostsComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Home'] }  ,
    { path: '/users/new', name: 'NewUser', component: UserFormComponent },
	{ path: '/users/:id', name: 'Edit', component: UserFormComponent },
    { path: '/grid', name: 'Grid', component: GridComponent }
	
])
@Component({
    selector: 'my-app',
    template: `
        <navbar></navbar>  
         <div class="container">
            <router-outlet></router-outlet>
        </div> 
    `,
    directives:[NavbarComponent,ROUTER_DIRECTIVES]
})
export class AppComponent { 

}
