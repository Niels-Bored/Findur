import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { SendmailService } from 'src/app/services/sendmail.service';
import { IUser } from '../../models/user';
import { IMail } from 'src/app/models/mail';
import { IGenericResponse } from '../../models/generic-response';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contactowner',
  templateUrl: './contactowner.component.html',
  styleUrls: ['./contactowner.component.css']
})
export class ContactownerComponent {
  submitted = false
  ownerID:string = ""
  email:string = ""
  name:string = ""

  mailForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    }
  );

  constructor(
    private sendMailService:SendmailService,
    private userService:UserService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ){
    this.activatedRoute.params.subscribe(params=>{
      this.ownerID = params['ownerID'];
      this.userService
      .getUserByID(this.ownerID)
      .subscribe(
          (user: IUser) => {
              console.log(user)
              this.email=user.email || ""
              this.name=user.nombre || ""
          }
        );
    })
  }

  async submit() {
    if(this.mailForm.invalid){
      this.submitted = true;
      return;
    }

    this.submitted = false;

    let mail: IMail

    let content = "Hey "+this.name+",\n "+
                  this.mailForm.get('name')?.value + " says: "+
                  "\""+this.mailForm.get('message')?.value+"\""+
                  "\nEmail: "+this.mailForm.get('email')?.value +
                  " \nPhone: "+this.mailForm.get('number')?.value

    mail = {"mail":this.email, "body":content}

    await this.sendMailService
        .sendMail(mail)
        .subscribe(
          (res:IGenericResponse) =>
          {
            Swal.fire(
              'Great!',
              "We'll answer you as soon as possible",
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/home'])
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
