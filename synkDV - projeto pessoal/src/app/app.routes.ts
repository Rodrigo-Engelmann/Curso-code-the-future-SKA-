import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signin } from './components/signin/signin';
import { UserConfigs } from './components/user-configs/user-configs'
import { Tasks } from './components/tasks/tasks';
import { Folders } from './components/folders/folders';

export const routes: Routes = [
    // tentei implementar um sistema de segurança (que o usuário não consegue entrar nas rotas até que tenha tokens), só que não consegui, então fica normal sem alterações:
    
    {path: 'login', component: Login},
    {path: 'signin', component: Signin},
    {path: 'userConfigs', component: UserConfigs},
    {path: 'tasks', component: Tasks},
    {path: 'folders', component: Folders},
];
