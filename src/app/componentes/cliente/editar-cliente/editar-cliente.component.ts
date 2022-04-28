import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio, Provincia } from 'src/app/Models/Direccion';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ConocimientoService } from 'src/app/Services/conocimiento.service ';
import { DireccionService } from 'src/app/Services/direccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
 
  data: any;
  style:any;
  id:any;
  nombre:any;
  provincias!:Provincia[];
  form!:FormGroup;
  municipios!: Municipio[];
  formConocimiento!: FormGroup;
  
  constructor(private direccionService:DireccionService, 
   private conocimientoService:ConocimientoService,
    private router:ActivatedRoute,
    private clienteService:ClienteService,private fb: FormBuilder,public rout: Router) { }

  ngOnInit(): void {
    this.id=this.router.snapshot.params['id'];
    this.obtenerCliente(this.id)
    this.createForm();
    this.createFormConocimiento();
    this.obtenerProvincias();
    
  }
  public obtenerCliente(id:any): void {
    this.clienteService.obtenerClienteByID(id).subscribe((response)=>{
        if(response.isSuccess)
        {
          this.data=response;
          console.log(response);
        }
        else{
          console.log(response.message)
        }
    });
}
createForm() {
  this.form = this.fb.group({
  Id:0,
  lineaDeDireccion1: ['',Validators.required],
  lineaDeDireccion2:[''],
  pais:['',Validators.required],
  prov: ['',Validators.required],
  provicia: [''],
  municipio: ['',Validators.required],
  codigoPostal:  ['',Validators.required],
  codigoCliente:''
  });
} 
get lineaDeDireccion1 () {
  return this.form.get('lineaDeDireccion1') as FormControl;
}
get pais () {
  return this.form.get('pais') as FormControl;
}
get prov () {
  return this.form.get('prov') as FormControl;
}
get municipio () {
  return this.form.get('municipio') as FormControl;
}
get codigoPostal () {
  return this.form.get('codigoPostal') as FormControl;
}

createFormConocimiento() {
  this.formConocimiento = this.fb.group({
  Id:0,
  conocimiento: ['',Validators.required],
  codigoCliente: [''],
  
  });
} 
get conocimiento () {
  return this.formConocimiento.get('conocimiento') as FormControl;
}

public obtenerProvincias(): void {
 
  this.direccionService.obtenerProvincias().subscribe((response:any)=>{
    this.provincias=response.data;
    
  }); 
}
onSelectProvincia(event: any) {
const codigo =(event.target as HTMLInputElement).value.split("|",1);

this.direccionService.obtenerMunicipioDeUnaProvincia(codigo[0]).subscribe((response:any)=>{
  this.municipios=response.data;
});

 const nom=(event.target as HTMLInputElement).value.split("|",2);
 this.nombre=nom[1];
 
}
onSubmitDireccion(direccion: any){
    
  if(this.form.valid)
  {
    document.getElementById('cerrar-modal')?.click();
    this.direccionService.guardarDireccion(direccion)
    .subscribe(data=>{
       if(data.isSuccess)
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 3000
        })
        
        this.obtenerCliente(this.id);
      }
      else{
        Swal.fire('Oops...', data.message, 'error');
      }
      });

    
      
     
  }
  
}
onSubmitConocimiento(comocimiento: any){
    
  if(this.formConocimiento.valid)
  {
    document.getElementById('cerrar-modal')?.click();
    this.conocimientoService.guardarConocimiento(comocimiento)
    .subscribe(data=>{
       if(data.isSuccess)
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 3000
        })
        this.obtenerCliente(this.id);
       
      }
      else{
        Swal.fire('Oops...', data.message, 'error');
      }
      });


  }
  
}



}
