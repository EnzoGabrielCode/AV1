import {perguntar, leitor} from './input';
import Mensagens from './mensagens';
import CadastrarAeronave from './cadastrarAeronave';
import Aeronave from './aeronave';
import CadastrarPeca from './cadastrarPeca';
import Peca from './peca';

const pecasCadastradas: Peca[] = [];
const aeronavesCadastradas: Aeronave[] = [];

let mensagem = new Mensagens();

class Sistema{
    public async iniciar() {
        console.clear();
        mensagem.boasVindas();
        mensagem.comoUsar();

        let loop = true;
        while (loop) {
            mensagem.listarOpcoes();
            const resposta = await perguntar('Digite a opção desejada: ');

            switch (resposta) {
                case '1':
                    console.clear();
                    console.log('\nEscolha o tipo de cadastro:');
                    console.log('1 - Cadastrar Aeronave');
                    console.log('2 - Cadastrar Peça');
                    console.log('0 - Voltar\n');
                    const tipoCadastro = await perguntar('\nDigite a opção desejada: ');

                    switch (tipoCadastro) {
                        case '1':
                            console.clear();
                            const cadastroAeronave = new CadastrarAeronave();
                            const novaAeronave = await cadastroAeronave.cadastrar(aeronavesCadastradas);
                            aeronavesCadastradas.push(novaAeronave);
                            console.log('\nPressione Enter para continuar...');
                            await perguntar('');
                            break;
                        case '2':
                            console.clear();
                            const cadastroPeca = new CadastrarPeca();
                            const novaPeca = await cadastroPeca.cadastrar();
                            pecasCadastradas.push(novaPeca);
                            console.log('\nPressione Enter para continuar...');
                            await perguntar('');
                            break;
                        case '0':
                            console.clear();
                            console.log('\nVoltando, Pressione Enter para continuar...');
                            await perguntar('');
                            break;
                        default:
                            console.clear();
                            console.log('\nOpção inválida. Retornando ao menu principal.\n');
                            console.log('\nPressione Enter para continuar...');
                            await perguntar('');
                            break;
                    }
                    break;
                case '2':
                    console.clear();
                    console.log('\nEscolha o que deseja listar:');
                    console.log('1 - Listar Aeronave');
                    console.log('2 - Listar Peça');
                    console.log('0 - Voltar\n');
                    const tipoLista = await perguntar('\nDigite a opção desejada: ');

                    switch (tipoLista) {
                        case '1':
                            console.clear();
                            console.log('\n================ Aeronaves cadastradas ================\n');
                            if (aeronavesCadastradas.length === 0) {
                                console.log('Nenhuma aeronave cadastrada.');
                            } else {
                                aeronavesCadastradas.forEach(aeronave => aeronave.detalhes());
                            }
                            console.log('\nPressione Enter para continuar...');
                            await perguntar('');
                            break;
                        case '2':
                            console.clear();
                            console.log('\n================ Peças cadastradas ================\n');
                            if (pecasCadastradas.length === 0) {
                                console.log('Nenhuma peça cadastrada.');
                            } else {
                                pecasCadastradas.forEach(peca => peca.detalhes());
                            }
                            console.log('\nPressione Enter para continuar...');
                            await perguntar('');
                            break;
                        case '0':
                            console.clear();
                            console.log('\nVoltando, Pressione Enter para continuar...');
                            await perguntar('');
                            break;
                        default:
                            console.clear();
                            console.log('\nOpção inválida. Retornando ao menu principal.\n');
                            console.log('\nPressione Enter para continuar...');
                            await perguntar('');
                            break;
                    }
                    break;

                case '0':
                    console.clear();
                    console.log('\nEncerrando o sistema. Até mais!\n');
                    loop = false;
                    break;
                default:
                    console.clear();
                    console.log('\nOpção inválida. Tente novamente.\n');
                    console.log('\nPressione Enter para continuar...');
                    await perguntar('');
                    break;
            }
        }
        leitor.close();
    }
}

const sistema = new Sistema();
sistema.iniciar();