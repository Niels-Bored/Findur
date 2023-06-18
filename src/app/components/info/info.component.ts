import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user';
import { IGenericResponse } from '../../models/generic-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  userInfo?:IUser
  submitted = false

  updateForm: FormGroup = new FormGroup(
    {
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido_p: new FormControl('', Validators.required),
      apellido_m: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      status_conectado: new FormControl('', Validators.required)
    }
  );
  constructor(
    private userService:UserService,
    private router:Router
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
              this.updateForm.controls['id'].setValue(this.userInfo.id);
              this.updateForm.controls['nombre'].setValue(this.userInfo.nombre);
              this.updateForm.controls['apellido_p'].setValue(this.userInfo.apellido_p);
              this.updateForm.controls['apellido_m'].setValue(this.userInfo.apellido_m);
              this.updateForm.controls['telefono'].setValue(this.userInfo.telefono);
              this.updateForm.controls['email'].setValue(this.userInfo.email);
              this.updateForm.controls['password'].setValue(this.userInfo.password);
              this.updateForm.controls['direccion'].setValue(this.userInfo.direccion);
              this.updateForm.controls['status_conectado'].setValue(this.userInfo.status_conectado);
          }
        );
  }

  async submit() {
    if(this.updateForm.invalid){
      this.submitted = true;
      return;
    }

    this.submitted = false;

    await this.userService
        .updateUser(this.updateForm.value)
        .subscribe(
          (res:IGenericResponse) =>
          {
            Swal.fire(
              'Great!',
              'Data updated succesfully',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/profile'])
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
