export interface Futbolista {
  id: number;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string; 
  caracteristicas: string;
  posicion: {
    id: number;
    nombre: string;
  };
}