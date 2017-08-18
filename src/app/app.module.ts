import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule,Routes } from '@angular/router';
import { Logger } from "angular2-logger/core";

import { CreatePostComponent } from './components/create-post/create-post.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { DeletePostComponent } from './components/delete-post/delete-post.component';
import { SharePostComponent } from './components/share-post/share-post.component';
import { SigninUserComponent } from './components/signin-user/signin-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';
import { PostComponent } from './components/post/post.component';
import { UserComponent } from './components/user/user.component';
import { CredentialComponent } from './components/credential/credential.component';
import { CommentComponent } from './components/comment/comment.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { DeleteCommentComponent } from './components/delete-comment/delete-comment.component';
import { UpdateCommentComponent } from './components/update-comment/update-comment.component';
import { AdminComponent } from './components/admin/admin.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';

import { PostService } from './service/post.service';
import { UserService } from './service/user.service';

export const routes: Routes = [
        {
          path: "*",
          component: AppComponent
        },
        {
          path: "all-posts",
          component: AllPostsComponent
        },
        {
          path: "create-post",
          component: CreatePostComponent
        },
        {
          path: "app-signin-user",
          component: SigninUserComponent
        }
      ]

@NgModule({
  imports:      [ 
      BrowserModule,
      HttpModule,
      FormsModule,
      RouterModule.forRoot(routes),
    ],                            /** imports - other modules whose exported classes are 
                                    * needed by component templates declared in this module.
                                    */

  declarations: [ AppComponent, 
      CreatePostComponent, 
      AllPostsComponent, 
      DeletePostComponent, 
      SharePostComponent, 
      SigninUserComponent, 
      LoginUserComponent, 
      LogoutUserComponent, 
      PostComponent, 
      UserComponent, 
      CredentialComponent, 
      CommentComponent, 
      CreateCommentComponent, 
      DeleteCommentComponent, 
      UpdateCommentComponent, 
      AdminComponent, 
      UpdatePostComponent 
    ],                            /** declarations: the view classes that belong to this module. 
                                    * Angular has three kinds of view classes: components, 
                                    * directives, and pipes.
                                    * 
                                    * declarations: [ AppComponent, Component2, component3 ]
                                    * but these component must be imported and 
                                    * names must match the import name
                                    */

  exports:      [],               /** exports - the subset of declarations that should be 
                                    * visible and usable in the component templates of other 
                                    * modules.
                                    */

  providers:    [ 
      PostService,
      UserService, 
      Logger,
    ],                            /**
                                    * providers - creators of services that this module 
                                    * contributes to the global collection of services; 
                                    * they become accessible in all parts of the app.                                      
                                    */  

  bootstrap:    [ AppComponent ]  /** bootstrap - the main application view, called the 
                                    * root component, that hosts all other app views. 
                                    * Only the root module should set this bootstrap property. 
                                    */
                                                                  
})
export class AppModule { }   


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/