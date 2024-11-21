export interface PetsResponse {
    id_mascota: number;
    name: string;
    age: number;
    race: string;
    weight: number;
    gender: string;
    species: string;
    size: string;
    image: string;
    entity_id: number;
    accepted: boolean;
}
export interface PetsRequest {
    name: string;
    age:number;
    race:string
    weight: Number
    gender:string
    species:string
    size:string
    image:string
    entity_id:number
}
  

