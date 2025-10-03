import { TipoAeronave } from "./enums"
import Peca from "./peca"
import Etapa from "./etapa"
import Teste from "./teste"

export default class Aeronave {
    private codigo: string
    public modelo: string
    public tipo: TipoAeronave
    public capcidade: number
    public alcance: number
    public peca: Peca[]
    public etapa: Etapa[]
    public teste: Teste[]

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capcidade: number, alcance: number) {
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capcidade = capcidade
        this.alcance = alcance
        this.peca = []
        this.etapa = []
        this.teste = []
    }

    listarPeca():string{
        let listaPeca = ''

        for (const peca of this.peca){
            listaPeca += `-----------------------------------------------------------
Nome: ${peca.nome}
Tipo: ${peca.tipo}
Fornecedor: ${peca.fornecedor}
Status: ${peca.status}
`
        }
    return listaPeca
        }

    listarEtapa():string{
        let listaEtapa = ''

        for (const etapa of this.etapa){
            listaEtapa += `-----------------------------------------------------------
Nome: ${etapa.nome}
Prazo: ${etapa.prazo}
Status: ${etapa.status}

Funcionários da Etapa:\n${etapa.listarFuncionarios()}`
        }
    return listaEtapa;
    }

    detalhes():void{
        console.log(`---------------- Detalhes da Aeronave ${this.codigo}: ----------------`)
        console.log(`Código: ${this.codigo}`)
        console.log(`Modelo: ${this.modelo}`)
        console.log(`Tipo: ${this.tipo}`)
        console.log(`Capacidade: ${this.capcidade}`)
        console.log(`Alcance: ${this.alcance}`)
        console.log('-----------------------------------------------------------\n')
        if(this.peca.length > 0){
            console.log(`Peças associadas:\n${this.listarPeca()}`)
        }
        if(this.etapa.length > 0){
            console.log(`Etapa associada:\n${this.listarEtapa()}-----------------------------------------------------------`)
        }
        // console.log('-----------------------------------------------------------')
    }

    get pegarCodigo(): string {
        return this.codigo
    }

    adicionarPeca(peca: Peca):void{
        if (!this.peca.some(p => p.nome === peca.nome)){
            this.peca.push(peca)
        }
    }

    adicionarEtapa(etapa: Etapa):void{
        if (!this.etapa.some(p => p.nome === etapa.nome)){
            this.etapa.push(etapa)
        }
    }
}