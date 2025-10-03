export default class Mensagens {

    public listarOpcoes = () => {
        console.log(`Escolha uma opção:`);
        console.log(`1 - Cadastro`);
        console.log(`2 - Listar`);
        console.log(`3 - Atualizar Status da Peça`);
        console.log(`4 - Atualizar Etapa de Produção`);
        console.log('5 - Realizar Teste de aeronave');
        console.log(`0 - Sair do sistema\n`);
    }

    public comoUsar = () => {
        console.log(`Para usar, digite o número para selecionar o que deseja fazer.`);
        console.log(`Exemplo para opção 1-Cadastro: "1"`);
        console.log(`Para encerrar digite "0"\n`);
    }

    public boasVindas = () => {
        console.clear();
        console.log('========================================');
        console.log('=== Bem-vindo ao sistema de Aerocode ===');
        console.log('========================================\n');
    }

}