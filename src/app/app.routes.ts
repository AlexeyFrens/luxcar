import { Routes } from '@angular/router';
import {CatalogoCarros} from './pages/catalogo-carros/catalogo-carros';
import {Home} from './pages/home/home';
import {Servicos} from './pages/servicos/servicos';
import {Contato} from './pages/contato/contato';
import {Cadastro} from './pages/cadastro/cadastro';
import {Login} from './pages/login/login';
import { Clientes } from './pages/clientes/clientes';
import {PainelCarros} from './pages/painel-carros/painel-carros';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Luxcar - Home'
  },
  {
    path: 'carros',
    component: CatalogoCarros,
    title: 'Luxcar - Catalogo Carros'
  },
  {
    path: 'servicos',
    component: Servicos,
    title: 'Luxcar - Serviços'
  },
  {
    path: 'contato',
    component: Contato,
    title: 'Luxcar - Contato'
  },
  {
    path: 'cadastro',
    component: Cadastro,
    title: 'Luxcar - Cadastro'
  },

  {
    path: 'login',
    component: Login,
    title: 'Luxcar - Login'
  },

  {
    path: 'clientes',
    component: Clientes,
    title: 'Luxcar - Clientes'
  },

  {
    path: 'painel-carros',
    component: PainelCarros,
    title: 'Luxcar - Painel Carros'
  }


];
