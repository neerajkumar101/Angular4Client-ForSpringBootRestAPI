import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/map';

import { Post } from '../classes/entity/post';
import { User } from '../classes/entity/user';
import { UserService } from './user.service';

@Injectable()
export class PostService {
  private sharedByUsers: Set<User[]> = new Set();
  private baseUrl: string = 'http://localhost:8080/api/v1';
  public userService: UserService;
  constructor(private http : Http, userService : UserService){
    this.userService = userService;
  }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  public publishPost(userId:number, post: Post) : Observable<Post>{
    var response$ = this.http.put(`${this.baseUrl}/user/${userId}/post`, 
        JSON.stringify(post), {headers: this.getHeaders()})
        .map(mapPost);
    return response$;
  }

  public getAllPosts(): Observable<Post[]>{
    let posts$ = this.http
      .get(`${this.baseUrl}/posts`, {headers: this.getHeaders()})
      .map(mapPosts);
      return posts$;
  }

  public getAllSharedBy(postId: number): Observable<User[]>{
    let sharedBy$ = this.http
      .get(`${this.baseUrl}/sharedBy/post/${postId}`, {headers: this.getHeaders()})
      .map(mapSharedBy);
      return sharedBy$;
  }

  public getSharedUsersSet(): Set<User[]>{
    console.log(this.sharedByUsers);
    return this.sharedByUsers;
  }

  setUserOnEachPost(postArray: Post[]): Post[]{
    let customPostArray : Post[] = [];
    let i: number = 0;

    postArray.forEach(eachPost => {
      let users$ = this.userService.getUserByPost(eachPost.postId);
      
      let localSharedBy$ = this.getAllSharedBy(eachPost.postId); 

      localSharedBy$.forEach(sharedByArray => {
          this.sharedByUsers.add(sharedByArray);
        }); 

      users$.forEach(eachUser => {
        eachPost.user = eachUser;
        customPostArray[i] = eachPost;
        i++;
      });

    });
    console.log(this.sharedByUsers);          

    return customPostArray;
  }

  public getPost(userId: number, postId: number): Observable<Post> {
    let post$ = this.http
      .get(`${this.baseUrl}/user/${userId}/post/${postId}`, {headers: this.getHeaders()})
      .map(mapPost);
      return post$;
  }
}

// for a single post
function mapPost(response:Response): Post{
   return toPost(response.json())
}

//for a list of all posts
function mapPosts(response:Response): Post[]{
   return response.json().map(toPost)
}
//for a list of all Shared By
function mapSharedBy(response:Response): User[]{
   return response.json().map(toSharedByUser)
}
/**
 * bindint the java post object  with the typescript post object
 * @param r 
 */
function toPost(r:any): Post{
  let post = <Post>({
    postId: r.postId,
    postText: r.postText,
    likeCount: r.likeCount,
    shareCount: r.shareCount,
    user: r.user,
    sharedBy: r.sharedBy
  });
  return post;
}
function toSharedByUser(r:any): User{
  let user = <User>({
    userId : r.userId,
    name : r.name,
    email : r.email,
    address : r.address,
    post: r.post,
  });
  return user;
}

