export interface Room {
    id:string;
    name:string;
    location:string;
    description:string;
    created_at:string;
    updated_at:string;
    price:number;
    image:string;
    length:number;
    error:string;
   
}
export interface Reservation {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    room: string;
    user: string;
    guest_fullname: string;
    guest_email: string;
    arrival_date: string;
    departure_date: string;
    adults: number;
    children: number;
    room_name: string;
    name:string;
}
