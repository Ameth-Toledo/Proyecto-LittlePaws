export interface Denuncias {
  motivo: string;
  id_usuario: number;
  descripcion: string;
  imagen: string;
}

export interface DenunciaResponse {
  id_denuncias: number;
  id_usuario: number;
  motivo: string;
  descripcion: string;
  imagen: string;

}
