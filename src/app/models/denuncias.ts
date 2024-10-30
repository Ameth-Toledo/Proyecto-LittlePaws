// models/denuncias.ts
export interface Denuncias {
  id_usuario: number;
  motivo: string;
  id_institucion: number;
  descripcion: string;
  imagen: string;  // Assuming this is a comma-separated string of image URLs
  id_mascota: number;  // Corrected type to number
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
