import { ResultadoTeste, TipoTeste } from "./enums";
import { perguntarComValidacao } from "./input"
import Teste from "./teste"

export default class CadastrarTeste{
    public async cadastrar(): Promise<Teste> {
        console.log('================= Realizar Teste ================\n');

        const tipoInput = await perguntarComValidacao(
                    'Digite o tipo do teste (1-ELETRICO, 2-HIDRAULICO, 3-AERODINAMICO): ',
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
                console.clear();
                console.log('\nTeste cadastrado com sucesso!\n');
                novoTeste.detalhes();
                return novoTeste;


    }
}