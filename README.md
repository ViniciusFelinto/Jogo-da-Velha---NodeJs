Jogo da Velha Multiplayer
Este é um projeto simples de Jogo da Velha Multiplayer utilizando Node.js com Socket.io para comunicação em tempo real entre os jogadores.

<b>Tecnologias Utilizadas<<b>
Node.js: Ambiente de execução JavaScript no servidor.
Express: Framework minimalista para Node.js, usado para servir arquivos estáticos.
Socket.io: Biblioteca para comunicação em tempo real entre o servidor e os clientes.
Requisitos
Antes de começar, você precisa ter o Node.js instalado no seu computador.

Instalando o Node.js
Acesse o site oficial do Node.js e baixe a versão recomendada para a maioria dos usuários (LTS).
Siga as instruções de instalação para o seu sistema operacional.

Verificando a instalação do Node.js

Após a instalação, abra o terminal ou prompt de comando e execute:
node -v

Isso deve retornar a versão do Node.js instalada, como por exemplo:
v18.0.0
Se isso acontecer, o Node.js foi instalado corretamente.

Configuração do Projeto
Agora, vamos configurar o projeto em sua máquina local.

1. Criando uma Nova Pasta
Primeiro, crie uma nova pasta para o seu projeto. No terminal ou prompt de comando, execute:

mkdir jogo-da-velha
cd jogo-da-velha

2. Inicializando o Node.js no Projeto
Dentro da pasta do projeto, inicialize o npm (Node Package Manager), que irá criar um arquivo package.json para o seu projeto. No terminal, execute:

npm init -y
Isso criará um arquivo package.json com as configurações padrão.

4. Instalando as Dependências
Agora, instale as dependências necessárias para o projeto: Express e Socket.io. Execute o comando abaixo:

npm install express socket.io
Isso irá instalar o Express (para servir os arquivos estáticos do jogo) e o Socket.io (para comunicação em tempo real entre os jogadores).



5. Iniciando o Servidor
Com tudo configurado, você pode agora iniciar o servidor. No terminal, execute:

node server.js


7. Jogando o Jogo
Abra o navegador e acesse http://localhost:3000. Você verá a interface do jogo da velha.

Para jogar, abra duas abas ou dois dispositivos diferentes e acesse o jogo.
O jogador X começará, e a cada jogada, o tabuleiro será atualizado automaticamente para ambos os jogadores.

8. Parando o Servidor
Quando terminar de jogar, você pode parar o servidor pressionando Ctrl + C no terminal.
