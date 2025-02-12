export class GameWebSocket {
    constructor() {
        this.games = new Map();
        this.players = new Map();
    }

    initialize(fastify) {
        fastify.get('/ws/game', { 
            websocket: true,
            handler: (connection, req) => {
                console.log("Nouvelle connexion WebSocket établie");
                this.handleConnection(connection.socket);
            }
        });
    }

    handleConnection(socket) {
        console.log('Nouvelle connexion WebSocket');
        
        socket.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                console.log('Message reçu:', data);
                this.handleMessage(socket, data);
            } catch (error) {
                console.error('Erreur parsing message:', error);
            }
        });

        socket.on('close', () => {
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
        }
    }

    createGame(socket) {
        const gameId = Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const game = {
            id: gameId,
            host: socket,
            guest: null,
            status: 'waiting'
        };

        this.games.set(gameId, game);
        this.players.set(socket, gameId);

        console.log('Partie créée:', gameId);

        this.sendToSocket(socket, {
            type: 'gameCreated',
            gameId: gameId
        });
    }

    joinGame(socket, gameId) {
        const game = this.games.get(gameId);
        
        if (!game) {
            this.sendError(socket, 'Partie non trouvée');
            return;
        }

        if (game.status !== 'waiting') {
            this.sendError(socket, 'Cette partie n\'est plus disponible');
            return;
        }

        game.guest = socket;
        game.status = 'playing';
        this.players.set(socket, gameId);

        console.log('Partie rejointe:', gameId);

        // Informer les deux joueurs
        this.sendToSocket(socket, {
            type: 'gameJoined',
            gameId
        });

        this.sendToSocket(game.host, {
            type: 'gameJoined',
            gameId
        });
    }

    handleDisconnect(socket) {
        const gameId = this.players.get(socket);
        if (gameId) {
            const game = this.games.get(gameId);
            if (game) {
                // Informer l'autre joueur
                const otherPlayer = game.host === socket ? game.guest : game.host;
                if (otherPlayer) {
                    this.sendToSocket(otherPlayer, {
                        type: 'playerLeft'
                    });
                }
                this.games.delete(gameId);
            }
            this.players.delete(socket);
        }
    }

    sendToSocket(socket, message) {
        if (socket && socket.readyState === 1) { // WebSocket.OPEN
            socket.send(JSON.stringify(message));
        }
    }

    sendError(socket, message) {
        this.sendToSocket(socket, {
            type: 'error',
            message
        });
    }
}