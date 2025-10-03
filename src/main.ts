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
import Teste from './teste';
import CadastrarTeste from './cadastrarTeste';
import Relatorio from './relatorio';
import { salvarArquivoAsync } from './salvarArquivo';
import { salvarDados, carregarDados } from './persistencia';

let pecasCadastradas: Peca[] = [];
let aeronavesCadastradas: Aeronave[] = [];
let etapasCadastradas: Etapa[] = [];
let funcionariosCadastrados: Funcionario[] = [];
let TestesCadastrados: Teste[] = []

let proximoIdFuncionario = 1

let mensagem = new Mensagens();

class Sistema{
    public async iniciar() {
        const dadosCarregados = await carregarDados();
        aeronavesCadastradas = dadosCarregados.aeronaves;
        pecasCadastradas = dadosCarregados.pecas;
        etapasCadastradas = dadosCarregados.etapas;
        funcionariosCadastrados = dadosCarregados.funcionarios;
        TestesCadastrados = dadosCarregados.testes;

        if (funcionariosCadastrados.length > 0) {
            proximoIdFuncionario = Math.max(...funcionariosCadastrados.map(f => parseInt(f.id))) + 1;
        }

        mensagem.boasVindas();

        if (funcionariosCadastrados.length === 0){
            console.log('Não existe funcionários cadastrados no sistema;')
            console.log('Cadastre um novo usuário para começar!\n')
            const cadastroFuncionario = new CadastrarFuncionario();
            const novoFuncionario = await cadastroFuncionario.cadastrar(proximoIdFuncionario);
            funcionariosCadastrados.push(novoFuncionario);
            proximoIdFuncionario++;
            console.log('\nPressione Enter para continuar...');
            await perguntar('');
        }

        let executandoSistema= true
        while (executandoSistema){
        
        let usuarioLogado: Funcionario | null = null;
        while (!usuarioLogado) {
            console.clear();
            mensagem.boasVindas();
            console.log('=============== Login ===============');
            const usuarioInput = await perguntar('Usuário (ou digite "sair" para encerrar): ');
            if (usuarioInput.toLowerCase() === 'sair') {
                executandoSistema = false;
                break; 
            }

            const senhaInput = await perguntar('Senha: ');
            
            const funcionarioEncontrado = funcionariosCadastrados.find(
                f => f.usuario === usuarioInput
            );
            
            if (funcionarioEncontrado && funcionarioEncontrado.autenticar(usuarioInput, senhaInput)) {
                usuarioLogado = funcionarioEncontrado;
                console.log(`\nLogin bem-sucedido! Bem-vindo(a), ${usuarioLogado.nome}!`);
                console.log('Pressione Enter para continuar...');
                await perguntar('');
            } else {
                console.log('\nUsuário ou senha incorretos. Tente novamente.');
                console.log('Pressione Enter para continuar...');
                await perguntar('');
            }
        }
        
        if (!usuarioLogado){
            continue
        }

        let sessaoAtiva = true;
        while (sessaoAtiva) {
            console.clear();
            mensagem.boasVindas();
            console.log(`\nUsuário: ${usuarioLogado.nome} | Nível: ${usuarioLogado.nivelPermissao}\n`);
            mensagem.comoUsar();
            mensagem.listarOpcoes();
            const resposta = await perguntar('Digite a opção desejada: ');

            switch (resposta) {
                case '1':
                    if (usuarioLogado.nivelPermissao === 'ADMINISTRADOR' || usuarioLogado.nivelPermissao === 'ENGENHEIRO') {
                        console.clear();
                        console.log('\nEscolha o tipo de cadastro:');
                        console.log('1 - Cadastrar Aeronave');
                        console.log('2 - Cadastrar Peça');
                        console.log('3 - Cadastrar Etapa de Produção');
                        console.log('4 - Cadastrar Funcionário');
                        console.log('0 - Voltar\n');
                        const tipoCadastro = await perguntar('Digite a opção desejada: ');
                    
                        switch (tipoCadastro) {
                            case '1':
                                console.clear();
                                const cadastroAeronave = new CadastrarAeronave();
                                const novaAeronave = await cadastroAeronave.cadastrar(aeronavesCadastradas, pecasCadastradas, etapasCadastradas);
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
                                if (usuarioLogado.nivelPermissao === 'ADMINISTRADOR'){
                                console.clear();
                                const cadastroFuncionario = new CadastrarFuncionario();
                                const novoFuncionario = await cadastroFuncionario.cadastrar(proximoIdFuncionario);
                                funcionariosCadastrados.push(novoFuncionario);
                                proximoIdFuncionario++;
                                console.log('\nPressione Enter para continuar...');
                                await perguntar('');
                                break;
                                } else {
                                    console.log('\nACESSO NEGADO: Você não tem permissão para acessar a área de cadastros de funcionários.');
                                    console.log('Pressione Enter para continuar...');
                                    await perguntar('');
                                    break
                                }
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
                                } else {
                                    console.log('\nACESSO NEGADO: Você não tem permissão para acessar a área de cadastros.');
                                    console.log('Pressione Enter para continuar...');
                                    await perguntar('');
                                    break
                                }
                case '2':
                        console.clear();
                        console.log('\nEscolha o que deseja listar:');
                        console.log('1 - Listar Aeronaves');
                        console.log('2 - Listar Peças');
                        console.log('3 - Listar Etapa de Produção');
                        console.log('4 - Listar Funcionários');
                        console.log('5 - Listar Testes');
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
                            case '5':
                                console.clear();
                                console.log('\n================ Testes cadastrados ================');
                                console.log('-----------------------------------------------------')
                                if (TestesCadastrados.length === 0) {
                                    console.log('Nenhum teste cadastrado.');
                                } else {
                                    TestesCadastrados.forEach(teste => teste.detalhes());
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
                
                case '5':
                    if (usuarioLogado.nivelPermissao === 'ADMINISTRADOR' || usuarioLogado.nivelPermissao === 'ENGENHEIRO' ) {
                        console.clear();
                        const cadastrarTeste = new CadastrarTeste();
                        const novoTeste = await cadastrarTeste.cadastrar(aeronavesCadastradas);
                        if (novoTeste !== null) {
                            TestesCadastrados.push(novoTeste);
                        }
                        console.log('\nPressione Enter para continuar...');
                        await perguntar('');
                        break;
                    } else {
                        console.log('\nACESSO NEGADO: Você não tem permissão para acessar a área de realização de testes.');
                        console.log('Pressione Enter para continuar...');
                        await perguntar('');
                        break
                    }
                
                case '6':
                    if (usuarioLogado.nivelPermissao === 'ADMINISTRADOR' || usuarioLogado.nivelPermissao === 'ENGENHEIRO' ) {
                        console.clear();
                        if (aeronavesCadastradas.length === 0) {
                            console.log('\nNenhuma aeronave cadastrada para gerar relatório.');
                        } else {
                            console.log('\nSelecione a aeronave para gerar o relatório:');
                            aeronavesCadastradas.forEach((aeronave, index) => {
                                console.log(`${index + 1} - ${aeronave.pegarCodigo}`);
                            });
                            console.log('0 - Voltar');

                            const escolha = await perguntarComValidacao(
                                '> ',
                                (input) => {
                                    const num = parseInt(input);
                                    return !isNaN(num) && num >= 0 && num <= aeronavesCadastradas.length;
                                },
                                'Opção inválida.'
                            );

                            if (escolha !== '0') {
                                const index = parseInt(escolha) - 1;
                                const aeronaveSelecionada = aeronavesCadastradas[index];
                                const nomeCliente = await perguntar('Digite o nome do cliente para o relatório: ');
                                const gerarRelatorio = new Relatorio();
                                const textoDoRelatorio = gerarRelatorio.compilarTextoRelatorio(aeronaveSelecionada, nomeCliente, TestesCadastrados);
                                console.clear()
                                console.log(textoDoRelatorio)

                                const nomeArquivo = `relatorio_${aeronaveSelecionada.pegarCodigo}_${Date.now()}.txt`;

                                await salvarArquivoAsync(nomeArquivo, textoDoRelatorio)
                            }
                        }
                        console.log('\nPressione Enter para continuar...');
                        await perguntar('');
                        break;
                    } else {
                        console.log('\nACESSO NEGADO: Você não tem permissão para acessar a área de gerar relatórios.');
                        console.log('Pressione Enter para continuar...');
                        await perguntar('');
                        break
                    }
                
                case '7':
                    console.clear()
                    console.log('\nTrocando de usuário')
                    sessaoAtiva = false
                    console.log('Pressione Enter para voltar à tela de login...');
                    await perguntar('');
                    break;

                case '0':
                    console.clear();
                    console.log('\nEncerrando o sistema. Até mais!\n');
                    sessaoAtiva = false;
                    executandoSistema = false

                    await salvarDados(
                        aeronavesCadastradas,
                        pecasCadastradas,
                        etapasCadastradas,
                        funcionariosCadastrados,
                        TestesCadastrados
                    );
                    break;
                default:
                    console.clear();
                    console.log('\nOpção inválida. Tente novamente.\n');
                    console.log('\nPressione Enter para continuar...');
                    await perguntar('');
                    break;
            }
        }
    }
        leitor.close();
}
}

const sistema = new Sistema();
sistema.iniciar();
