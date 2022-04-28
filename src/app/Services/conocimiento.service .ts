import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConocimintoDedesarrollo } from '../Models/ConocimintoDedesarrollo';
import { Direccion, Municipio, Provincia } from '../Models/Direccion';

@Injectable({
  providedIn: 'root'
})
export class ConocimientoService {

  constructor(private http:HttpClient) { }


  controller="Conocimiento";


  guardarConocimiento(conocimiento:ConocimintoDedesarrollo){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    var limparData=JSON.stringify(conocimiento);
    //return limparData;
    return this.http.post<ConocimintoDedesarrollo>(environment.apiURL+this.controller,limparData,httpOptions);
  }

  modificarConocimiento(conocimiento:ConocimintoDedesarrollo){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    var limparData=JSON.stringify(conocimiento);
    return this.http.put<Direccion>(environment.apiURL+this.controller,limparData,httpOptions);
  }

 eliminarConocimiento(conocimiento:ConocimintoDedesarrollo){
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  var limparData=JSON.stringify(conocimiento);
    return this.http.put<ConocimintoDedesarrollo>(environment.apiURL+this.controller+"eliminarDireccion",limparData,httpOptions);
  }
}
