import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { UserService } from "./user.services";

@Component({
    selector: 'app-signin',
    templateUrl: './signin-component.html'
})
export class SigninComponent implements OnInit{
    constructor(private userService : UserService){}
    myForm : FormGroup

    ngOnInit(){
        this.myForm = new FormGroup({
            emailTS : new FormControl(null, 
                [Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            passwordTS : new FormControl(null, Validators.required)
        });
    }

    onSubmit(){
        this.userService.login(this.myForm.value.emailTS, this.myForm.value.passwordTS)
            .subscribe(
                (dadosSucesso: Response) => console.log("Login de " + this.myForm.value.firstNameTS + " realizado."+ dadosSucesso),
                dadosErro => console.log("Não foi possível fazer o login." + dadosErro.myErrorTitle)
            )
    }
}