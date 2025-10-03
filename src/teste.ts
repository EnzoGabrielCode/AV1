import { ResultadoTeste } from "./enums"
import { TipoTeste } from "./enums"
import Aeronave from "./aeronave"

export default class Teste {
    public tipo: TipoTeste
    public resultado: ResultadoTeste
    public aeronaves: Aeronave[]

    constructor(tipo: TipoTeste, resultado: ResultadoTeste){
        this.tipo = tipo
        this.resultado = resultado
        this.aeronaves = []
    }

    adicionarAeronave(aeronaves: Aeronave):void{
            if (!this.aeronaves.some(p => p.modelo === aeronaves.modelo)){
                this.aeronaves.push(aeronaves)
            }
        }

    detalhes(): void {
        console.log(`--- Detalhes do Teste ---`);
        if (this.aeronaves.length === 0) {
            console.log('Nenhuma aeronave associada a este teste.');
        } else {
            this.aeronaves.forEach(a => console.log(`Aeronave testada: \nCódigo: ${a.pegarCodigo}, Modelo: ${a.modelo}`));
        }
        console.log(`Tipo: ${this.tipo}`);
        console.log(`Resultado: ${this.resultado}`);
        console.log(`-------------------------`);
    }



    salvar(){}

    carregar(){}
}