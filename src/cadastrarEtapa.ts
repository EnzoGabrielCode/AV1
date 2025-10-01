import Etapa from "./etapa";
import Funcionario from "./funcionario";
import { perguntar } from "./input";
import { StatusEtapa } from "./enums";
import { perguntarComValidacao } from "./input";

const validarNaoVazio = (input: string): boolean => input.length > 0;

export default class CadastrarEtapa {

    public async cadastrar(): Promise<Etapa> {
        console.log('================= Cadastrar Etapa de Produção ================\n');

        const nome = await perguntarComValidacao(
            'Digite o nome da etapa: ',
            validarNaoVazio,
            'O nome não pode ser vazio.'
        );

        const prazo = await perguntarComValidacao(
            'Digite o prazo da etapa (Ex: 01-10-2025): ',
            validarNaoVazio,
            'O prazo não pode ser vazio.'
        );

        const funcionarios: Funcionario[] = [];

        const novaEtapa = new Etapa(
            nome,
            prazo,
            funcionarios
        );

        console.log('\nEtapa de Produção cadastrada com sucesso!\n');
        novaEtapa.detalhes();
        return novaEtapa;
    }
}