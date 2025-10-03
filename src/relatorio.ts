import Aeronave from "./aeronave";
import Teste from "./teste";

export default class Relatorio{
    gerarRelatorio(aeronave: Aeronave, teste: Teste[]):void{
        console.log(`\n======================== Relatório ========================\n`)
        //             -----------------------------------------------------------
        aeronave.detalhes()
        if(teste.length > 0){
            console.log(`\n========== Testes realizados na aeronave ${aeronave.pegarCodigo} ==========\n`)
            teste.forEach(teste => teste.detalhes())
        }
        console.log(`\n===========================================================`)
    }

    salvarEmArquivo():void{}
}