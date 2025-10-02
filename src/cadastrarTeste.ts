import { perguntarComValidacao } from "./input"
import Teste from "./teste"

export default class CadastrarTeste{
    public async cadastrar(): Promise<Teste> {
        const statusInput = await perguntarComValidacao(
                    'Digite o status da peça (1-EM_PRODUCAO, 2-EM_TRANSPORTE, 3-PRONTA): ',
                    (resposta) => resposta === '1' || resposta === '2' || resposta === '3',
                    'Opção inválida. Digite 1, 2 ou 3.'
                );
                const status = statusInput === '1' ? StatusPeca.EM_PRODUCAO : (statusInput === '2' ? StatusPeca.EM_TRANSPORTE : StatusPeca.PRONTA);
    }
}