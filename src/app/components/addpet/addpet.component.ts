import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IGenericResponse } from '../../models/generic-response';
import { PetService } from 'src/app/services/pet.service';
import { IPet } from 'src/app/models/pet';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QueriesService } from 'src/app/services/queries.service';
import { take } from 'rxjs';
import { IBreed } from 'src/app/models/breed';



@Component({
  selector: 'app-addpet',
  templateUrl: './addpet.component.html',
  styleUrls: ['./addpet.component.css']
})
export class AddpetComponent {
  submitted = false

  updateForm: FormGroup = new FormGroup(
    {
      nombre: new FormControl("",Validators.required),
      id_raza: new FormControl("",Validators.required),
      color: new FormControl("",Validators.required),
      descripcion: new FormControl( "",Validators.required),
      nacimiento: new FormControl("",Validators.required),
      genero: new FormControl("",Validators.required),
    }
  );
  constructor(
    private petService:PetService,
    private queriesService:QueriesService,
    private router:Router
  ){}
  userID!:any
  breeds!:IBreed[]
  ngOnInit() {
    this.userID=localStorage.getItem('UserID') || ''
    this.queriesService
      .getBreeds()
      .pipe(take(1))
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        next: (values) => {
          this.breeds = values;
          console.log(this.breeds)
        },
      });
  }

  async submit() {
    if(this.updateForm.invalid){
      this.submitted = true;
      return;
    }

    this.submitted = false;

    await this.petService
        .createPet({...this.updateForm.value,id_usuario:this.userID,id_status:1})
        .subscribe(
          (res:IGenericResponse) =>
          {
            Swal.fire(
              'Great!',
              'Succesfully added',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/mypets'])
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
