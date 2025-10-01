import * as readline from 'readline';

export const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function perguntar(questao: string): Promise<string> {
    return new Promise(resolve => {
        leitor.question(questao, resposta => {
            resolve(resposta.trim());
        });
    });
}

export async function perguntarComValidacao(
    questao: string, 
    validacao: (resposta: string) => boolean,
    mensagemErro: string
): Promise<string> {
    while (true) {
        const resposta = await perguntar(questao);

        if (validacao(resposta)) {
            return resposta;
        } else {
            console.error(`\nErro: ${mensagemErro}\n`);
        }
    }
}