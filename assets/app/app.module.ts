import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { MessageComponent } from '../message/message.component';
import { MessageInputComponent } from '../message/message-input.component';
import { MessageListComponent } from '../message/message-list.component';
import { AuthenticationComponent } from '../auth/authentication.component';
import { HeaderComponent } from './header.component';
import { myrouting } from './app.routing';
import { MessagesComponent } from '../message/messages.component';
import { LogoutComponent } from '../auth/logout.component';
import { SigninComponent } from '../auth/signin.component';
import { SignupComponent } from '../auth/signup.component';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent
    ],
    imports: [BrowserModule, FormsModule, myrouting, ReactiveFormsModule, HttpModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}