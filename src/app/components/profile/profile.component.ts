import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userInfo?:IUser

  constructor(
    private userService:UserService
  ){}

  ngOnInit() {
    let userID=''
    if(localStorage.getItem('UserID')){
      userID=localStorage.getItem('UserID') || ''
    }

    console.log(userID)

    this.userService
      .getUserByID(userID)
      .subscribe(
          (user: IUser) => {
              this.userInfo=user
              console.log(this.userInfo)
          }
        );
  }


}
