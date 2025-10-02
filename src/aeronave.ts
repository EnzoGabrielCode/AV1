import { TipoAeronave } from "./enums"
import Peca from "./peca"
import Etapa from "./etapa"

export default class Aeronave {
    private codigo: string
    public modelo: string
    public tipo: TipoAeronave
    public capcidade: number
    public alcance: number
    public peca: Peca[]
    public etapa: Etapa[]

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capcidade: number, alcance: number) {
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capcidade = capcidade
        this.alcance = alcance
        this.peca = []
        this.etapa = []
    }

    listarPeca(){
        let listaPeca = ''

        for (const peca of this.peca){
            listaPeca += `-----------------------------------------------------------
Nome: ${peca.nome}
Tipo: ${peca.tipo}
Fornecedor: ${peca.fornecedor}
Status: ${peca.status}
-----------------------------------------------------------\n`
        }
    return listaPeca
        }

    listarEtapa(){
        let listaEtapa = ''

        for (const etapa of this.etapa){
            listaEtapa += `-----------------------------------------------------------
Nome: ${etapa.nome}
Prazo: ${etapa.prazo}
Status: ${etapa.status}
Funcionários da Etapa:\n${etapa.listarFuncionarios()}\n
`
        }
    return listaEtapa
        }

    detalhes():void{
        console.log(`---------Detalhes da Aeronave ${this.codigo}:---------`)
        console.log(`Código: ${this.codigo}\nModelo: ${this.modelo}\nTipo: ${this.tipo}\nCapacidade: ${this.capcidade}\nAlcance: ${this.alcance}\n\nPeças associadas:\n${this.listarPeca()}\nEtapa associada:\n${this.listarEtapa()}\n`)
        console.log('-----------------------------------------------------------')
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

    salvar(){}

    carregar(){}
}