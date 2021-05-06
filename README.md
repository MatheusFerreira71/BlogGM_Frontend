# BlogGM
Repositório contendo a API e o Front End do Blog para a aula de Dev Web
Protótipo inicial disponível no <a href="https://www.figma.com/file/3MBVMo6DGkNqpUlLnhwtAB/GMBlog">Figma</a>

<h1>Desenvolvedores</h1>

<ul>
    <li><a href="https://github.com/Pazeto22">Gustavo Pazeto</a> - Front-End</li>
    <li><a href="https://github.com/MatheusFerreira71">Matheus Ferreira</a> - Back-End</li>
</ul>

<h1>Instalação do projeto</h1>
<ul>
    <li>Dentro da pasta server: yarn install</li>
    <li>Dentro da pasta server: yarn seed</li>
    <li>Dentro da pasta frontend: yarn install</li>
    <li>Em ambas as pastas: yarn start</li> (Necessário rodar comando em ambos simultaneamente)
</ul>

<h1>Front-end</h1>
O projeto foi desenvolvido utilizando Angular

<h1>Back-end</h1>
Iremos começar o nosso projeto com o back-end, abaixo irei explicar tudo que é necessário para começar o projeto e
finalizar o back-end. Aproveitem.

<h1>Instalação</h1>
<ul>
    <li><a href="https://nodejs.org/">Node.js</a>: versão >= 12.16</li>
    <li><a href="https://yarnpkg.com/">Yarn</a>: versão >= 1.22</li>
    <li><a href="https://code.visualstudio.com/">Visual Studio Code</a>: versão >= 1.42</li>
    <li><a href="https://www.mongodb.com/">MongoDB</a>: versão >= 4.2.3</li>
</ul>

Tenha certeza que o mongo está ativo no seus serviços.

Crie uma pasta raiz do projeto, sem espaços em seu caminho e em seu nome, também tenha certeza de que seu
usuário esteja sem caracteres especiais e espaço.

Crie uma pasta dentro da pasta raiz, agora já podemos usar o terminal do visual studio code para podermos passar nossos
comandos. A pasta pode ser um nome que lembre o backend de um projeto, no meu caso, usei server.
Não se esqueça de entrar dentro da pasta criada, pois apartir de agora tudo será feito dentro dela.
Use cd "nome" para poder acessar a pasta no terminal.

<h1>Instalação de Pacotes</h1>
Iremos instalar alguns pacotes necessários para o servidor ficar operacional, para isso iremos usar o express.
Execute os comandos na ordem.
<ul>
    <li>npx express-generator . --no-view</li>
    <li>yarn set version berry</li>
    <li>yarn install</li>
    <li>yarn start</li>
</ul>

Apartir daqui seu projeto estara no ar, para finalizá-lo aperte ctrl + c em seu terminal e em seguida S, ele será
finalizado.

<h1>Configurando a conexão com o Banco</h1>

Agora precisamos instalar um pacote para gerenciar o banco de dados, ele é o mongoose.
- yarn add mongoose

Após isso iremos criar uma pasta config e criar um database.js dentro dela, para podermos criar a conexão do projeto com
o banco de dados. Verifiquem o código dentro desse arquivo para mais informações.

Após isso iremos ter que iniciar a conexão com o banco de dados no app.js (vejam o código para mais informações).

<h1>Estruturação de Dados</h1>

Agora que criamos a nossa conexão está na hora de estruturarmos nossos dados. Eu estruturei o meu banco levando em
consideração um projeto de blog para um trabalho da faculdade, eles estão guardados na pasta models, onde devem ficar.
Dê uma olhada nos códigos dessa pasta para ver um exemplo de como ficaram seus dados.

<h1>Criação dos Controladores</h1>

Partiremos agora para as engrenagens do back-end, aqui criaremos todos os métodos para manusear os dados no banco,
como criar, apagar, listar e atualizar, o famoso CRUD. Cheque a pasta controllers para ver os códigos.

<h1>Criação das Rotas</h1>

E por fim a criação das rotas, essas rotas deverão ser criadas na pasta routes e inicialisadas no app.js. Verifique os exemplos para mais informações.

<h1>Execução de Testes</h1>

Agora devemos testar, baixe qualquer programa de API REST para fazer seus testes, no meu caso estou usando o <a href="https://insomnia.rest/download/">Insomnia</a>
Crie suas rotas como o localhost e o prefixo da rota, por exemplo: http://locahost:3000/usuario
Agora é só fazer os testes, não se esqueça de que os métodos, post, put e delete estão com corpo json, não se esqueça de adicionar corpo a sua requisição. Com isso finalizamos o back-end.

Adicionei um <a href="https://github.com/MatheusFerreira71/BlogGM/blob/master/Requests_BlogGM.json">Arquivo JSON Especial</a> nesse repositório, que só é necessário importar no Insomnia e usar os requests. Boa Sorte!

Special Thanks to <a href="https://github.com/faustocintra">Fausto Cintra</a> que forneceu seu conhecimento para nós.
