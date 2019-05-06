import { Component, OnInit } from '@angular/core';
import { MessageService } from "./message.services";
import { Message } from "./message.model";
import { NgForm } from '@angular/forms';
import { UserService } from '../auth/user.services';

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    //providers: [MessageService]
})

export class MessageInputComponent implements OnInit{
    constructor(private messageService: MessageService, private userService : UserService){}

    messageLoad : Message;

    ngOnInit(){
        this.messageService.messageIsEdit.subscribe(
            (message : Message) => this.messageLoad = message
        );
    }

    onSubmit(form: NgForm){
        if (this.messageLoad){
            //Editar
            this.messageLoad.content = form.value.myContentngForm;
            console.log("Novo texto da mensagem editada: " + this.messageLoad.content);
            this.messageService.updateMessage(this.messageLoad)
                    .subscribe(
                        dadosSucesso => {
                            console.log(dadosSucesso);
                        },
                        dadosErro => console.log(dadosErro)
                    )
            this.messageLoad = null;
        }
        else{
            //Adicionar
            if (this.userService.usuarioLogado){
                console.log(this.userService.usuarioLogado.userId + " esta adicionando uma mensagem.")
                const messageAux = new Message(form.value.myContentngForm, this.userService.usuarioLogado.userId);
                this.messageService.addMessage(messageAux)
                    .subscribe(
                        dadosSucesso => console.log("Mensagem salva: " + dadosSucesso),
                        dadosErro => console.log("Mensagem NÃO salva: " + dadosErro)
                    )
            }
            else{
                console.log("Faça login para poder enviar mensagens!");
            }
       }
       form.resetForm();
   }

   onClear(form : NgForm){
        this.messageLoad = null;
        form.resetForm();
   }
}