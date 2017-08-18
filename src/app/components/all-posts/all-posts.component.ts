import { Component, OnInit } from '@angular/core';
import { Post } from '../../classes/entity/post';
import { User } from '../../classes/entity/user';
import { PostService } from '../../service/post.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  sharedUsers: Set<User[]> = new Set();
  setIterator: IterableIterator<User[]>;
  post: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(p => {
          this.post = this.postService.setUserOnEachPost(p);          
          this.post.sort();
        });

        this.sharedUsers = this.postService.getSharedUsersSet();
       
  }
  
}
