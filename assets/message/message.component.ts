import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.services';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})
export class MessageComponent {
    constructor(private messageService : MessageService) {};

    @Input() messageVarClasse : Message = new Message("","");
    @Output() editClicked_MessageMetodoClasse = new EventEmitter<string>();

    onEditService(){
        this.messageService.editMessage(this.messageVarClasse);
    }
    onDeleteService(){
        this.messageService.deleteMessage(this.messageVarClasse)
            .subscribe(
                dadosSucesso => console.log(dadosSucesso),
                dadosErro => console.log(dadosErro)
            );
    }
}