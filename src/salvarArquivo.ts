import { writeFile, mkdir } from 'fs/promises';
import * as path from 'path';

export async function salvarArquivoAsync(nomeArquivo: string, conteudo: string): Promise<void> {
    const diretorio = 'relatorios';

    try {
        await mkdir(diretorio, { recursive: true });

        const caminhoCompleto = path.join(diretorio, nomeArquivo);
        
        await writeFile(caminhoCompleto, conteudo, 'utf-8');

        console.log(`\nRelatório salvo com sucesso em: ${caminhoCompleto}`);

    } catch (error) {
        if (error instanceof Error) {
            console.error(`\nrro ao salvar o arquivo: ${error.message}`);
        } else {
            console.error(`\nUm erro desconhecido ocorreu ao salvar o arquivo:`, error);
        }
    }
}