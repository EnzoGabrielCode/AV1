import Aeronave from "./aeronave";
import { TipoAeronave } from "./enums";
import { perguntarComValidacao } from "./input";
import Peca from "./peca";
import Etapa from "./etapa";

const validarNaoVazio = (input: string): boolean => input.length > 0;

const validarCodigoAeronaveFormato = (codigo: string): boolean => {
    const regex = /^[A-Z0-9-]{3,}$/i;
    return regex.test(codigo);
};

const validarNumeroInteiroPositivo = (input: string): boolean => {
    const numero = parseInt(input, 10);
    return !isNaN(numero) && numero > 0;
};

export default class CadastrarAeronave {
    
    public async cadastrar(aeronavesExistentes: Aeronave[], pecaDisponiveis: Peca[], etapaDisponiveis: Etapa[]): Promise<Aeronave> {
        
        console.log('================= Cadastrar Aeronave ================\n');

        const validarCodigoUnico = (codigoInput: string): boolean => {
            if (!validarCodigoAeronaveFormato(codigoInput)) {
                return false;
            }
            
            const codigoExiste = aeronavesExistentes.some(
                aeronave => aeronave.pegarCodigo.toUpperCase() === codigoInput.toUpperCase()
            );

            return !codigoExiste; 
        };

        const codigo = await perguntarComValidacao(
            'Digite o código da aeronave (Ex: PR-GOL, A320-NEO): ',
            validarCodigoUnico,
            'Código inválido, em formato incorreto ou já existente.'
        );

        const modelo = await perguntarComValidacao(
            'Digite o modelo da aeronave: ',
            validarNaoVazio,
            'O modelo não pode ser vazio.'
        );

        const tipoInput = await perguntarComValidacao(
            'Digite o tipo da aeronave (1-COMERCIAL, 2-MILITAR): ',
            (resposta) => resposta === '1' || resposta === '2',
            'Opção inválida. Digite 1 ou 2.'
        );
        const tipo = tipoInput === '1' ? TipoAeronave.COMERCIAL : TipoAeronave.MILITAR;

        const capacidadeStr = await perguntarComValidacao(
            'Digite a capacidade de passageiros: ',
            validarNumeroInteiroPositivo,
            'Valor inválido. Digite apenas um número inteiro positivo.'
        );

        const alcanceStr = await perguntarComValidacao(
            'Digite o alcance (em km): ',
            validarNumeroInteiroPositivo,
            'Valor inválido. Digite apenas um número inteiro positivo.'
        );

        const novaAeronave = new Aeronave(
            codigo.toUpperCase(),
            modelo, 
            tipo,
            parseInt(capacidadeStr), 
            parseInt(alcanceStr)
        );

        console.log('\n--- Adicionar Peças ---');
        
        let adicionando = true;
        while (adicionando) {

            const pecaParaSelecionar = pecaDisponiveis.filter(
                disponivel => !novaAeronave.peca.some(atribuido => atribuido.nome === disponivel.nome)
            )
            if (pecaDisponiveis.length === 0) {
                console.log('Nenhuma peça disponível para adicionar.');
                break;
            }

            console.log('\nSelecione uma peça para adicionar à etapa:');
            pecaParaSelecionar.forEach((peca, index: number) => {
                console.log(`${index + 1} - ${peca.nome}`);
            });
            console.log('0 - Concluir adição de peças');

            const escolha = await perguntarComValidacao(
                '> ',
                (input) => {
                    const num = parseInt(input);
                    return !isNaN(num) && num >= 0 && num <= pecaParaSelecionar.length;
                },
                'Opção inválida.'
            );

            if (escolha === '0') {
                adicionando = false;
            } else {
                const index = parseInt(escolha) - 1;
                const pecaEscolhido = pecaParaSelecionar[index];
                
                novaAeronave.adicionarPeca(pecaEscolhido);
                console.log(`${pecaEscolhido.nome} adicionado(a) à peça.`);
            }
        }

        adicionando = true;
        while (adicionando) {

            const etapaParaSelecionar = etapaDisponiveis.filter(
                disponivel => !novaAeronave.etapa.some(atribuido => atribuido.nome === disponivel.nome)
            )
            if (etapaDisponiveis.length === 0) {
                console.log('Nenhuma etapa disponível para adicionar.');
                break;
            }

            console.log('\nSelecione uma etapa para adicionar à etapa:');
            etapaParaSelecionar.forEach((etapa, index: number) => {
                console.log(`${index + 1} - ${etapa.nome}`);
            });
            console.log('0 - Concluir adição de etapas');

            const escolha = await perguntarComValidacao(
                '> ',
                (input) => {
                    const num = parseInt(input);
                    return !isNaN(num) && num >= 0 && num <= etapaParaSelecionar.length;
                },
                'Opção inválida.'
            );

            if (escolha === '0') {
                adicionando = false;
            } else {
                const index = parseInt(escolha) - 1;
                const etapaEscolhido = etapaParaSelecionar[index];
                
                novaAeronave.adicionarEtapa(etapaEscolhido);
                console.log(`${etapaEscolhido.nome} adicionado(a) à etapa.`);
            }
        }

        console.clear();
        console.log('\nAeronave cadastrada com sucesso!\n');
        novaAeronave.detalhes();
        return novaAeronave;
    }
}