import Aeronave from "./aeronave";
import { TipoAeronave } from "./enums";
import { perguntarComValidacao } from "./input";

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
    
    public async cadastrar(aeronavesExistentes: Aeronave[]): Promise<Aeronave> {
        
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
        console.clear();
        console.log('\nAeronave cadastrada com sucesso!\n');
        novaAeronave.detalhes();
        return novaAeronave;
    }
}