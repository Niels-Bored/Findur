import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private userService:UserService){}

  get userRedirection(){
    const userId = this.showSignout; 
    return !!userId ? '/profile' : '/login'
  }

  get showSignout(){
    return localStorage.getItem('UserID');
  }

  logout(){
    this.userService.closeSession()
  }
}
