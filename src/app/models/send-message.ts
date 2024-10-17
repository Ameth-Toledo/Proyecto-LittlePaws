import { User } from "./user"

export interface SendMessage {
    message : {
        text : string;
        author : User;
    };
}
1