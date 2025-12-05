import { Component, OnInit } from '@angular/core';
import { Cliente } from "../../core/types/type";
import { CadastroService } from "../../core/services/cadastro.service";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-painel-clientes',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './painel-clientes.html',
  styleUrls: ['./painel-clientes.css']
})
export class PainelClientes implements OnInit {

  listaClientes: Cliente[] = [];

  modalAberto = false;
  modalExcluir = false;

  clienteEditando: Cliente = {} as Cliente;
  clienteExcluir: Cliente | null = null;

  senhaVisivel = false;

  constructor(
    private router: Router,
    private service: CadastroService
  ) {}

  ngOnInit(): void {
    this.service.listar().subscribe((clientes) => {
      this.listaClientes = clientes;
    });
  }

  // ========== MODAL EDITAR ==========
  abrirModal(cliente: Cliente) {
    this.clienteEditando = { ...cliente };
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  salvarEdicao() {
    // Validar CPF
    if (!this.validarCPF(this.clienteEditando.cpf)) {
      alert("CPF inválido!");
      return;
    }

    this.service.editar(this.clienteEditando).subscribe(() => {
      this.ngOnInit();
      this.modalAberto = false;
    });
  }

  toggleSenha() {
    this.senhaVisivel = !this.senhaVisivel;
    const campo = document.querySelector('#inputSenha') as HTMLInputElement;
    campo.type = this.senhaVisivel ? 'text' : 'password';
  }

  // ========== MODAL EXCLUSÃO ==========
  abrirModalExcluir(cliente: Cliente) {
    this.clienteExcluir = cliente;
    this.modalExcluir = true;
  }

  fecharModalExcluir() {
    this.modalExcluir = false;
  }

  excluirClienteConfirmado() {
    if (!this.clienteExcluir) return;

    const id = this.clienteExcluir.id ?? this.clienteExcluir.idCliente;

    if (!id) {
      console.error("ID do cliente não encontrado!");
      return;
    }

    this.service.excluircliente(String(id)).subscribe(() => {
      this.modalExcluir = false;
      this.ngOnInit();
    });
  }

  //  VALIDAR CPF
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
