import { Component, Input,Output,EventEmitter, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Municipio, Pais, Provincia } from 'src/app/Models/Direccion';
import { DireccionService } from 'src/app/Services/direccion.service';
@Component({
  selector: 'ship',
  template: `
  

<form *ngIf="form" [formGroup]="form">
    <div class="container ">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col">
            <div class="card my-4 shadow-3">
              <div class="row g-0">
               
                <div class="col-xl-12">
                  <div class="card-body p-md-5 text-black">
                    <h4 class="mb-4 text-uppercase">Dirección</h4>
                    <div class="form-outline mb-4">
                    <input type="hidden" [(ngModel)]="nombre" formControlName="provicia"   />
                      <input type="text" formControlName="lineaDeDireccion1" class="form-control form-control-lg" placeholder="Línea de Dirección 1" />
                      <div style="color:red;" *ngIf="lineaDeDireccion1?.invalid && (lineaDeDireccion1?.dirty || lineaDeDireccion1?.touched)">
                                        Introduce la una dirección.
                                         </div>
                    </div>
                    <div class="form-outline mb-4">
                       
                        <input type="text" formControlName="lineaDeDireccion2" class="form-control form-control-lg" placeholder="Línea de Dirección 2 Opcional" />
                        
                      </div>
                    <div class="row">
                      <div class="col-md-6 mb-4">
                      <label for="Pais">Pais</label>
                        <select class="form-control"  formControlName="pais">
                        <option value="">Elige el Pais</option>
                          
                          <option value="República Dominicana">República Dominicana </option>
                          
                        </select>
                        <div style="color:red;" *ngIf="pais?.invalid && (pais?.dirty || pais?.touched)">
                                        Elige el pais
                                         </div>
                      </div>
                      <div class="col-md-6 mb-4">
                      <label for="Provincia">Provincia</label>
                        <select  (change)="onSelectProvincia($event)" onchange=", obtenerNombre($event)" class="form-control" formControlName="provincia">
                          <option value="">Elige la Provincia</option>
                         <option [value]="provincia.codigo+'|'+ provincia.nombre" *ngFor="let provincia of provincias">
                           {{provincia.nombre}}

                          </option>
                          
                        </select>
                        <div style="color:red;" *ngIf="provincia?.invalid && (provincia?.dirty || provincia?.touched)">
                                        Elige el pais
                                         </div>
                      </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-4">
                        <label for="municipio">Municipio</label>
                          <select class="form-control" formControlName="municipio">
                            <option value="">Elige El Municipio</option>
                            <option [value]="municipio.nombre" *ngFor="let municipio of municipios">
                            {{municipio.nombre}}

                            </option>
                           
                          </select>
                          <div style="color:red;" *ngIf="municipio?.invalid && (municipio?.dirty || municipio?.touched)">
                                        Elige el municipio
                                         </div>
                        </div>
                        <div class="col-md-6 mb-4">
                        <label for="Municipio">Código postal</label>
                            <input type="text" formControlName="codigoPostal" maxlength="5" class="form-control form-control-lg" placeholder="Código postal" />
                            <div style="color:red;" *ngIf="codigoPostal?.invalid && (codigoPostal?.dirty || codigoPostal?.touched)">
                                       Digite el código postal
                                         </div>
                        </div>
                      </div>
                    <div class="d-flex justify-content-end pt-3">
                      <button (click)="remove.emit(index)" type="button" class="btn btn-danger btn-lg ms-2"
                        style="background-color:hsl(0, 70%, 47%) ">Eliminar</button>
                    </div>
      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

</form>


  `
})
export class DireccionComponent implements OnInit  {
  provincias!:Provincia[];
  form!:FormGroup;
  municipios!: Municipio[];
  nombre!: string;

  

 
  constructor(private direccionService:DireccionService,private fb: FormBuilder){}
  public ngOnInit() {
    this.obtenerProvincias();
    this.createForm();
  }
 
  @Input() set data(value: { LineaDeDireccion1: any;LineaDeDireccion2: any;Pais: any;
    Provincia: any;Municipio: any;CodigoPostal: any;}){
    value=value ||{prop1:null,prop2:null}
    this.form=new FormGroup({
      LineaDeDireccion1:new FormControl(value.LineaDeDireccion1),
      LineaDeDireccion2:new FormControl(value.LineaDeDireccion2),
      Pais:new FormControl(value.Pais),
      Provincia:new FormControl(value.Provincia),
      Municipio:new FormControl(value.Municipio),
      CodigoPostal:new FormControl(value.CodigoPostal)
    })
  }
  @Input() index: any;
  @Output() remove:EventEmitter<number>=new EventEmitter<number>()

  createForm() {
    this.form = this.fb.group({
    Id:0,
    lineaDeDireccion1: ['',Validators.required],
    lineaDeDireccion2:[''],
    pais:['',Validators.required],
    provincia: ['',Validators.required],
    provicia: ['',Validators.required],
    municipio: ['',Validators.required],
    codigoPostal:  ['',Validators.required],
    });
  } 
  get lineaDeDireccion1 () {
    return this.form.get('lineaDeDireccion1') as FormControl;
  }
  get pais () {
    return this.form.get('pais') as FormControl;
  }
  get provincia () {
    return this.form.get('provincia') as FormControl;
  }
  get municipio () {
    return this.form.get('municipio') as FormControl;
  }
  get codigoPostal () {
    return this.form.get('codigoPostal') as FormControl;
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

    const nom=(event.target as HTMLInputElement).value.split("|",2);
 this.nombre=nom[1];
    
  });
}
}