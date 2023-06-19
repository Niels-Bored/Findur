import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { IPet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';
import { QueriesService } from 'src/app/services/queries.service';
import { NO_IMAGE, PETS_IMAGES } from './constants';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit{

  pageSize = 3;
  displayItems = this.pageSize;
  pets!:IPet[]
  constructor(
    private petService:PetService,
    private router:Router
  ){

  }

  loadBlock(){
    this.displayItems = this.displayItems + this.pageSize;
  }

  get showMoreButton(){
    return this.displayItems < this.pets?.length
  }

  ngOnInit(){
    this.petService.getPets().pipe(take(1)).subscribe({
      next: (data) => {
        console.log(data)
        this.pets = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  dogImage({id}:any){
    return PETS_IMAGES[id] || NO_IMAGE;
  }

  contactOwner(ownerID:string){
    this.router.navigate(['/contactowner',ownerID]);
  }

}
