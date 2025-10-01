import Etapa from './etapa';
import { perguntarComValidacao } from './input';
import { StatusEtapa } from './enums';

export async function atualizarEtapa(etapasCadastradas: Etapa[]): Promise<void> {

    if (etapasCadastradas.length === 0) {
        console.log('Nenhuma etapa de produção cadastrada para atualizar.');
    } else {
        console.log('\n================ Atualizar Status da Etapa de Produção ================\n');
        etapasCadastradas.forEach((etapa, index) => {
            console.log(`${index + 1} - ${etapa.nome} (Status Atual: ${etapa.status})`);
        });
        console.log('0 - Voltar\n');
        const escolhaIndex = await perguntarComValidacao(
            'Selecione o número da etapa para atualizar o status: ',
            (resposta) => {
                const num = parseInt(resposta);
                return !isNaN(num) && num >= 0 && num <= etapasCadastradas.length;
            },
            'Opção inválida.'
        );

        if (escolhaIndex === '0') {
            console.log('\nVoltando ao menu principal...');
        } else {
            const index = parseInt(escolhaIndex) - 1;
            const etapaSelecionada = etapasCadastradas[index];
            console.log(`\nEtapa Selecionada: ${etapaSelecionada.nome} (Status Atual: ${etapaSelecionada.status})`);
            if (etapaSelecionada.status === StatusEtapa.PENDENTE) {
                console.log('Atualizando etapa para EM_ANDAMENTO.');
                etapaSelecionada.iniciar();
            } else if (etapaSelecionada.status === StatusEtapa.ANDAMENTO) {
                console.log('Atualizando etapa para CONCLUIDA.');
                etapaSelecionada.finalizar();
            } else {
                console.log('A etapa já está CONCLUIDA e não pode ser atualizada.');
            }
            console.log('\nStatus atualizado com sucesso!\n');
            etapaSelecionada.detalhes();
            
        }
    }
}

            