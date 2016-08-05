import { Component , OnInit} from 'angular2/core';   
import { PostsService} from './post.service';
import { LoaderComponent} from '../common/loader';
import { UsersService} from '../users/users.service';
import { PaginationComponent} from '../common/pagination.component';

@Component({
    templateUrl:'app/posts/posts.component.html',
    providers:[PostsService,UsersService],
    directives:[LoaderComponent, PaginationComponent],
    styles:[`
      .list-group-item{
          cursor:pointer;
      }
      
    `]
})

export class PostsComponent implements OnInit{
    pagedPosts = [];
    posts = [];
    users = [];
    loading: boolean;
    commentsLoading: boolean;
    activePost;
    pageSize = 10;
    
    constructor( private _posts : PostsService, private _users : UsersService){
        
    }
    
    ngOnInit(){ 
        //users
        this._users.getUsers().subscribe(users => this.users = users);
        // posts
        this.loadPosts();
    }
    
    showPostInfo(post){
        this.activePost = post;
        this.commentsLoading = true;
        this._posts.getPostsInfo(post.id).subscribe(post => this.activePost.comments = post,null, () => this.commentsLoading = false )
    }
    
    loadPosts(param?:number){
        this.loading = true;
        this.activePost = null;
        this._posts.getPosts(param).subscribe(
            posts => this.posts = posts,
            null,
            () => this.loading = false
            );
 
    }
    onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
	}
  
}