import Aeronave from "./aeronave";

export default class Relatorio{
    gerarRelatorio(aeronave: Aeronave):void{
        console.log(`\n========== Relatório ==========\n`)
        console.log(aeronave.detalhes())
    }

    salvarEmArquivo():void{}
}