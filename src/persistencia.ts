import * as fs from 'fs/promises';
import Aeronave from './aeronave';
import Peca from './peca';
import Etapa from './etapa';
import Funcionario from './funcionario';
import Teste from './teste';

const CAMINHO_DADOS = './dados'; 

async function salvar(nomeArquivo: string, dados: any[]): Promise<void> {
    try {
        await fs.mkdir(CAMINHO_DADOS, { recursive: true });
        const caminho = `${CAMINHO_DADOS}/${nomeArquivo}`;

        await fs.writeFile(caminho, JSON.stringify(dados, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Erro ao salvar o arquivo ${nomeArquivo}:`, error);
    }
}

async function carregar(nomeArquivo: string): Promise<any[]> {
    const caminho = `${CAMINHO_DADOS}/${nomeArquivo}`;
    try {
        const dados = await fs.readFile(caminho, 'utf-8');
        return JSON.parse(dados);
    } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as {code: string}).code === 'ENOENT') {
        return [];
    }
    console.error(`Erro ao carregar o arquivo ${nomeArquivo}:`, error);
    return [];
}
}

export const salvarDados = async (
    aeronaves: Aeronave[],
    pecas: Peca[],
    etapas: Etapa[],
    funcionarios: Funcionario[],
    testes: Teste[]
) => {
    console.log('\nSalvando dados...');
    await salvar('aeronaves.json', aeronaves);
    await salvar('pecas.json', pecas);
    await salvar('etapas.json', etapas);
    await salvar('funcionarios.json', funcionarios);
    await salvar('testes.json', testes);
    console.log('Dados salvos com sucesso!');
};

export const carregarDados = async () => {
    console.log('Carregando dados...');

    const dadosFuncionarios = await carregar('funcionarios.json');
    const funcionarios = dadosFuncionarios.map(f => new Funcionario(f.id, f.nome, f.telefone, f.endereco, f.usuario, f.senha, f.nivelPermissao));
    
    const dadosPecas = await carregar('pecas.json');
    const pecas = dadosPecas.map(p => new Peca(p.nome, p.tipo, p.fornecedor, p.status));

    const dadosEtapas = await carregar('etapas.json');
    const etapas = dadosEtapas.map(e => {
        const etapa = new Etapa(e.nome, new Date(e.prazo)); 

        etapa.funcionarios = funcionarios.filter(f => 
            e.funcionarios.some((funcId: { id: string }) => funcId.id === f.id)
        );
        return etapa;
    });

    const dadosAeronaves = await carregar('aeronaves.json');
    const aeronaves = dadosAeronaves.map(a => new Aeronave(a.codigo, a.modelo, a.tipo, a.capcidade, a.alcance));
    
    const dadosTestes = await carregar('testes.json');
    const testes = dadosTestes.map(t => new Teste(t.tipo, t.resultado));

    console.log('Dados carregados com sucesso!');
    
    return { aeronaves, pecas, etapas, funcionarios, testes };
};