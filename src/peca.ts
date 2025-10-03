import { StatusPeca, TipoPeca } from './enums'

export default class Peca {
    nome: string
    tipo: TipoPeca
    fornecedor: string
    status: StatusPeca

    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca) {
        this.nome = nome
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
    }

    atualizarStatus(novoStatus: StatusPeca) {
        this.status = novoStatus
    }

    detalhes(): void {
        console.log(`--------------- Detalhes da Peça ${this.nome}: ---------------`)
        console.log(`Nome: ${this.nome}\nTipo: ${this.tipo}\nFornecedor: ${this.fornecedor}\nStatus: ${this.status}`)
        console.log('-------------------------------------------------')
    }
}