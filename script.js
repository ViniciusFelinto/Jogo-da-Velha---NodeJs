const socket = io();  // Conecta ao servidor Socket.io

let board = [];  // Armazena o estado do tabuleiro
let currentPlayer = '';  // Armazena o jogador atual
let mySymbol = '';  // 'X' ou 'O'

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

// Criação do tabuleiro dinâmico
function createBoard() {
  boardElement.innerHTML = '';  // Limpa o tabuleiro
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.textContent = board[i];
    cell.onclick = () => makeMove(i);
    boardElement.appendChild(cell);
  }
}

// Função para realizar a jogada
function makeMove(index) {
  if (board[index] === '' && mySymbol !== '') {
    socket.emit('jogada', index);  // Envia a jogada para o servidor
  }
}

// Escutando os eventos do servidor
socket.on('tabuleiro', (newBoard) => {
  board = newBoard;
  createBoard();
});

socket.on('ganhador', (winner) => {
  statusElement.textContent = `Jogador ${winner} venceu!`;
});

socket.on('connect', () => {
  statusElement.textContent = 'Esperando o outro jogador...';
});

