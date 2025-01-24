const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let jogadores = []; // Lista para armazenar as conexões dos jogadores
let tabuleiro = ['', '', '', '', '', '', '', '', '']; // Tabuleiro do jogo da velha
let jogadorAtual = 0; // Controla qual jogador faz a jogada (0 ou 1)
let jogoComecou = false; // Controle para verificar se o jogo já começou

// Serve os arquivos estáticos (HTML, CSS, JS) da pasta 'public'
app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('Um jogador se conectou');
  
  // Adiciona o jogador à lista
  if (jogadores.length < 2) {
    jogadores.push({ id: jogadores.length, socket }); // Adiciona o jogador com ID à lista
    socket.emit('status', `Você é o Jogador ${jogadores.length}. Aguardando o outro jogador...`);
    
    console.log(`Jogadores conectados: ${jogadores.length}`);
    
    if (jogadores.length === 2) {
      jogoComecou = true;
      console.log('Jogo iniciado!');
      io.emit('status', 'Jogo iniciado! O jogador 1 começa.'); // Inicia o jogo
      io.emit('tabuleiro', tabuleiro); // Envia o tabuleiro inicial para os dois jogadores
    }
  } else {
    socket.emit('status', 'O jogo já está cheio. Tente novamente mais tarde.');
    socket.disconnect(); // Desconecta o jogador se a partida já estiver cheia
  }

  // Quando um jogador faz uma jogada
  socket.on('jogada', (index) => {
    const jogador = jogadores.find(j => j.socket === socket); // Identifica o jogador pela socket
    
    // Verifica se o jogador está fazendo a jogada na vez dele
    if (jogoComecou && jogador && jogador.id === jogadorAtual && tabuleiro[index] === '') {
      tabuleiro[index] = jogador.id === 0 ? 'X' : 'O'; // Marca a jogada no tabuleiro
      jogadorAtual = (jogadorAtual + 1) % 2; // Alterna para o próximo jogador

      console.log(`Jogador ${jogadorAtual === 0 ? '1' : '2'} fez uma jogada`);
      
      io.emit('tabuleiro', tabuleiro); // Envia o estado do tabuleiro para os jogadores

      // Verifica se alguém ganhou
      if (verificaVitoria()) {
        io.emit('ganhador', tabuleiro[index]); // Emite quem foi o vencedor
        reiniciaJogo(); // Reseta o jogo
      } else if (verificaEmpate()) { 
        io.emit('status', 'O jogo terminou em empate! Deu velha!'); // Envia a mensagem de empate
        setTimeout(() => reiniciaJogo(), 3000); // Reinicia o jogo após 3 segundos
      } else {
        // Atualiza a vez do jogador no status para os dois jogadores
        io.emit('status', `É a vez do Jogador ${jogadorAtual === 0 ? '1' : '2'}.`);
      }
    } else {
      // Informa que não é a vez do jogador
      socket.emit('status', `Aguarde sua vez, é a vez do Jogador ${jogadorAtual === 0 ? '1' : '2'}.`);
    }
  });

  // Quando um jogador desconectar
  socket.on('disconnect', () => {
    console.log('Um jogador se desconectou');
    jogadores = jogadores.filter(jogador => jogador.socket !== socket); // Remove o jogador da lista
    jogoComecou = false; // O jogo deve ser reiniciado
    io.emit('status', 'Aguardando dois jogadores...');
  });
});

// Função para verificar se alguém ganhou
function verificaVitoria() {
  const padroesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Linhas verticais
    [0, 4, 8], [2, 4, 6]             // Diagonais
  ];

  for (let padroes of padroesVitoria) {
    const [a, b, c] = padroes;
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
      console.log('Alguém venceu!');
      return true; // Retorna true se houver uma combinação vencedora
    }
  }
  return false; // Retorna false se ninguém ganhou
}

// Função para verificar empate
function verificaEmpate() {
  return tabuleiro.every(celula => celula !== ''); // Verifica se todas as células estão preenchidas
}

// Função para resetar o jogo
function reiniciaJogo() {
  tabuleiro = ['', '', '', '', '', '', '', '', '']; // Reseta o tabuleiro
  jogadorAtual = 0; // Reinicia o jogador
  jogoComecou = true; // Mantém o jogo ativo para novos movimentos
  io.emit('tabuleiro', tabuleiro); // Envia o tabuleiro resetado para os jogadores
  io.emit('status', 'O jogo foi reiniciado! É a vez do Jogador 1.');
}

// Inicia o servidor na porta 3000
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
