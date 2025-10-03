# Aerocode - Sistema de Gestão de Produção de Aeronaves

> Software de interface de linha de comando (CLI) para gestão do processo de produção de aeronaves, desenvolvido para a empresa fictícia Aerocode.
> Projeto desenvolvido na faculdade FATEC no curso Desenvolvimento de Software Multiplataforma na aula de Técnica de programação.

Este projeto simula um sistema completo para gerenciar a fabricação de aeronaves, controlando entidades como Peças, Etapas de Produção, Funcionários, Testes e as próprias Aeronaves. O sistema inclui autenticação de usuários e níveis de permissão para garantir a segurança e a integridade dos dados.

## ✨ Funcionalidades

* **Autenticação de Usuários:** Sistema de login com usuário e senha.
* **Controle de Permissões:** Três níveis de acesso (Administrador, Engenheiro, Operador) que restringem o acesso a funcionalidades críticas.
* **Cadastro Completo:** Gerenciamento de Aeronaves, Peças, Etapas de Produção e Funcionários.
* **Fluxo de Produção:** Lógica para garantir que as etapas de produção sigam uma sequência ordenada.
* **Registro de Testes:** Capacidade de registrar testes de qualidade (elétricos, hidráulicos, etc.) realizados nas aeronaves.
* **Geração de Relatórios:** Criação de um relatório final detalhado por aeronave, que pode ser salvo em um arquivo `.txt`.
* **Persistência de Dados:** Todas as informações são salvas em arquivos `.json`, garantindo que os dados não sejam perdidos ao fechar o sistema.

## 🛠️ Tecnologias Utilizadas

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/)
* [ts-node](https://www.npmjs.com/package/ts-node) (para desenvolvimento)
* [uuid](https://www.npmjs.com/package/uuid) (para geração de IDs únicos, se implementado)

## 🚀 Começando

Siga estas instruções para obter uma cópia do projeto e executá-lo em sua máquina local.

### Pré-requisitos

Antes de começar, garanta que você tenha o Node.js e o npm instalados em sua máquina.

* [Node.js (LTS)](https://nodejs.org/)

### Instalação e Execução

Siga o passo a passo abaixo para rodar o sistema.

**Passo 01: Clonagem do repositório**

Abra seu terminal ou Git Bash e clone o repositório para sua máquina local.

```sh
git clone https://github.com/EnzoGabrielCode/AV1.git
````

**Passo 02: Abrir os arquivos na IDE**

Navegue até a pasta do projeto clonado e abra-a em seu editor de código preferido, como o Visual Studio Code.

```sh
cd seu-repositorio
code .
```

**Passo 03: Instalar as dependências**

No terminal da sua IDE (dentro da pasta do projeto), execute o comando abaixo. Ele irá instalar todas as bibliotecas necessárias para o projeto funcionar.

```sh
npm install
```

**Passo 04: Rodar o sistema**

Ainda no terminal, execute o comando de desenvolvimento. Ele irá compilar e executar o sistema em tempo real.

```sh
npm run dev
```

*(**Nota:** Este comando assume que seu arquivo `package.json` tem um script "dev", como por exemplo: `"dev": "ts-node src/main.ts"`)*

Nesse passo, o sistema já vai estar rodando no seu terminal.

**Passo 05: Criar o primeiro usuário (Administrador)**

Se for a primeira vez que você executa o sistema, não haverá nenhum usuário cadastrado. O sistema irá te forçar a criar o primeiro funcionário, que deve ser, obrigatoriamente, um **Administrador** para que você possa gerenciar o restante do sistema.

**Passo 06: Logar no sistema**

Após o primeiro cadastro, o sistema irá para a tela de login. Use o usuário e senha que você acabou de criar para entrar.

**Passo 07: Utilizar o sistema (Primeira vez)**

Por ser a primeira vez utilizando o sistema, existe uma ordem recomendada para que as associações funcionem corretamente:

1.  **Crie os Funcionários:** Cadastre todos os usuários que irão interagir com o sistema.
2.  **Crie as Etapas de Produção:** Defina as etapas genéricas que podem ser aplicadas a uma aeronave.
3.  **Crie as Peças:** Cadastre as peças que serão utilizadas.
4.  **Crie as Aeronaves:** Por último, cadastre as aeronaves. Durante o cadastro ou gerenciamento, você poderá associar as peças e etapas já existentes.

**Passo 08: Explorar o sistema**

Após os cadastros iniciais, sinta-se à vontade para explorar todas as funcionalidades do sistema, como listar os dados, realizar testes, gerenciar a produção e gerar relatórios.

## 🔑 Níveis de Permissão

Abaixo está a tabela com as permissões de cada nível de usuário no sistema:

| Funcionalidade | Administrador | Engenheiro | Operador |
| :--- | :---: | :---: | :---: |
| **--- Gestão do Sistema ---** | | | |
| Cadastrar/Gerenciar Funcionários | ✅ | ❌ | ❌ |
| **--- Planejamento ---** | | | |
| Cadastrar Aeronave | ✅ | ✅ | ❌ |
| Cadastrar Peça | ✅ | ✅ | ❌ |
| Cadastrar Etapa de Produção | ✅ | ✅ | ❌ |
| Associar Funcionários a Etapas | ✅ | ✅ | ❌ |
| **--- Execução e Produção ---** | | | |
| Atualizar Status de Peça | ✅ | ✅ | ✅ |
| Iniciar/Finalizar Etapa | ✅ | ✅ | ✅ |
| **--- Qualidade e Conclusão ---** | | | |
| Registrar Teste | ✅ | ✅ | ❌ |
| Gerar Relatório Final | ✅ | ✅ | ❌ |
| **--- Visualização ---** | | | |
| Listar/Ver Detalhes (Todos) | ✅ | ✅ | ✅ |

## 👤 Autor

**Enzo Gabriel de Paula**

  * GitHub: [@EnzoGabrielCode](https://www.google.com/search?q=https://github.com/EnzoGabrielCode)
  * LinkedIn: [Enzo Gabriel de Paula](https://www.google.com/search?q=https://www.linkedin.com/in/enzo-gabriel-de-paula-8795a8332)
