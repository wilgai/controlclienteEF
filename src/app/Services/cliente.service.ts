import { Injectable }  from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Direccion } from '../Models/Direccion';
import { Cliente } from '../Models/Cliente';
import { ConocimintoDedesarrollo } from '../Models/ConocimintoDedesarrollo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http:HttpClient) { }
  controller="Clientes/";
  formDataCliente!:Cliente ;
  direcciones!:Direccion[];
  conocimientos!:ConocimintoDedesarrollo[];
 
  obtenerClientes(){
    return this.http.get<Cliente>(environment.apiURL+this.controller);
  }
  guardarCliente(){
    var body={
      ...this.formDataCliente,
      Direcciones:this.direcciones,
      Conocimientos:this.conocimientos
     
    };
    var data=JSON.stringify(body);
    return this.http.post<Cliente>(environment.apiURL+this.controller,body);
    //return data;
    
  }
  ActualizarCliente(){
    var body={
      ...this.formDataCliente,
      Direcciones:this.direcciones,
      Conocimientos:this.conocimientos
     
    };
    var data=JSON.stringify(body);
   return this.http.put<Cliente>(environment.apiURL+this.controller,body);
    //return data;
    
  }
  obtenerClienteByID(id:string){
    return this.http.get<Cliente>(environment.apiURL+this.controller+id);
  }

  EliminarCliente(){
    var body={
      ...this.formDataCliente,
      Direcciones:this.direcciones,
      Conocimientos:this.conocimientos
    };
    var data=JSON.stringify(body);
   return this.http.put<Cliente>(environment.apiURL+this.controller,body);
    //return data;
  }
}
