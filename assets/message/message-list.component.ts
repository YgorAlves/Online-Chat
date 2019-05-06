import { Component, OnInit } from '@angular/core';
import { MessageService } from "./message.services";
import { Message } from './message.model';


@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
                    <app-message [messageVarClasse]="msg"
                        *ngFor="let msg of messageS">
                </app-message>
        </div>
        `,
    //providers:[MessageService]
})

export class MessageListComponent implements OnInit{
    messageS: Message[] = [];

    constructor (private messageService: MessageService){}

    ngOnInit(): void {
        this.messageService.getMessages()
        .subscribe(
            (dadosSucesso: Message[]) => {
                this.messageS = dadosSucesso;
            },
            dadosErro => console.log("Não foi possível recuperar as mensagens."+ dadosErro)
        );
    }
}




