import { UserOut } from "./users";

export interface SendMessage {
    message : {
        text : string;
        author : UserOut;
    };
}
1