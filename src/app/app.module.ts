import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';

import { ClientesComponent } from './componentes/cliente/clientes/clientes.component';
import { ClienteService } from './Services/cliente.service';


import { AppComponent } from './app.component';
import { AgregarClienteComponent } from './componentes/cliente/agregar-cliente/agregar-cliente.component';
import { DireccionComponent } from './componentes/direccion/direccion/direccion.component';
import { EditarClienteComponent } from './componentes/cliente/editar-cliente/editar-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComocimientoComponent } from './componentes/conocimiento/comocimiento/comocimiento.component';


const routes:Routes=[
  {path:'home',component:ClientesComponent},
  {path:'agregar-cliente',component:AgregarClienteComponent},
  {path:'editar-cliente/:id',component:EditarClienteComponent},
  {path: '',redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    AgregarClienteComponent,
    EditarClienteComponent,
    DireccionComponent,
    ComocimientoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }


