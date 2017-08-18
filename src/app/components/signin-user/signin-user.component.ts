import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { User } from './../../classes/entity/user';
import { UserService } from './../../service/user.service';

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css'],
  providers: [User],
})
export class SigninUserComponent implements OnInit {
  opResponse: any = null;
  invalidFlag: boolean = false;
  nameLength: number;
  addressLength: number;
  sentEmailAddress: string = '';
  iterator: IterableIterator<[string, User]>;
  iteratorResult: IteratorResult<[string, User]>;
  valueArray: [string, User];

  constructor(private userService: UserService, private user: User) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if(f.untouched || f.invalid){
      this.invalidFlag = true;
      this.nameLength = f.value.name.length;
      this.addressLength = f.value.address.length;

      console.log("errors in the form");
    } else {
      this.sentEmailAddress = f.value.email;
      
      this.nameLength = f.value.name.length;
      this.addressLength = f.value.address.length;

      this.user.name = f.value.name;
      this.user.email = f.value.email;
      this.user.address = f.value.address;
      
      let response$ = this.userService.signupUser(this.user);
      console.log(response$);
        response$.subscribe(u => {
          // this.iterator =  u.entries;
          // this.iteratorResult = this.iterator.next();
          // this.valueArray = this.iteratorResult.value;
          

          // console.log(this.valueArray);
          console.log(u);
          console.log(u.values);
          // console.log(JSON.stringify(u));
          this.opResponse  = u;
        }, (err: any) => { 
          console.log(err.status); 
          console.log(JSON.stringify(err));
        });
    }  
    f.resetForm(); 
  }
}
