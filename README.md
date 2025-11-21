# LuxCar - Locadora de Veículos de Luxo
![Angular 17+](https://img.shields.io/badge/Angular-17+-DC143C)
![Angular Material](https://img.shields.io/badge/Angular_Material-20.2.12-01458e)

Sistema web para gestão e locação de veículos de luxo. O projeto conta com uma área pública para clientes (catálogo, reservas) e um painel administrativo para gestão de frota e usuários.

## Tecnologias Utilizadas
- **Frontend:** Angular 17+ (Standalone Components)
- **UI Library:** Angular Material & CSS customizado
- **Backend (Simulado):** JSON-Server

## Funcionalidades
- **Área Pública:**
  - Landing Page com vídeo hero e destaques.
  - Catálogo de carros com filtros (Data, Hora, Local, Disponibilidade).
- **Área Administrativa:**
  - CRUD de Clientes (com validação de CPF).
  - CRUD de Carros (Gestão de frota).
- **Autenticação:** Tela de login e cadastro de administradores.

## Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/AlexeyFrens/luxcar.git

2. Instale as dependências:
    ```bash
    npm install
   
3. Inicie o servidor de desenvolvimento:
    ```bash
    ng serve

4. Acesse http://localhost:4200.
