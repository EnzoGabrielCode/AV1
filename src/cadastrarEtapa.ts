import Etapa from "./etapa";
import Funcionario from "./funcionario";
import { perguntarComValidacao } from "./input";

const validarNaoVazio = (input: string): boolean => input.length > 0;
const validarData = (input: string): boolean => /^\d{2}-\d{2}-\d{4}$/.test(input);

export default class CadastrarEtapa {

    public async cadastrar(funcionariosDisponiveis: Funcionario[]): Promise<Etapa> {
        console.log('================= Cadastrar Etapa de Produção ================\n');

        const nome = await perguntarComValidacao(
            'Digite o nome da etapa: ',
            validarNaoVazio,
            'O nome não pode ser vazio.'
        );

        const prazoStr = await perguntarComValidacao(
            'Digite o prazo da etapa no formato DD-MM-AAAA: ',
            validarData,
            'Formato de data inválido. Use DD-MM-AAAA.'
        );

        const [dia, mes, ano] = prazoStr.split('-').map(Number);
        const prazo = new Date(ano, mes - 1, dia);

        const novaEtapa = new Etapa(nome, prazo);

        console.log('\n--- Adicionar Funcionários Responsáveis ---');
        
        let adicionando = true;
        while (adicionando) {

            const funcionariosParaSelecionar = funcionariosDisponiveis.filter(
                disponivel => !novaEtapa.funcionarios.some(atribuido => atribuido.id === disponivel.id)
            )
            if (funcionariosDisponiveis.length === 0) {
                console.log('Nenhum funcionário disponível para adicionar.');
                break;
            }

            console.log('\nSelecione um funcionário para adicionar à etapa:');
            funcionariosParaSelecionar.forEach((funcionario, index: number) => {
                console.log(`${index + 1} - ${funcionario.nome}`);
            });
            console.log('0 - Concluir adição de funcionários');

            const escolha = await perguntarComValidacao(
                '> ',
                (input) => {
                    const num = parseInt(input);
                    return !isNaN(num) && num >= 0 && num <= funcionariosParaSelecionar.length;
                },
                'Opção inválida.'
            );

            if (escolha === '0') {
                adicionando = false;
            } else {
                const index = parseInt(escolha) - 1;
                const funcionarioEscolhido = funcionariosParaSelecionar[index];
                
                novaEtapa.associarFuncionario(funcionarioEscolhido);
                console.log(`${funcionarioEscolhido.nome} adicionado(a) à etapa.`);
            }
        }
        
        console.clear();
        console.log('Etapa de Produção cadastrada com sucesso!\n');
        novaEtapa.detalhes(); 
        return novaEtapa;
    }
}