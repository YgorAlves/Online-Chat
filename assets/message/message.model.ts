export class Message {
    content: string;
    username: string;
    messageId?: string;
    userId?: string;

    constructor(content: string, userId?: string, messageId?: string, username?: string){
        this.messageId = messageId;
        this.content = content;
        this.userId = userId;
        this.username = username;
    }
}