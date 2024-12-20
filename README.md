# iClinicBot-App

Nesse projeto estarei usando a Api em C# <br>
GitHub: [https://github.com/HeitorSKimura/IClinicBot_BackEnd.git](https://github.com/HeitorSKimura/IClinicBot_BackEnd.git)

# Descrição

Link GitHub: [https://github.com/FERNANDO-MATSUHASHI/iClinicBot-App.git](https://github.com/FERNANDO-MATSUHASHI/iClinicBot-App.git). <br>
Objetivo: Criar um App em Ionic para controle da agenda médica de uma clínica, facilitando o dia a dia. 

# Tecnologias

- VSCode Version: 1.95.3 
- Ionic Version: 7.2.0
- Cordova Version: 12.0.0

Para a API em C# - Visual Studio Version: 17.11.5

# Padrão de Projeto Aplicado

## - Observer <br>

![Observer](./src/assets/images/Padrao_Projeto_Observer.png)

# Como funciona
Aqui explicarei como funciona o IclinicBot-App

## Login (Para acessar a agenda - e-mail e senha do médico cadastrado)
![Login](./src/assets/images/Login.png)

## Agenda do dia
![Agenda](./src/assets/images/Agenda.png)

## Agenda - Andamento (Seleciona a o paciente arrastando para a direita, confirmar clicando no botão 'EM ANDAMENTO')
![Agenda Andamento](./src/assets/images/Agenda_Andamento.png)

## Agenda (Paciente já selecionado, aparecendo em verde)
![Agenda - Andamento - Selecionado](./src/assets/images/Agenda_Andamento_Select.png)

## Agenda - Concluído (Após concluir o atendimento arrastar para a esquerda, conformar clicando em botão 'CONCLUÍDO')
![Agenda - Concluido](./src/assets/images/Agenda_Andamento_Concluido.png)

## Agenda (Aparecerá uma caixa para a confirmação)
![Agenda - Concluido - Confirmacao](./src/assets/images/Agenda_Andamento_Concluido_Confirmacao.png)

## Agenda - Atualizado (A agenda aparecerá atualizando removendo o paciente)
![Agenda - Atualizado](./src/assets/images/Agenda_Atualizado.png)

## Personalização da Configuração

Consulte [Ionic Installing](https://ionicframework.com/docs/intro/cli).

## Configuração do Projeto

#### Rodar o projeto

```bash
ionic serve
```

#### Compilar para produção

```bash
ionic build
```

