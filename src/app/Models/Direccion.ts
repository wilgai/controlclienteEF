export interface Direccion{
    Id:number;
    lineaDeDireccion1:string;
    lineaDeDireccion2:string;
    pais:string;
    provincia:string;
    municipio:string;
    codigoPostal:string;
    message:string;
    isSuccess:boolean;
    result:string;
}

export interface serverResponse{
    message:string;
}

export class Provincia{
    
  
    constructor(public  codigo: number, public nombre: string) { }
}
export interface Municipio{
    codigo:string;
    nombre:string;
}
export class Pais{
    constructor(public  codigo: number, public nombre: string) { }
}
   