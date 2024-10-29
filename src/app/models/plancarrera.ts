export interface Plancarrera {
    id: number;
    estado: string;
    carrera: Carrera;
    plan: Plan;
}
export interface Carrera {
    id: number;
    estado:string;
    nombre: string;
}

export interface Plan {
    id: number;
    estado:string;
    nombre: string;
}


