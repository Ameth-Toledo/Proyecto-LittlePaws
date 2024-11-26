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
  social_networks: string[];
  fotoPerfil?: File | string;
  id_user: number;
}

export interface EntidadResponse {
  id: number;
  name: string;
  telefono: string;
  email: string;
  type: string;
  description: string;
  direccion: string;
  hours_operation: string;
  id_entity: number;
  ubicacion: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  social_networks: string[];
  image: string;
  id_user: number;
  location: string
}
