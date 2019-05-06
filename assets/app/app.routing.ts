import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from "../auth/authentication.component";
import { MessagesComponent } from "../message/messages.component";
import { AUTH_ROUTES } from "../auth/auth.routers";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/mensagens', pathMatch:'full'},
    {path: 'mensagens', component: MessagesComponent},
    {path: 'autenticacao', component: AuthenticationComponent, children: AUTH_ROUTES}
];

export const myrouting = RouterModule.forRoot(APP_ROUTES);