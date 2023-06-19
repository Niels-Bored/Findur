import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IPet } from 'src/app/models/pet';
import { UserService } from 'src/app/services/user.service';
import { NO_IMAGE, PETS_IMAGES } from '../pets/constants';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-mypets',
  templateUrl: './mypets.component.html',
  styleUrls: ['./mypets.component.css']
})
export class MypetsComponent implements OnInit{

  pets!:IPet[]

  constructor(
    private userService:UserService,
    private petService:PetService
  ){}
  ngOnInit(): void {
    this.getPets()
  }
  
  getPets(){
    const id:any = localStorage.getItem('UserID')
    this.userService.getPetsUserByID(id).pipe(take(1))
    .subscribe({
      error: (err) => {
        console.log(err);
      },
      next: (values) => {
        this.pets = values
      },
    });
  }

  deletePet(pet:IPet){
this.petService.deletePet(pet.id)
.pipe(take(1))
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        next: (values) => {
          this.getPets()
        },
      });
  }

  editPet(pet:IPet){
    this.petService.updatePet(pet)

  }

  dogImage({id}:any){
    return PETS_IMAGES[id] || NO_IMAGE;
  }

}
