import { ResultadoTeste } from "./enums"

export default class Teste{
    public tipo: string
    public resultado: ResultadoTeste

    constructor(tipo: string, resultado: ResultadoTeste){
        this.tipo = tipo
        this.resultado = resultado
    }

    salvar(){}

    carregar(){}
}