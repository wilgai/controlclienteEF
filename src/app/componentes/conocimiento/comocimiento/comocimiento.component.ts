import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'conocimiento',
  template: `
    <form *ngIf="form" [formGroup]="form">
    <div class="container ">
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col">
            <div class="card my-4 shadow-3">
              <div class="row g-0">
               
                <div class="col-xl-12">
                  <div class="card-body p-md-5 text-black">
                    <h4 class="mb-4 text-uppercase">Conocimiento de Desarrollo</h4>
                    <div class="form-outline mb-4">
                      <input type="text" formControlName="conocimiento" class="form-control form-control-lg" placeholder="Conocimiento" />
                      <div style="color:red;" *ngIf="conocimiento?.invalid && (conocimiento?.dirty || conocimiento?.touched)">
                                       Digite un conocimiento
                                         </div>
                    </div>
                    <div class="d-flex justify-content-end pt-3">
                        <button (click)="remove.emit(index)"  type="button" class="btn btn-danger btn-lg ms-2"
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
export class ComocimientoComponent implements OnInit  {

  form!:FormGroup;
  @Input() set data(value: { Conocimiento: any;}){
    value=value ||{prop1:null,prop2:null}
    this.form=new FormGroup({
      Conocimiento:new FormControl(value.Conocimiento),
      
    })
  }
  ngOnInit(): void {
    this.createForm() ;
  }
  constructor(private fb: FormBuilder){}
  @Input() index: any;
  @Output() remove:EventEmitter<number>=new EventEmitter<number>()

  createForm() {
    this.form = this.fb.group({
    Id:0,
    conocimiento: ['',Validators.required],
    
    });
  } 
  get conocimiento () {
    return this.form.get('conocimiento') as FormControl;
  }

}
