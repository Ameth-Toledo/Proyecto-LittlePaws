export interface Denuncias {
  motivo: string;
  id_usuario: number;
  id_institucion: number;
  id_mascota: number;
  descripcion: string;
  imagen: string;
}

export interface DenunciaResponse {
  id_denuncias: number;
  id_usuario: number;
  motivo: string;
  id_institucion: number;
  descripcion: string;
  imagen: string;
  id_mascota: number;
}
