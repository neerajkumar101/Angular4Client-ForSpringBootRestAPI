import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { Post } from './../../classes/entity/post';
import { PostService } from './../../service/post.service'; 

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  providers: [Post],
})
export class CreatePostComponent implements OnInit {

  constructor(private postService: PostService, private post: Post) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.post.postText = f.value.postText;

    let response$ = this.postService.publishPost(1, this.post)
                          .subscribe(p => console.log(JSON.stringify(p)));
  }

}
