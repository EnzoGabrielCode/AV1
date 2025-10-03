import Aeronave from "./aeronave";
import { ResultadoTeste, TipoTeste } from "./enums";
import { perguntarComValidacao } from "./input"
import Teste from "./teste"

export default class CadastrarTeste{
    public async cadastrar(aeronavesDisponiveis: Aeronave[]): Promise<Teste | null> {
        console.log('================= Realizar Teste ================\n');

        if (aeronavesDisponiveis.length === 0) {
        console.log("Nenhuma aeronave disponível para testar.");
        return null;
    }
        const aeronavesTestadas: Aeronave[] = []

        console.log('\n--- Adicionar aeronave para o teste ---');

        const aeronavesParaSelecionar = aeronavesDisponiveis.filter(
            disponivel => !aeronavesTestadas.some(atribuido => atribuido.pegarCodigo === disponivel.pegarCodigo)
        )

        console.log('\nSelecione uma aeronave para testar:');
        aeronavesParaSelecionar.forEach((aeronave, index: number) => {
            console.log(`${index + 1} - ${aeronave.pegarCodigo}`);
        });
        console.log('0 - Voltar ao menu principal');

        const escolha = await perguntarComValidacao(
            '> ',
            (input) => {
                const num = parseInt(input);
                return !isNaN(num) && num >= 0 && num <= aeronavesParaSelecionar.length;
            },
            'Opção inválida.'
        );

        if (escolha === '0') {
            console.log('\nOperação cancelada. Voltando ao menu principal.');
            return null;
        }

        const index = parseInt(escolha) - 1
        const aeronaveEscolhida = aeronavesDisponiveis[index]
        console.log(`\nAeronave ${aeronaveEscolhida.pegarCodigo} selecionada para teste.`)

        console.log('\n--- Detalhes do teste realizado ---')
        const tipoInput = await perguntarComValidacao(
                    '\nDigite o tipo do teste (1-ELETRICO, 2-HIDRAULICO, 3-AERODINAMICO): ',
                    (resposta) => resposta === '1' || resposta === '2' || resposta === '3',
                    'Opção inválida. Digite 1, 2 ou 3.'
                );
                const tipo = tipoInput === '1' ? TipoTeste.ELETRICO : (tipoInput === '2' ? TipoTeste.HIDRAULICO : TipoTeste.AERODINAMICO);

        const resultadoInput = await perguntarComValidacao(
                    'Digite o resultado do teste (1-APROVADO, 2-REPROVADO): ',
                    (resposta) => resposta === '1' || resposta === '2',
                    'Opção inválida. Digite 1 ou 2.'
                );
                const resultado = resultadoInput === '1' ? ResultadoTeste.APROVADO : ResultadoTeste.REPROVADO;

        const novoTeste = new Teste(
            tipo,
            resultado
        );

        novoTeste.adicionarAeronave(aeronaveEscolhida);
       
        console.clear();
        console.log('\nTeste realizado com sucesso!\n');
        novoTeste.detalhes();
        return novoTeste;
    }
}