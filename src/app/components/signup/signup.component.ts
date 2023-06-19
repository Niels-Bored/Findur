import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { IState } from 'src/app/models/state';
import { AddressService } from 'src/app/services/address.service';
import { QueriesService } from 'src/app/services/queries.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private queriesService: QueriesService,
    private addressService: AddressService,
    private usersService: UserService
  ) {}

  states!: IState[];

  ngOnInit(): void {
    this.queriesService
      .getStates()
      .pipe(take(1))
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        next: (values) => {
          this.states = values;
        },
      });
  }
  form = new FormGroup({
    nombre: new FormControl(),
    apellido_p: new FormControl("",[Validators.required]),
    apellido_m: new FormControl("",[Validators.required]),
    telefono: new FormControl("",[Validators.required]),
    email: new FormControl("",[
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl("",[Validators.required]),
    direccion: new FormGroup({
      calle: new FormControl("",[Validators.required]),
      colonia: new FormControl("",[Validators.required]),
      num_interior: new FormControl("",[Validators.required]),
      num_exterior: new FormControl("",[Validators.required]),
      codigo_postal: new FormControl("",[Validators.required]),
      id_estado: new FormControl("", [Validators.required]),
    }),
  });

  displayAddress = false;

  signup() {
    if (this.form.invalid) {
      console.log('invalid form');
    }
    const {
      nombre,
      apellido_p,
      apellido_m,
      telefono,
      email,
      password,
      direccion,
    } = this.form.getRawValue();
    this.addressService
      .createAdress(direccion as any)
      .pipe(take(1))
      .subscribe({
        error: (err) => {
          console.log(err);
        },
        next: (responseDirection) => {
          console.log(responseDirection)
          this.usersService.createUser({
            nombre,
            apellido_p,
            apellido_m,
            telefono,
            email,
            password,
            direccion: responseDirection.id,
            status_conectado: "true"
          } as any).pipe(take(1)).subscribe({
            error: (err) => {
              console.log(err);
            },
            next: (responseUser) => {
              console.log(responseUser)
            },
          });
        },
      });
  }

  get calleControl() {
    return this.form?.get?.('direccion')?.get?.('calle') as FormControl;
  }

  get coloniaControl() {
    return this.form?.get?.('direccion')?.get?.('colonia') as FormControl;
  }

  get num_interiorControl() {
    return this.form?.get?.('direccion')?.get?.('num_interior') as FormControl;
  }

  get num_exteriorControl() {
    return this.form?.get?.('direccion')?.get?.('num_exterior') as FormControl;
  }

  get codigo_postalControl() {
    return this.form?.get?.('direccion')?.get?.('codigo_postal') as FormControl;
  }

  get id_estadoControl() {
    return this.form?.get?.('direccion')?.get?.('id_estado') as FormControl;
  }
}
