import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PetsComponent } from './components/pets/pets.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreditsComponent } from './components/credits/credits.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component:HomeComponent},
  { path: 'credits', component:CreditsComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'pets', component:PetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
