import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { IBreed } from 'src/app/models/breed';
import { IGenericResponse } from 'src/app/models/generic-response';
import { PetService } from 'src/app/services/pet.service';
import { QueriesService } from 'src/app/services/queries.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editpet',
  templateUrl: './editpet.component.html',
  styleUrls: ['./editpet.component.css']
})
export class EditpetComponent {
  submitted = false

  updateForm: FormGroup = new FormGroup(
    {
      id: new FormControl('', Validators.required),
      id_usuario: new FormControl('', Validators.required),
      id_status: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      id_raza: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
    }
  );
  constructor(
    private petService:PetService,
    private queriesService:QueriesService,
    private router:Router,
    private route:ActivatedRoute
  ){}
  userID!:any
  breeds!:IBreed[]
  ngOnInit() {
    const { id } = this.route.snapshot.params;
    this.userID=localStorage.getItem('UserID') ? +(localStorage.getItem('UserID') as any) : ''
    this.petService.getPetByID(id)
    .pipe(take(1))
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        next: (value) => {
          if(this.userID != value.id_usuario){
            
            this.router.navigate(['/mypets'])
          }
          this.updateForm.patchValue(value)
          console.log(value)
        },
      });
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
        .updatePet({...this.updateForm.value})
        .subscribe(
          (res:IGenericResponse) =>
          {
            Swal.fire(
              'Great!',
              'Data updated succesfully',
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
