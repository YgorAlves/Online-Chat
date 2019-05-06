export class User {
    firstName : string;
    titulo : string;
    lastName : string;
    email : string;
    password : string;
    userId : string;

    constructor(firstName: string, lastName: string, email: string, password : string, titulo: string, userId?: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.titulo = titulo;
        this.userId = userId;
    }
}