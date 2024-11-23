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
    id_adopcion: number;
    id_mascota: number;
    id_usuario: number;
    fecha_adopcion: string; 
    curp: string;
    imagen: string | null;
    seguimiento?: string;
    observaciones: string;
    condiciones: string;
    id_status: string; 
    id_entidad: number;
    name: string;
    email: string;
    direccion: string;
    cellphone: string;
    agreement: boolean;
    nombre_entidad: string;  
    nombre_mascota: string; 
    nombre_usuario: string;
  }
  
