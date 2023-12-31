import { IAddress } from "./address";

export class IUser {
  id?:string;
  nombre?:string;
  apellido_p?:string;
  apellido_m?:string;
  telefono?:string;
  email?:string;
  password?:string;
  direccion?:IAddress;
  status_conectado?:string;
}
