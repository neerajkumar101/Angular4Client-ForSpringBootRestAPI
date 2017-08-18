import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import  'rxjs/add/operator/map';

import { User } from '../classes/entity/user';

@Injectable()
export class UserService {

  private baseUrl: string = 'http://localhost:8080/api/v1';
 
  constructor(private http : Http){
  }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    let headers = new Headers();

    //supder-duper important to set it, 
    //othervise data format will not be accepted by the api server
   headers.append('Content-Type', 'application/json');
    return headers;
  }

  public signupUser(user: User) : Observable<Map<string, User>>{
     var response$ = this.http
      .post(`${this.baseUrl}/user`, JSON.stringify(user), {headers: this.getHeaders()})
      .map(mapUserMap);
    return response$;
  }

  getUser(userId: number): Observable<User> {
    let user$ = this.http
      .get(`${this.baseUrl}/user/${userId}`, {headers: this.getHeaders()})
      .map(mapUser);
      return user$;
  }

  getUserByPost(postId: number): Observable<User> {
    let user$ = this.http
      .get(`${this.baseUrl}/getuserbypost/post/${postId}`, {headers: this.getHeaders()})
      .map(mapUser);
      return user$;
  }

}

// for a single post
function mapUser(response:Response): User{
   return toUser(response.json())
}

// for a single post
function mapUserMap(response:Response): Map<string, User>{
  console.log(response.json());
   return response.json();
}

/**
 * bindint the java post object  with the typescript post object
 * @param r 
 */
function toUser(r:any): User{
  let user = <User>({
    userId: r.userId,
    name: r.name,
    email: r.email,
    address: r.address,
    post: r.post,
  });
  return user;
}
