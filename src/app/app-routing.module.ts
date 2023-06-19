import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PetsComponent } from './components/pets/pets.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreditsComponent } from './components/credits/credits.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InfoComponent } from './components/info/info.component';
import { MypetsComponent } from './components/mypets/mypets.component';
import { AddpetComponent } from './components/addpet/addpet.component';
import { EditpetComponent } from './components/editpet/editpet.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component:HomeComponent},
  { path: 'credits', component:CreditsComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'pets', component:PetsComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'profile',component:ProfileComponent},
  {path:'info',component:InfoComponent},
  {path:'mypets',component:MypetsComponent},
  {path:'add-pet',component:AddpetComponent},
  {path:'edit-pet/:id',component:EditpetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
