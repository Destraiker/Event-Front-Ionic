import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuUsuarioPage } from './menu-usuario.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio-usuario',
    pathMatch: 'full'
  },
  {
    path: 'cadastrar-eventos',
    component: MenuUsuarioPage,
    loadChildren: () => import('../cadastrar-eventos/cadastrar-eventos.module').then( m => m.CadastrarEventosPageModule)
  },
  {
    path: 'cadastrar-enderecos',
    component: MenuUsuarioPage,
    loadChildren: () => import('../cadastrar-enderecos/cadastrar-enderecos.module').then( m => m.CadastrarEnderecosPageModule)
  },
  {
    path: 'detalhes-eventos/:idEvento',
    component: MenuUsuarioPage,
    loadChildren: () => import('../detalhes-eventos/detalhes-eventos.module').then( m => m.DetalhesEventosPageModule)
  },
  {
    path: 'gerenciar-enderecos',
    component: MenuUsuarioPage,
    loadChildren: () => import('../gerenciar-enderecos/gerenciar-enderecos.module').then( m => m.GerenciarEnderecosPageModule)
  },
  {
    path: 'gerenciar-eventos',
    component: MenuUsuarioPage,
    loadChildren: () => import('../gerenciar-eventos/gerenciar-eventos.module').then( m => m.GerenciarEventosPageModule)
  },
  {
    path: 'inicio-usuario',
    component: MenuUsuarioPage,
    loadChildren: () => import('../inicio-usuario/inicio-usuario.module').then( m => m.InicioUsuarioPageModule)
  },
  {
    path: 'perfil',
    component: MenuUsuarioPage,
    loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'visualizar-eventos',
    component: MenuUsuarioPage,
    loadChildren: () => import('../visualizar-eventos/visualizar-eventos.module').then( m => m.VisualizarEventosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuUsuarioPageRoutingModule {}
