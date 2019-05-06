import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { UserService } from "./user.services";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup-component.html'
})
export class SignupComponent implements OnInit{
    constructor(private userService : UserService){};
    myForm : FormGroup

    ngOnInit(){
        this.myForm = new FormGroup({
            firstNameTS : new FormControl(null, Validators.required),
            tituloTS : new FormControl(null),
            lastNameTS : new FormControl(null, Validators.required),
            emailTS : new FormControl(null, 
                [Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            passwordTS : new FormControl(null, Validators.required),
            checkTS : new FormControl(null, Validators.required)
        });
    }

    onSubmit(){
        const user = new User(
            this.myForm.value.firstNameTS,
            this.myForm.value.lastNameTS,
            this.myForm.value.emailTS,
            this.myForm.value.passwordTS,
            this.myForm.value.tituloTS
        );
        this.userService.cadastrarUsuario(
            user
        )
        .subscribe(
            (dadosSucesso: User) => {
                this.userService.usuarioLogado = dadosSucesso;
                console.log("Cadastro de " + this.myForm.value.firstNameTS + " realizado."+ dadosSucesso);
                this.userService.loginValidado(this.userService.usuarioLogado);
            },
            dadosErro => console.log("Não foi possível fazer o cadastro." + dadosErro)
        )
    }
}