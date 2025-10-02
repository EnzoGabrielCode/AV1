import { StatusEtapa } from "./enums";
import Funcionario from "./funcionario";

export default class Etapa {
    public nome: string
    public prazo: Date
    public status: StatusEtapa
    public funcionarios: Funcionario[]

    constructor(nome: string, prazo: Date){
        this.nome = nome
        this.prazo = prazo
        this.status = StatusEtapa.PENDENTE
        this.funcionarios = []
    }

    public iniciar(): void {
        if (this.status === StatusEtapa.PENDENTE) {
            this.status = StatusEtapa.ANDAMENTO;
            console.log(`Etapa "${this.nome}" iniciada.`);
        } else {
            console.log(`Atenção: A etapa "${this.nome}" não pode ser iniciada pois seu status é ${this.status}.`);
        }
    }

    public finalizar(): void {
        if (this.status === StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA;
            console.log(`Etapa "${this.nome}" concluída.`);
        } else {
            console.log(`Atenção: A etapa "${this.nome}" não pode ser finalizada pois seu status é ${this.status}.`);
        }
    }

    associarFuncionario(funcionario: Funcionario): void{
        if (!this.funcionarios.some(f => f.id === funcionario.id)){
            this.funcionarios.push(funcionario)
        }
    }

    listarFuncionarios(){
        let listaFuncionarios = ''

        for (const funcionario of this.funcionarios){
            listaFuncionarios += `-----------------------------------------------------------
ID: ${funcionario.pegarId}
Nome: ${funcionario.nome}
Telefone: ${funcionario.telefone}
Endereço: ${funcionario.endereco}
-----------------------------------------------------------`
        }
    return listaFuncionarios
        }

    detalhes(): void {
        console.log(`Nome da Etapa: ${this.nome}`);
        console.log(`Prazo: ${this.prazo}`);
        console.log(`Status: ${this.status}`);
        console.log(`Funcionários Associados:\n`);
        console.log(this.listarFuncionarios());
    }
}