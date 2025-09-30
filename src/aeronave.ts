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

    detalhes(){}

    salvar(){}

    carregar(){}
}