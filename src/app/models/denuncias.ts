export interface Denuncias {
  id_usuario: number;
  motivo: string;
  id_institucion: number;
  descripcion: string;
  imagen: string;  
  id_mascota: number;  
}

export interface DenunciaResponse {
  id: number;
  id_usuario: number;
  motivo: string;
  id_institucion: number;
  descripcion: string;
  imagen: string;
  id_mascota: number;
}
