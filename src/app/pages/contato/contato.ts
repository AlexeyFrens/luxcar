import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato',
  imports: [CommonModule, FormsModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css'
})
export class Contato {
  mostrarConfirmacao = false;

  enviarSolicitacao() {
    // Valida se o formulário está válido antes de mostrar o pop-up
    console.log('Formulário enviado com sucesso!');
    
    // Mostra o pop-up de confirmação
    this.mostrarConfirmacao = true;
    
    // Opcional: Aqui você faria a requisição HTTP para o backend
    // this.http.post('/api/contato', formData).subscribe(
    //   response => {
    //     this.mostrarConfirmacao = true;
    //   },
    //   error => {
    //     console.error('Erro ao enviar formulário:', error);
    //   }
    // );
  }

  fecharConfirmacao() {
    this.mostrarConfirmacao = false;
    
    // Opcional: Resetar o formulário após o envio
    // if (this.contatoForm) {
    //   this.contatoForm.reset();
    // }
  }
}