import {perguntar, leitor} from './input';
import Mensagens from './mensagens';
import CadastrarAeronave from './cadastrarAeronave';
import Aeronave from './aeronave';
import CadastrarPeca from './cadastrarPeca';
import Peca from './peca';
import { StatusPeca } from './enums';
import { perguntarComValidacao } from './input';
import CadastrarEtapa from './cadastrarEtapa';
import Etapa from './etapa';
import { atualizarEtapa } from './atualizarEtapa';
import CadastrarFuncionario from './cadastrarFuncionario';
import Funcionario from './funcionario';

const pecasCadastradas: Peca[] = [];
const aeronavesCadastradas: Aeronave[] = [];
const etapasCadastradas: Etapa[] = [];
const funcionariosCadastrados: Funcionario[] = [];

let proximoIdFuncionario = 1

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
                    console.log('3 - Cadastrar Etapa de Produção');
                    console.log('4 - Cadastrar Funcionário');
                    console.log('5 - Cadastrar/Realizar Teste');
                    console.log('0 - Voltar\n');
                    const tipoCadastro = await perguntar('Digite a opção desejada: ');

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
                        case '3':
                            console.clear();
                            const cadastroEtapa = new CadastrarEtapa();
                            const novaEtapa = await cadastroEtapa.cadastrar(funcionariosCadastrados);
                            etapasCadastradas.push(novaEtapa);
                            console.log('\nPressione Enter para continuar...');
                            await perguntar('');
                            break;
                        case '4':
                            console.clear();
                            const cadastroFuncionario = new CadastrarFuncionario();
                            const novoFuncionario = await cadastroFuncionario.cadastrar(proximoIdFuncionario);
                            funcionariosCadastrados.push(novoFuncionario);
                            proximoIdFuncionario++;
                            console.log('\nPressione Enter para continuar...');
                            await perguntar('');
                            break;
                        case '5':
                            console.clear();
                            

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
                    console.log('3 - Listar Etapa de Produção');
                    console.log('4 - Listar Funcionários');
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
                        case '3':
                            console.clear();
                            console.log('\n================ Etapas de Produção cadastradas ================\n');
                            if (etapasCadastradas.length === 0) {
                                console.log('Nenhuma etapa de produção cadastrada.');
                            } else {
                                etapasCadastradas.forEach(etapa => etapa.detalhes());
                            }
                            console.log('\nPressione Enter para continuar...');
                            await perguntar('');
                            break;
                        case '4':
                            console.clear();
                            console.log('\n================ Funcionários cadastrados ================');
                            console.log('-----------------------------------------------------')
                            if (funcionariosCadastrados.length === 0) {
                                console.log('Nenhum funcionário cadastrado.');
                            } else {
                                funcionariosCadastrados.forEach(funcionario => funcionario.detalhes());
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

                case '3':
                    console.clear();
                    if (pecasCadastradas.length === 0) {
                        console.log('Nenhuma peça cadastrada para atualizar.');
                    } else {
                        console.log('\n================ Atualizar Status da Peça ================\n');
                        pecasCadastradas.forEach((peca, index) => {
                            console.log(`${index + 1} - ${peca.nome} (Status Atual: ${peca.status})`);
                        });
                        console.log('0 - Voltar\n');

                        const escolhaIndex = await perguntarComValidacao(
                            'Selecione o número da peça para atualizar o status: ',
                            (resposta) => {
                                const num = parseInt(resposta);
                                return !isNaN(num) && num >= 0 && num <= pecasCadastradas.length;
                            },
                            'Opção inválida.'
                        );

                        if (escolhaIndex === '0') {
                            console.log('\nVoltando ao menu principal...');
                        } else {
                            const index = parseInt(escolhaIndex) - 1;
                            const pecaSelecionada = pecasCadastradas[index];

                            console.log('\nSelecione o novo status:');
                            console.log('1 - Em Produção');
                            console.log('2 - Em Transporte');
                            console.log('3 - Pronta');

                            const statusInput = await perguntarComValidacao(
                                `Digite o novo status para a peça "${pecaSelecionada.nome}": `,
                                (resposta) => ['1', '2', '3'].includes(resposta),
                                'Opção de status inválida. Digite 1, 2 ou 3.'
                            );

                            let novoStatusEnum: StatusPeca;
                            switch (statusInput) {
                                case '1':
                                    novoStatusEnum = StatusPeca.EM_PRODUCAO;
                                    break;
                                case '2':
                                    novoStatusEnum = StatusPeca.EM_TRANSPORTE;
                                    break;
                                case '3':
                                    novoStatusEnum = StatusPeca.PRONTA;
                                    break;
                                default:
                                    throw new Error('Status inválido');
                            }

                            pecaSelecionada.status = novoStatusEnum;

                            console.log('\nStatus atualizado com sucesso!');
                        }
                    }
                    console.log('\nPressione Enter para continuar...');
                    await perguntar('');
                    break;

                case '4':
                    console.clear();
                    await atualizarEtapa(etapasCadastradas);
                    console.log('\nPressione Enter para continuar...');
                    await perguntar('');
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