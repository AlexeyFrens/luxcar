import { Component, OnInit } from '@angular/core';
import { Cliente } from "../../core/types/type";
import { CadastroService } from "../../core/services/cadastro.service";
import {Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  imports: [RouterModule,
    CommonModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css'
})
export class Clientes implements OnInit {

  listaClientes: Cliente[] = [];

  constructor(
    private router: Router, //permitir o roteamento entre paginas
    private service: CadastroService
  ) {}

  ngOnInit(): void {
    this.service.listar().subscribe((clientes) => {
      this.listaClientes = clientes;
    });
  }
 //chamar o servico para excluir cliente por id
  excluircliente(id: number) {
    if (id) {
      this.service.excluircliente(id).subscribe(() => {
        window.location.reload();
      });
    }
  }

}
