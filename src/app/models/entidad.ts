export interface Entidad {
    id_entidad?: number;
    nombreRefugio: string;
    telefono: string;
    email: string;
    type: string;
    description: string;
    direccion: string;
    horarioAtencion: string;
    ubicacion: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    fotoPerfil?: File | string;
    id_user: number
}
