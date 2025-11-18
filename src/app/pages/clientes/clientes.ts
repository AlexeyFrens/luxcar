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
    if (!this.validarCPF(this.clienteEditando.cpf)) {
      alert("CPF inválido! Por favor, revise.");
      return;
    }

    this.service.editar(this.clienteEditando).subscribe(() => {
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



  validarCPF(cpf: string): boolean {

    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) return false;


    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;


    for (let i = 1; i <= 9; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;


    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.substring(10, 11));
  }





}




