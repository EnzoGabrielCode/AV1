import * as readline from 'readline';
import Mensagens from './mensagens';

let mensagem = new Mensagens();


let iniciar = () => {
    let leitor = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    leitor.question('Qual processo deseja iniciar?\n', (resposta) => {
        resposta = resposta.trim()

        switch (resposta) {
            case '1':
                console.log('\nIniciando processo de cadastro...\n');
                break;
            case 'sair':
                console.log('\nEncerrando o sistema. Até mais!\n');
                break;
            default:
                console.log('\nOpção inválida. Tente novamente.\n');
                iniciar();
                break;
        }
        leitor.close();
            if (resposta !== 'sair') {
                iniciar();
            }        

    });
}


mensagem.boasVindas();
mensagem.listarOpcoes();
mensagem.comoUsar();
iniciar();