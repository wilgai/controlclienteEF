import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Provincia } from 'src/app/Models/Direccion';
import { ClienteService } from 'src/app/Services/cliente.service';
import { DireccionService } from 'src/app/Services/direccion.service';
import Swal from 'sweetalert2';
import { ComocimientoComponent } from '../../conocimiento/comocimiento/comocimiento.component';
import { DireccionComponent } from '../../direccion/direccion/direccion.component';



@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  @ViewChildren(DireccionComponent) forms!: QueryList<DireccionComponent>;
  @ViewChildren(ComocimientoComponent) forms1!: QueryList<ComocimientoComponent>;
 
  form?:FormGroup;
  ships!: any[];
  result!: any[];
  conocimientos!: any[];
  _direcciones!: any[];
  _conocimientos!: any[];
  formCliente!: FormGroup;
  urls: string[] = 
  [
   'https://bootdey.com/img/Content/avatar/avatar1.png',
   'https://bootdey.com/img/Content/avatar/avatar3.png',
   'https://bootdey.com/img/Content/avatar/avatar4.png',
   'https://bootdey.com/img/Content/avatar/avatar5.png',
   'https://bootdey.com/img/Content/avatar/avatar6.png',
   'https://bootdey.com/img/Content/avatar/avatar7.png',
   'https://bootdey.com/img/Content/avatar/avatar8.png',
   'https://bootdey.com/img/Content/avatar/avatar9.png',
   'https://bootdey.com/img/Content/avatar/avatar1.png',
   'https://bootdey.com/img/Content/avatar/avatar3.png',
   'https://bootdey.com/img/Content/avatar/avatar4.png',
   'https://bootdey.com/img/Content/avatar/avatar5.png',
   'https://bootdey.com/img/Content/avatar/avatar6.png',
   'https://bootdey.com/img/Content/avatar/avatar7.png',
   'https://bootdey.com/img/Content/avatar/avatar8.png',
   'https://bootdey.com/img/Content/avatar/avatar9.png',
   'https://bootdey.com/img/Content/avatar/avatar1.png',
   'https://bootdey.com/img/Content/avatar/avatar3.png',
   'https://bootdey.com/img/Content/avatar/avatar4.png',
   'https://bootdey.com/img/Content/avatar/avatar5.png',
   'https://bootdey.com/img/Content/avatar/avatar6.png',
   'https://bootdey.com/img/Content/avatar/avatar7.png',
   'https://bootdey.com/img/Content/avatar/avatar8.png',
   'https://bootdey.com/img/Content/avatar/avatar9.png',

  ];
  tel: any;
  cel: any;
  url: any;
  public ngOnInit() {
    this.createForm();
    this.url= this.urls[Math.floor(Math.random() * this.urls.length)]
  }

  createForm() {
    this.formCliente = this.fb.group({
    Id:0,
    nombre: ['',Validators.required],
    identificacion:['',Validators.required],
    telefono:[''],
    correo: ['',Validators.email],
    celular: ['',Validators.required],
    sexo:  ['',Validators.required],
    imagen:  [''],
    });
  }

  get nombre () {
    return this.formCliente.get('nombre') as FormControl;
  }
  get direccion () {
    return this.formCliente.get('direccion')as FormControl;
  }
  get identificacion () {
    return this.formCliente.get('identificacion')as FormControl;
  }
  get telefono () {
    return this.formCliente.get('telefono')as FormControl;
  }
  get correo () {
    return this.formCliente.get('correo')as FormControl;
  }
  get celular () {
    return this.formCliente.get('celular')as FormControl;
  }

  get sexo () {
    return this.formCliente.get('sexo')as FormControl;
  }

  constructor( public clienteService:ClienteService,private fb: FormBuilder,public rout: Router) {}
  submit() {
 
      this._direcciones = this.forms.map((x) => x.form!.value);
      this._conocimientos = this.forms1.map((x) => x.form!.value);
      console.log(this._direcciones);
   
  }
  public agregarDireccion() {
    this.ships = [  
      ...this.forms.map((x) => x.form!.value),
      { prop1: null, prop2: null },
    ];
  }
  public eliminarDireccion(index: number) {
    this.ships.splice(index, 1);
    
  }

  public agregarConocimiento() {
    this.conocimientos = [  
      ...this.forms1.map((x) => x.form!.value),
      { prop1: null, prop2: null },
    ];
    
  }
  public eliminarConocimento(index: number) {
    this.conocimientos.splice(index, 1);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.formCliente.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    console.log(invalid)
    
}
maskTelefono(value:any) {
  var x =value.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
   this.tel=value;
 
}
maskCelular(value:any) {
var x =value.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
 this.cel=value;
}
  onSubmit(data: any){
    
   if(this.formCliente.valid)
   {
    this.submit();
    this.clienteService.formDataCliente=data;
    this.clienteService.direcciones=this._direcciones;
    this.clienteService.conocimientos=this._conocimientos;

    this.clienteService.guardarCliente()
    .subscribe(data=>{
      if(data.isSuccess==false)
      { 
        Swal.fire('Oops...', data.message, 'error');
      }
      else if(data.isSuccess ==true)
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 3000
        })
        this.rout.navigate(["home"]);
      }
    });

   }
  }
}

  

 
       


