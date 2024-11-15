export interface NombreCompleto {
  name: string;
  last_name: string;
}

export interface UserCreate {
  nombre_completo: NombreCompleto;  
  email: string;
  password: string;
  rol: 'usuario' | 'entidad';
}

export interface UserOut {
  id_user: number;
  nombre_completo: string;  
  email: string;
  rol: 'usuario' | 'entidad';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id_user: number;
  name: string;
  lastName: string;
  email: string;
  rol: 'usuario' | 'entidad';
  access_token: string;
}
