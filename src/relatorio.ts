import Aeronave from "./aeronave";
import Teste from "./teste";

export default class Relatorio{
     public compilarTextoRelatorio(aeronave: Aeronave, cliente: string, teste: Teste[]): string {
        let texto = `===========================================================\n`;
        texto += ` RELATÓRIO FINAL DA AERONAVE: ${aeronave.pegarCodigo}\n`;
        texto += `===========================================================\n\n`;
        texto += `Cliente: ${cliente}\n`;
        texto += `Data de Entrega: ${new Date().toLocaleDateString('pt-BR')}\n\n`;

        texto += `------------------- Detalhes da Aeronave -------------------\n`;
        texto += `Modelo: ${aeronave.modelo}\n`;
        texto += `Tipo: ${aeronave.tipo}\n`;
        texto += `Capacidade: ${aeronave.capcidade} passageiros\n`;
        texto += `Alcance: ${aeronave.alcance} km\n\n`;

        texto += `-------------------- Peças Utilizadas --------------------\n`;
        texto += `${aeronave.listarPeca()}\n`;

        texto += `-------------- Etapas de Produção Realizadas --------------\n`;
        texto += `${aeronave.listarEtapa()}\n`;
        
        texto += `--------------------- Testes Realizados --------------------\n`;

        if (teste.length === 0) {
            texto += 'Nenhum teste associado a esta aeronave.\n\n';
        } else {
            const listaDeTestesComoTexto = teste.map(testeUnitario => {
                return `Tipo: ${testeUnitario.tipo}\nResultado: ${testeUnitario.resultado}}\n-----------------------------------------------------------`;
            }).join('\n\n');

            texto += listaDeTestesComoTexto + '\n\n';
        }

        texto += `==================== FIM DO RELATÓRIO ====================\n`;

        return texto;
    }

    public gerarRelatorioConsole(aeronave: Aeronave, cliente: string, teste: Teste[]): void {
        const textoDoRelatorio = this.compilarTextoRelatorio(aeronave, cliente, teste);
        console.log(textoDoRelatorio);
    }
}
