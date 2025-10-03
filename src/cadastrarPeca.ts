import Peca from "./peca";
import { TipoPeca } from "./enums";
import { perguntarComValidacao } from "./input";
import { StatusPeca } from "./enums";


const validarNaoVazio = (input: string): boolean => input.length > 0;

const validarCodigoAeronaveFormato = (codigo: string): boolean => {
    const regex = /^[A-Z0-9-]{3,}$/i;
    return regex.test(codigo);
};

const validarSemNumero = (input: string): boolean => {
    const regex = /^[^0-9]+$/;
    return regex.test(input);
}

export default class CadastrarPeca {
    
    public async cadastrar(): Promise<Peca> {

        console.log('================= Cadastrar Peça ================\n');
        
        const nome = await perguntarComValidacao(
            'Digite o nome da peça: ',
            validarSemNumero,
            'O nome não pode conter números e não pode ser vazio.'
        );

        const tipoInput = await perguntarComValidacao(
            'Digite o tipo da peça (1-NACIONAL, 2-IMPORTADA): ',
            (resposta) => resposta === '1' || resposta === '2',
            'Opção inválida. Digite 1 ou 2.'
        );
        const tipo = tipoInput === '1' ? TipoPeca.NACIONAL : TipoPeca.IMPORTADA;

        const fornecedor = await perguntarComValidacao(
            'Digite o fornecedor da peça: ',
            validarSemNumero,
            'O fornecedor não pode ser vazio.'
        );

        const statusInput = await perguntarComValidacao(
            'Digite o status da peça (1-EM_PRODUCAO, 2-EM_TRANSPORTE, 3-PRONTA): ',
            (resposta) => resposta === '1' || resposta === '2' || resposta === '3',
            'Opção inválida. Digite 1, 2 ou 3.'
        );
        const status = statusInput === '1' ? StatusPeca.EM_PRODUCAO : (statusInput === '2' ? StatusPeca.EM_TRANSPORTE : StatusPeca.PRONTA);

        const novaPeca = new Peca(
            nome,
            tipo, 
            fornecedor,
            status
        );

        console.log('\nAeronave cadastrada com sucesso!\n');
        novaPeca.detalhes();
        return novaPeca;
    }
}