export interface Adopcion {
    id_mascota:number
    id_usuario:number
    fecha_adopcion:Date
    curp:string
    imagen?:string
    seguimiento?:string
    observaciones:string
    condiciones:string
    status:string
    name:string
    email:string
    direccion:string
    cellphone:string
}
export interface AdopcionResponse {
    id_mascota: number;
    id_usuario: number;
    fecha_adopcion: string;
    curp: string;
    imagen?: string;
    seguimiento?: string;  // Este campo es opcional
    observaciones: string;
    condiciones: string;
    status: string;
    name: string;
    email: string;
    direccion: string;
    cellphone: string;
}
