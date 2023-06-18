import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ILoginResponse } from '../../models/login-response';
import { ILoginRequest } from '../../models/login-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submitted = false

  loginForm: FormGroup = new FormGroup(
    {
      nombre: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }
  );

  constructor(private userService:UserService){}


  async submit() {
    if(this.loginForm.invalid){
      this.submitted = true;
      return;
    }

    this.submitted = false;

    let loginRequest:ILoginRequest = this.loginForm.value

    await this.userService
        .login(loginRequest)
        .subscribe(
          (res:ILoginResponse) =>
          {
            console.log(res)
            Swal.fire(
              'Welcome',
              'Succesful login',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {

              }
            });
          },
          (res:any) =>
          {
            console.log()
            Swal.fire(
              'Error',
              res.error.error,
              'error'
            )
          }
      );
  }
}
