import { Http, Response, Headers} from "@angular/http";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import "rxjs/Rx";
import { Observable } from "rxjs";


@Injectable()
export class UserService {
    public usuarioLogado : User;
    constructor(private http : Http){}

    loginValidado(novoUsuario : User){
        this.usuarioLogado = novoUsuario;
        this.usuarioLogado.password = null;
        console.log(this.usuarioLogado.firstName + " fez login!");
    }

    logout(){
        this.usuarioLogado = null;
    }
    
    cadastrarUsuario(usuario: User){
        const bodyReq = JSON.stringify(usuario);
        const myHeaders = new Headers({'Content-Type':'application/json'})
        return this.http.post('http://localhost:3000/user/', bodyReq, {headers : myHeaders})
            .map((responseRecebida : Response) => {
                const responseJson = responseRecebida.json()

                const novoUsuario = new User(responseJson.objUserSave.firstName, responseJson.objUserSave.lastName,
                    responseJson.objUserSave.email, null,
                    responseJson.objUserSave.titulo, responseJson.objUserSave._id);
                return novoUsuario;
            })
            .catch((errorRecebido : Response) => Observable.throw(errorRecebido.json()));
    }

    login(email : string, senha : string){
        return this.http.get('http://localhost:3000/user/'+ email + "/" + senha)
        .map((responseRecebida : Response) => {
            const responseEmJSON = responseRecebida.json();
            const userResponseRecebida = responseEmJSON.objUserRecuperado;
            console.log(responseRecebida);
            
            const novoUsuario = new User(userResponseRecebida.firstName, userResponseRecebida.lastName,
                userResponseRecebida.email, null, userResponseRecebida.titulo, userResponseRecebida._id);
            this.loginValidado(novoUsuario);
            return novoUsuario;
        })
        .catch((errorRecebido : Response) => Observable.throw(errorRecebido.json()));
    }
}