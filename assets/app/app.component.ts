import { Component } from '@angular/core';
import { Message } from '../message/message.model';
import { MessageService } from '../message/message.services';
import { UserService } from '../auth/user.services';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService, UserService]
})
export class AppComponent {
    messageS: Message[] = []
}