import { TipoAeronave } from "./enums"

export default class Aeronave {
    private codigo: string
    public modelo: string
    public tipo: TipoAeronave
    public capcidade: number
    public alcance: number

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capcidade: number, alcance: number) {
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capcidade = capcidade
        this.alcance = alcance
    }

    detalhes():void{
        console.log(`---------Detalhes da Aeronave ${this.codigo}:---------`)
        console.log(`Código: ${this.codigo}\nModelo: ${this.modelo}\nTipo: ${this.tipo}\nCapacidade: ${this.capcidade}\nAlcance: ${this.alcance}`)
        console.log('-------------------------------------------------')
    }

    get pegarCodigo(): string {
        return this.codigo
    }

    salvar(){}

    carregar(){}
}