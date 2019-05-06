import { Http, Response, Headers} from "@angular/http";
import { Message } from "./message.model";
import { Injectable, EventEmitter } from "@angular/core";
import "rxjs/Rx";
import { Observable } from "rxjs";


@Injectable()
export class MessageService {
    private messageSService: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http : Http){}

    updateMessage(message : Message){
        const bodyReq = JSON.stringify(message);
        const myHeaders = new Headers({'Content-Type':'application/json'})
        return this.http.patch('http://localhost:3000/message/' + message.messageId,
                                                            bodyReq, {headers : myHeaders})
            .map((responseRecebida : Response) => responseRecebida.json())
            .catch((errorRecebido : Response) =>  Observable.throw(errorRecebido.json()));
    }

    editMessage(message : Message){
        this.messageIsEdit.emit(message);
    }
    
    addMessage(message: Message){
        const bodyReq = JSON.stringify(message);
        const myHeaders = new Headers({'Content-Type':'application/json'})
        return this.http.post('http://localhost:3000/message/', bodyReq, {headers : myHeaders})
            .map((responseRecebida : Response) => {
                console.log("")
                const aux = responseRecebida.json()
                let newObjMessage = new Message(aux.objMessageSave.content, aux.objMessageSave.user,
                                                aux.objMessageSave._id, 'Desconhecido');
                this.preencherAutor(newObjMessage)
                    .subscribe(
                        (dadosSucesso: string) => {
                            newObjMessage.username = dadosSucesso;
                        },
                        dadosErro => console.log("Não foi possível obter autor de " +
                        newObjMessage.content + dadosErro)
                    )
                console.log("Id da mensagem salva: " + newObjMessage.messageId);
                this.messageSService.push(newObjMessage);

            })
            .catch((errorRecebido : Response) => Observable.throw(errorRecebido.json()));
    }

    getMessages(){
        return this.http.get('http://localhost:3000/message')
        .map((responseRecebida : Response) => {
            const responseEmJSON = responseRecebida.json();
            const messageSResponseRecebida = responseEmJSON.objSMessageSRecuperadoS;
            let transformedCastMessagesModelFrontend : Message[] = [];
            //Obtendo a lista de mensagens
            for (let msg of messageSResponseRecebida){
                transformedCastMessagesModelFrontend.push(
                    new Message(msg.content, msg.user, msg._id, 'Desconhecido')
                );
            }
            //Colocando o nome do autor nas mensagens
            for (let msg of transformedCastMessagesModelFrontend){
                this.preencherAutor(msg)
                    .subscribe(
                        (dadosSucesso: string) => {
                            msg.username = dadosSucesso;
                        },
                        dadosErro => console.log("Não foi possível recuperar as mensagens."+ dadosErro)
                    )
            }
            this.messageSService = transformedCastMessagesModelFrontend;
            return transformedCastMessagesModelFrontend;
        })
        .catch((errorRecebido : Response) => Observable.throw(errorRecebido.json()));
    }

    preencherAutor(message : Message){
        return this.http.get('http://localhost:3000/message/' + message.userId)
        .map((responseRecebida : Response) => {
            const responseEmJSON = responseRecebida.json();
            const autorObj = responseEmJSON.autor;
            const nameFinal = autorObj.firstName +", o " + autorObj.titulo;
            message.username = nameFinal;
            return nameFinal;
        })
        .catch((errorRecebido : Response) => Observable.throw(errorRecebido.json()));
    }

    deleteMessage(message: Message){
        this.messageSService.splice(this.messageSService.indexOf(message), 1);
        return this.http.delete('http://localhost:3000/message/'+ message.messageId)
            .map((responseRecebida : Response) => responseRecebida.json())
            .catch((errorRecebido : Response) =>  Observable.throw(errorRecebido.json()));
    }
}