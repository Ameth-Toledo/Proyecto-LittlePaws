export interface DenunciaSeguimientoRequest {
  id_denuncia: number;
  id_entidad: number;
  fecha: Date;
  seguimiento: boolean;
}

export interface DenunciaSeguimientoResponse {
    id_seguimiento: number;
    id_entidad: number;
    fecha: Date;
    seguimiento: boolean;
}
  