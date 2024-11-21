export interface PetsResponse {
    id: number;
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

