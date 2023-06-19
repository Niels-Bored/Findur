import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IGenericResponse } from '../../models/generic-response';
import { PetService } from 'src/app/services/pet.service';
import { IPet } from 'src/app/models/pet';



@Component({
  selector: 'app-addpet',
  templateUrl: './addpet.component.html',
  styleUrls: ['./addpet.component.css']
})
export class AddpetComponent {
  petInfo?:IPet
  submitted = false

  
}
