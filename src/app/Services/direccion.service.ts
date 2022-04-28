import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Direccion, Municipio, Provincia } from '../Models/Direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor(private http:HttpClient) { }
  formDataDireccion!:Direccion ;
  urlProvinciar="http://provinciasrd.raydelto.org/provincias";
  urlMunicipio="http://provinciasrd.raydelto.org/provincias/";
  controller="Direccion";

 
  
  obtenerProvincias(){
    return this.http.get<Provincia>(this.urlProvinciar);
  }
  obtenerMunicipioDeUnaProvincia(id:string){
    return this.http.get<Municipio>(this.urlMunicipio+id+"/municipios");
  }

  guardarDireccion(direccion:Direccion){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    var limparData=JSON.stringify(direccion);
   //return limparData;
    return this.http.post<Direccion>(environment.apiURL+this.controller,limparData,httpOptions);
  }
  modificarDireccion(direccion:Direccion){
    var limparData=JSON.stringify(direccion);
    return this.http.put<Direccion>(environment.apiURL+this.controller,limparData);
  }

 eliminarDireccion(direccion:Direccion){
  var limparData=JSON.stringify(direccion);
    return this.http.put<Direccion>(environment.apiURL+this.controller+"eliminarDireccion",limparData);
  }
}
