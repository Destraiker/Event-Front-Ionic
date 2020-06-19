import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-usuario/login-usuario.module').then( m => m.LoginUsuarioPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro-usuario/cadastro-usuario.module').then( m => m.CadastroUsuarioPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/menu-usuario/menu-usuario.module').then( m => m.MenuUsuarioPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/erro404/erro404.module').then( m => m.Erro404PageModule)
  },
  {
    path: 'meus-eventos',
    loadChildren: () => import('./pages/meus-eventos/meus-eventos.module').then( m => m.MeusEventosPageModule)
  },
  {
    path: 'inscrito-eventos',
    loadChildren: () => import('./pages/inscrito-eventos/inscrito-eventos.module').then( m => m.InscritoEventosPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
