import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IPet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';
import { QueriesService } from 'src/app/services/queries.service';

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
    private petService:PetService
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
        this.pets = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
