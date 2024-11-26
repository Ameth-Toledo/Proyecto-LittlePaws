export interface DenunciasComentariosRequest {
    id_denuncia: number;
    id_user: number;
    comentario: string;
    fecha: string
}
export interface DenunciasComentariosResponse {
    id_comentario: number;
    id_denuncia: number;
    id_user: number;
    comentario: string;
    fecha: string;
  }