import { ResultadoTeste } from "./enums"
import { TipoTeste } from "./enums"

export default class Teste {
    public tipo: TipoTeste
    public resultado: ResultadoTeste

    constructor(tipo: TipoTeste, resultado: ResultadoTeste){
        this.tipo = tipo
        this.resultado = resultado
    }

    detalhes(): void {
        console.log(`--- Detalhes do Teste ---`);
        console.log(`Tipo: ${this.tipo}`);
        console.log(`Resultado: ${this.resultado}`);
        console.log(`-------------------------`);
    }

    salvar(){}

    carregar(){}
}