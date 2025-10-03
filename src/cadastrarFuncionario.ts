import { NivelPermissao } from "./enums";
import Funcionario from "./funcionario";
import { perguntarComValidacao } from "./input";

const validarNaoVazio = (input: string): boolean => input.length > 0;
const validarTelefone = (input: string): boolean => /^\d{10,11}$/.test(input);


export default class CadastrarFuncionario {

    public async cadastrarPrimeiroAdmin(id: number): Promise<Funcionario> {
        console.log('================= Cadastro do Administrador Inicial ================\n');
        
        const nome = await perguntarComValidacao('Digite o nome do administrador: ', validarNaoVazio, 'O nome не pode ser vazio.');
        const telefone = await perguntarComValidacao('Digite o telefone do administrador (ex: 12999999999/dddnumero): ', validarTelefone, 'Telefone inválido. Deve conter apenas números e ter 10 ou 11 dígitos.');
        const endereco = await perguntarComValidacao('Digite o endereço do administrador: ', validarNaoVazio, 'O endereço não pode ser vazio.');
        const usuario = await perguntarComValidacao('Digite o nome de usuário: ', validarNaoVazio, 'O nome de usuário não pode ser vazio.');
        const senha = await perguntarComValidacao('Digite a senha: ', validarNaoVazio, 'A senha não pode ser vazia.');

        const nivelPermissao = NivelPermissao.ADMINISTRADOR;

        const novoFuncionario = new Funcionario(id.toString(), nome, telefone, endereco, usuario, senha, nivelPermissao);
        
        console.log('\nAdministrador cadastrado com sucesso!\n');
        novoFuncionario.detalhes();
        return novoFuncionario;
    }

    public async cadastrar(id: number): Promise<Funcionario> {
        console.log('================= Cadastrar Funcionário ================\n');
        
        const nome = await perguntarComValidacao(
            'Digite o nome do funcionário: ',
            validarNaoVazio,
            'O nome não pode ser vazio.'
        );

        const telefone = await perguntarComValidacao(
            'Digite o telefone do funcionário (ex: 12999999999/dddnumero): ',
            validarTelefone,
            'Telefone inválido. Deve conter apenas números e ter 10 ou 11 dígitos.'
        );

        const endereco = await perguntarComValidacao(
            'Digite o endereço do funcionário: ',
            validarNaoVazio,
            'O endereço não pode ser vazio.'
        );
        const usuario = await perguntarComValidacao(
            'Digite o nome de usuário do funcionário: ',
            validarNaoVazio,
            'O nome de usuário não pode ser vazio.'
        );
        const senha = await perguntarComValidacao(
            'Digite a senha do funcionário: ',
            validarNaoVazio,
            'A senha não pode ser vazia.'
        );
        const nivelPermissaoInput = await perguntarComValidacao(
            'Digite o nível de permissão do funcionário (1-Administrador, 2-Engenheiro, 3-Operador): ',
            (input: string) => ['1', '2', '3'].includes(input),
            'Nível de permissão inválido. Digite 1, 2 ou 3.'
        );
        const input = nivelPermissaoInput === '1' ? NivelPermissao.ADMINISTRADOR : (nivelPermissaoInput === '2' ? NivelPermissao.ENGENHEIRO : NivelPermissao.OPERADOR);

        const novoFuncionario = new Funcionario(
            id.toString(),
            nome,
            telefone,
            endereco,
            usuario,
            senha,
            input
        );
        console.log('\nFuncionário cadastrado com sucesso!\n');
        novoFuncionario.detalhes();
        return novoFuncionario;

    }
}