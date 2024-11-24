export interface Comentarios {
    content: string;      // Changed from comentario to content
    createdAt: string;    // Changed from fecha to createdAt
}
  
export interface ComentarioResponse {
    id : number
    comentario : string
}