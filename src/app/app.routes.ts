import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SiteListComponent } from './components/site-list/site-list.component';
import { PasswordListComponent } from './components/password-list/password-list.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"site-list", component:SiteListComponent},
    {path:"password-list", component:PasswordListComponent},
];
