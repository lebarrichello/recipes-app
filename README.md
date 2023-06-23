# PROJETO APP DE RECEITAS

Projeto desenvolvido em grupo no módulo de Front-End do curso de desenvolvimento web da Trybe

<p>Acesse o projeto em produção <a href="https://recipes-app-pi-lake.vercel.app/" target="_blank">clicando aqui</a></p>

## 🎯 Objetivo

Desenvolver um app de receitas onde o usuario possa visualizar, buscar, filtrar, favoritar ,compartilhar e acompanhar o progresso das receitas.

O aplicativo consome duas APIs, uma para comidas e outra para bebidas.
O layout tem como foco dispositivos móveis*

## 📝 Habilidades adquiridas

  1.  Utilizar a Context API do React para gerenciar estado
  2.  Utilizar o React Hook useState
  3.  Utilizar o React Hook useContext
  4.  Utilizar o React Hook useEffect
  5.  Criar Hooks customizados
  6.  Utilizar a métodologia ágil Kanban para dividir e organizar as demandas do projeto
  
  ## :pushpin: Tecnologias utilizadas no desenvolvimento
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![ReactRouter](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  ![Javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
  ![Testing Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
  ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
  ![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)
  
<details>
  <summary><strong>:heavy_check_mark: Requisitos do projeto  </strong></summary><br />

 - [x] Desenvolva os testes unitários de maneira que a cobertura seja de, no mínimo, 90%
 - [x] Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login
 - [x] Desenvolva a tela de maneira que a pessoa consiga escrever seu email no input de email e sua senha no input de senha
 - [x] Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos
 - [x] Após a submissão do formulário, salve no localStorage o e-mail da pessoa usuária na chave user
 - [x] Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login
 - [x] Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil
 - [x] Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la
 - [x] Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo
 - [x] Implemente 3 radio buttons na barra de busca: Ingredient, Name e First letter
 - [x] Busque na API de comidas caso a pessoa esteja na página de comidas, e na API de bebidas caso esteja na de bebidas
 - [x] Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL
 - [x] Caso a busca retorne mais de uma receita, renderize as 12 primeiras encontradas, exibindo a imagem e o nome de cada uma
 - [x] Exiba um alert caso nenhuma receita seja encontrada
 - [x] Implemente o menu inferior posicionando-o de forma fixa e contendo 2 ícones: um para comidas e outro para bebidas
 - [x] Exiba o menu inferior apenas nas telas indicadas pelo protótipo
 - [x] Redirecione a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior
 - [x] Carregue as 12 primeiras receitas de comidas ou bebidas, uma em cada card
 - [x] Implemente os botões de categoria para serem utilizados como filtro
 - [x] Implemente o filtro das receitas por meio da API ao clicar no filtro de categoria
 - [x] Implemente o filtro como um toggle, o qual se for selecionado novamente, o app deve retornar as receitas sem nenhum filtro
 - [x] Redirecione a pessoa usuária ao clicar no card para a tela de detalhes, que deve mudar a rota e conter o id da receita na URL
 - [x] Realize uma request para a API passando o id da receita que deve estar disponível nos parâmetros da URL
 - [x] Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes 
       seguidos pelas quantidades, instruções, um vídeo do youtube incorporado e recomendações
 - [x] Implemente as recomendações. Para receitas de comida, a recomendação deverá ser bebida, já para as receitas de bebida a recomendação deverá ser comida
 - [x] Implemente os 6 cards de recomendação, mostrando apenas 2. O scroll é horizontal, similar a um carousel
 - [x] Desenvolva um botão de nome "Start Recipe" que deve ficar fixo na parte de baixo da tela o tempo todo
 - [x] Implemente a solução de forma que, caso a receita já tenha sido feita, o botão "Start Recipe" desapareça
 - [x] Implemente a solução de modo que, caso a receita tenha sido iniciada mas não finalizada, o texto do botão deve ser "Continue Recipe"
 - [x] Redirecione a pessoa usuária caso o botão "Start Recipe" seja clicado, a rota deve mudar para a tela de receita em progresso
 - [x] Implemente um botão de compartilhar e um de favoritar a receita
 - [x] Implemente a solução de forma que, ao clicar no botão de compartilhar, o link de detalhes da receita deve ser copiado para o clipboard e uma mensagem avisando que o link foi 
       copiado deve aparecer na tela em uma tag HTML
 - [x] Salve as receitas favoritas no localStorage na chave favoriteRecipes
 - [x] Implemente o ícone do coração (favorito) de modo que: deve vir preenchido caso a receita esteja favoritada e vazio caso contrário
 - [x] Implemente a lógica no botão de favoritar. Caso seja clicado, o ícone do coração deve mudar seu estado atual, caso esteja preenchido deve mudar para vazio e vice-versa
 - [x] Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes com 
       suas respectivas quantidades e instruções
 - [x] Desenvolva um checkbox para cada item da lista de ingredientes
 - [x] Implemente uma lógica que ao clicar no checkbox de um ingrediente, o nome dele deve ser "riscado" da lista
 - [x] Salve o estado do progresso, que deve ser mantido caso a pessoa atualize a página ou volte para a mesma receita
 - [x] Desenvolva a lógica de favoritar e compartilhar. A lógica da tela de detalhes de uma receita se aplica aqui
 - [x] Implemente a solução de modo que o botão de finalizar receita ("Finish Recipe") só pode estar habilitado quando todos os ingredientes estiverem "checkados" (marcados)
 - [x] Redirecione a pessoa usuária após clicar no botão de finalizar receita ("Finish Recipe"), para a página de receitas feitas, cuja rota deve ser /done-recipes
 - [x] Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo
 - [x] Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita, nome, categoria, nacionalidade, a data em que a pessoa fez a receita, as 
       2 primeiras tags retornadas pela API e um botão de compartilhar
 - [x] Desenvolva a tela de maneira que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, o nome, se é alcoólica, a data em que a pessoa fez a receita e um 
       botão de compartilhar
 - [x] Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard
 - [x] Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros
 - [x] Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita
 - [x] Implemente os elementos da tela de receitas favoritas (cumulativo com os atributos em comum com a tela de receitas feitas), respeitando os atributos descritos no protótipo

 - [x] Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita, nome, categoria, nacionalidade, um botão de compartilhar e um de 
        "desfavoritar"
 - [x]  Desenvolva a tela de modo que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, nome, se é alcoólica ou não, um botão de compartilhar e um de 
        "desfavoritar"
 - [x] Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard
 - [x] Desenvolva a solução de modo que o botão de "desfavoritar" deve remover a receita da lista de receitas favoritas do localStorage e da tela
 - [x] Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros
 - [x] Redirecione a pessoa usuária ao clicar na foto ou no nome da receita, a rota deve mudar para a tela de detalhes daquela receita
 - [x] Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo
 - [x] Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível
 - [x] Implemente 3 botões: um de nome "Done Recipes", um de nome "Favorite Recipes" e um de nome "Logout"
 - [x] Redirecione a pessoa usuária que, ao clicar no botão de "Done Recipes", a rota deve mudar para a tela de receitas feitas
 - [x] Redirecione a pessoa usuária que, ao clicar no botão de "Favorite Recipes", a rota deve mudar para a tela de receitas favoritas
 - [x] Redirecione a pessoa usuária que ao clicar no botão de "Logout", o localStorage deve ser limpo e a rota deve mudar para a tela de login

</details>

<details>
  <summary><strong>:construction: Funcionalidades e melhorias a serem implementadas futuramente: </strong></summary><br />

 - [x] Conectar com o back-End
 - [x] Opção para o usuario buscar refeicoes por categorias e nacionalidade 
 - [x] Responsividade e melhorias no CSS da pagina 
 

</details>

## ⬇️ Instalando dependências

Frontend

  ```bash
  cd src/
  npm install
  ``` 

## ⚡ Executando a aplicação

Para rodar o front-end:

  ```
  cd src/ && npm start
  ```

## 🧪 Executando os testes

Para rodar todos os testes:

  ```
  npm test
 ```
 
 
## 👩🏻‍💻  Projeto desenvolvido por :
  

<a href="https://github.com/lebarrichello/recipes-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=lebarrichello/recipes-app" />
</a>

Made with [contrib.rocks](https://contrib.rocks).

 
