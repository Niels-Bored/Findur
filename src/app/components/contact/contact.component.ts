import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SendmailService } from 'src/app/services/sendmail.service';
import { IMail } from 'src/app/models/mail';
import { IGenericResponse } from '../../models/generic-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  submitted = false

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
    private router:Router
  ){}

  async submit() {
    if(this.mailForm.invalid){
      this.submitted = true;
      return;
    }

    this.submitted = false;

    let mail: IMail

    let content = this.mailForm.get('name')?.value + " says: "+
                  "\""+this.mailForm.get('message')?.value+"\""+
                  "\nEmail: "+this.mailForm.get('email')?.value +
                  " \nPhone: "+this.mailForm.get('number')?.value

    mail = {"mail":"petfindur@gmail.com", "body":content}

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
