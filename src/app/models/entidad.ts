export interface Entidad {
    id?: number; 
    nombreRefugio: string; 
    telefono: string; 
    email: string; 
    direccion: string; 
    horarioAtencion: string; 
    ubicacion: string; 
    facebook?: string; 
    instagram?: string; 
    twitter?: string; 
    fotoPerfil?: File | string; 
}
