import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreditsComponent } from './components/credits/credits.component';
import { PetsComponent } from './components/pets/pets.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { InfoComponent } from './components/info/info.component';
import { MypetsComponent } from './components/mypets/mypets.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddpetComponent } from './components/addpet/addpet.component';
import { ContactownerComponent } from './components/contactowner/contactowner.component';
import { EditpetComponent } from './components/editpet/editpet.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    CreditsComponent,
    PetsComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    InfoComponent,
    MypetsComponent,
    NavbarComponent,
    AddpetComponent,
    ContactownerComponent,
    EditpetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
