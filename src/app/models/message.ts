import { User } from "./user";

export interface Message {
    author : User,
    timestamp: Date,
    text: string;
}
