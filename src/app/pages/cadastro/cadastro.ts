import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../core/types/type';
import { CadastroService } from '../../core/services/cadastro.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FormsModule,CommonModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro implements OnInit {
  cpfInvalido = false;

  titulo = 'Cadastro de Clientes';

  clienteId?: number;
  cliente: Cliente = {} as Cliente;

  constructor(
    private service: CadastroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // Verifico se é alteração ou inclusão
    this.clienteId = this.route.snapshot.params['id'];

    if (this.clienteId) {

      this.service.buscarPorId(String(this.clienteId)).subscribe((cliente) => {
        if (cliente) {
          this.cliente.id = cliente.id;
          this.cliente.nome = cliente.nome;
          this.cliente.cpf = cliente.cpf;
          this.cliente.email = cliente.email;
          this.cliente.endereco = cliente.endereco;
        }
      });
    }
  }

  submeter() {
    if (!this.validarCPF(this.cliente.cpf)) {
      alert("CPF inválido! Por favor, revise.");
      return;
    }

    this.service.incluirCliente(this.cliente).subscribe(() => {
      alert("Cliente cadastrado com sucesso!");
      this.router.navigate(['/clientes']);
    });
  }
  cancelar() {
    this.router.navigate(['/clientes']);
  }

  senhaVisivel = false;

  togglePassword() {
    const input = document.getElementById('passwordInput') as HTMLInputElement;
    if (!input) return;

    this.senhaVisivel = !this.senhaVisivel;
    input.type = this.senhaVisivel ? 'text' : 'password';
  }

  validarCPF(cpf: string): boolean {

    cpf = cpf.replace(/\D/g, ""); // remove tudo que não é número

    if (cpf.length !== 11) return false;

    // CPFs inválidos conhecidos (ex: 11111111111)
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    // 1º dígito
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    // 2º dígito
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.substring(10, 11));
  }




}
