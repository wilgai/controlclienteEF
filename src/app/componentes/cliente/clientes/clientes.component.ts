import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Models/Cliente';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {
  public clientes!:Cliente[];

  constructor (private clienteService:ClienteService,public route:Router){}
 

  ngOnInit(): void {
    this.obtenerClientes();
  }
  public obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe(response=>{
        if(response.isSuccess)
        {
          this.clientes=response.clientes;
         
        }
        else{
          console.log(response.message)
        }
    });
}
public buscarclientes(key: string): void {
  console.log(key);
  const results: Cliente[] = [];
  for (const employee of this.clientes) {
    if (employee.nombre.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.correo.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.celular.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.identificacion.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || employee.telefono.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      results.push(employee);
    }
  }
  this.clientes = results;
  if (results.length === 0 || !key) {
    this.obtenerClientes();
  }
}
mostrarCliente(cliente:any)
{
  this.route.navigate(['/editar-cliente',cliente.id]);
 
}

}
