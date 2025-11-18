import { Component, OnInit } from '@angular/core';
import { Cliente } from "../../core/types/type";
import { CadastroService } from "../../core/services/cadastro.service";
import {Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-clientes',
  imports: [RouterModule,
    CommonModule,
    FormsModule,],
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



  modalAberto = false;

  clienteEditando: any = {
    id: 0,
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    endereco: ""
  };

  abrirModal(cliente: any) {
    this.clienteEditando = { ...cliente };
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  salvarEdicao() {
    this.service.editar(this.clienteEditando).subscribe(() => {
      // Recarrega a lista corretamente
      this.ngOnInit();

      this.modalAberto = false;
    });
  }




  senhaVisivel = false;

  toggleSenha() {
    this.senhaVisivel = !this.senhaVisivel;
    const campo = document.querySelector('#inputSenha') as HTMLInputElement;
    if (campo) campo.type = this.senhaVisivel ? 'text' : 'password';
  }

}
