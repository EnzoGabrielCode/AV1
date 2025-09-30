import { StatusEtapa } from "./enums";
import Funcionario from "./funcionario";

export default class Etapa {
    public nome: string
    public prazo: string
    public status: StatusEtapa
    public funcionarios: Funcionario[]

    constructor(nome: string, prazo: string, status: StatusEtapa, funcionarios: Funcionario[]){
        this.nome = nome
        this.prazo = prazo
        this.status = status
        this.funcionarios = funcionarios
    }

    iniciar(){}

    finalizar(){}

    associarFuncionario(funcionarios: Funcionario){}

    listarFuncionarios(){
        let listaFuncionarios = ''

        for (const funcionario of this.funcionarios){
            listaFuncionarios += `ID: ${funcionario.pegarId}
Nome: ${funcionario.nome}
Telefone: ${funcionario.telefone}
Endereço: ${funcionario.endereco}

`
        }
    return listaFuncionarios
        }
}