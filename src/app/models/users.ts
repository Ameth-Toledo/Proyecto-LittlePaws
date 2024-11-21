export interface Users {
    id? : number;
    username : string;
    lastname:string
    email : string;
    password : string;
    access_token : string
}

export interface LoginResponse {
    id : number;
    username : string;
    lastname:string;
    email : string;
  token : string;
}