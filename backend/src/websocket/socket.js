export class SocketManager {
  constructor() {
    this.games = new Map();
    this.sockets = new Set();
  }

  handleConnection(socket) {
    this.sockets.add(socket);
    console.log('Nouvelle connexion WebSocket');

    socket.on('message', (message) => this.handleMessage(socket, JSON.parse(message)));

    socket.on('close', () => {
      this.sockets.delete(socket);
      this.handleDisconnect(socket);
    });
  }

  handleMessage(socket, data) {
    switch (data.type) {
      case 'createGame':
        this.createGame(socket);
        break;
      case 'joinGame':
        this.joinGame(socket, data.gameId);
        break;
      case 'playTurn':
        this.playTurn(socket, data.gameId, data.move);
        break;
      default:
        console.log('Message type inconnu:', data.type);
    }
  }

  createGame(socket) {
    const gameId = Math.random().toString(36).substring(2, 15);
    this.games.set(gameId, {
      id: gameId,
      players: [socket],
      currentPlayer: socket
    });
    this.sendToSocket(socket, { type: 'gameCreated', gameId });
  }

  joinGame(socket, gameId) {
    const game = this.games.get(gameId);
    if (game && game.players.length < 2) {
      game.players.push(socket);
      this.sendToSocket(socket, { type: 'gameJoined', gameId });
      if (game.players.length === 2) {
        this.broadcastToGame(game, { type: 'gameStart', currentPlayer: game.currentPlayer });
      }
    } else {
      this.sendToSocket(socket, { type: 'error', message: 'Impossible de rejoindre la partie' });
    }
  }

  playTurn(socket, gameId, move) {
    const game = this.games.get(gameId);
    if (game && game.currentPlayer === socket) {
      this.broadcastToGame(game, { type: 'turnPlayed', player: socket, move });
      game.currentPlayer = game.players.find(player => player !== game.currentPlayer);
      this.broadcastToGame(game, { type: 'nextTurn', currentPlayer: game.currentPlayer });
    }
  }

  handleDisconnect(socket) {
    for (const [gameId, game] of this.games.entries()) {
      if (game.players.includes(socket)) {
        this.broadcastToGame(game, { type: 'playerDisconnected', player: socket });
        this.games.delete(gameId);
        break;
      }
    }
  }

  sendToSocket(socket, message) {
    socket.send(JSON.stringify(message));
  }

  broadcastToGame(game, message) {
    game.players.forEach(player => this.sendToSocket(player, message));
  }
}