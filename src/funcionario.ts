import { NivelPermissao } from "./enums";

export default class Funcionario{
    public id: string
    public nome: string
    public telefone: string
    public endereco: string
    public usuario: string
    public senha: string
    public nivelPermissao: NivelPermissao

    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao){
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivelPermissao = nivelPermissao
    }

    get pegarId(): string {
        return this.id
    }

    autenticar(usuario: string, senha: string): boolean {
        return this.usuario === usuario && this.senha === senha
    }

    detalhes(): void {
        console.log('-----------------------------------------------------')
        console.log(`ID: ${this.id}`);
        console.log(`Nome: ${this.nome}`);
        console.log(`Telefone: ${this.telefone}`);
        console.log(`Endereço: ${this.endereco}`);
        console.log(`Usuário: ${this.usuario}`);
        console.log(`Nível de Permissão: ${this.nivelPermissao}`);
        console.log('-----------------------------------------------------')
    }
}