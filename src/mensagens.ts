export default class Mensagens {

    public listarOpcoes = () => {
        console.log(`Opções do sistema:\n`);
        console.log(`1 - CADASTRAR`);
        console.log(`2 - OUTRO`);
        console.log(`3 - OUTRO`);
        console.log(`4 - OUTRO\n`);
    }

    public comoUsar = () => {
        console.log(`Para usar, digite o número para selecionar o que deseja fazer.`);
        console.log(`Exemplo para opção 1-CADASTRO: "1"`);
        console.log(`Para encerrar digite "sair"\n`);
    }

    public boasVindas = () => {
        console.log('\nBem-vindo a AeroCode\n');
    }

}