import { Routes } from '@angular/router';
import { SiteListComponent } from './components/site-list/site-list.component';
import { PasswordListComponent } from './components/password-list/password-list.component';

export const routes: Routes = [
    {path:"", component:SiteListComponent},
    {path:"password-list", component:PasswordListComponent},
];
