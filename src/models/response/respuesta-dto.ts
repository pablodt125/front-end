export class RespuestaDto {

    categoria: string;
	codigo: string;
	descripcion: string;
	estado: number;
    tiempo_respuesta: string;
    
	objeto_respuesta: object;
    variable: string;

    public constructor() {
        this.categoria = '';
        this.codigo = '';
        this.descripcion = '';
        this.estado = 0;
        this.tiempo_respuesta = '';
        
        this.objeto_respuesta = new Object();
        this.variable = '';
    }
}