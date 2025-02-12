class GameWebSocket {
    constructor() {
        this.games = new Map(); // Stocke les parties en cours
        this.players = new Map(); // Stocke les connexions des joueurs
    }

    handleConnection(socket) {
        console.log(`Nouvelle connexion: ${socket.id}`);

        // Écoute l'événement de création de partie
        socket.on('createGame', async (userId) => {
            try {
                // Stocker la connexion du joueur
                this.players.set(userId, socket);
                
                // Créer une nouvelle partie
                const game = {
                    id: Math.random().toString(36).substring(7),
                    creator: userId,
                    player2: null,
                    currentTurn: userId,
                    state: 'pending'
                };
                
                this.games.set(game.id, game);
                
                // Rejoindre la room avec l'ID de la partie
                socket.join(game.id);
                
                // Notifier le créateur
                socket.emit('gameCreated', { gameId: game.id });
            } catch (error) {
                console.error('Erreur création partie:', error);
                socket.emit('error', { message: 'Erreur lors de la création de la partie' });
            }
        });

        // Écoute l'événement pour rejoindre une partie
        socket.on('joinGame', async (data) => {
            const { gameId, userId } = data;
            try {
                const game = this.games.get(gameId);
                
                if (!game) {
                    socket.emit('error', { message: 'Partie non trouvée' });
                    return;
                }

                if (game.state !== 'pending') {
                    socket.emit('error', { message: 'Cette partie n\'est plus disponible' });
                    return;
                }

                // Stocker la connexion du joueur
                this.players.set(userId, socket);
                
                // Mettre à jour l'état de la partie
                game.player2 = userId;
                game.state = 'playing';
                
                // Rejoindre la room
                socket.join(gameId);
                
                // Notifier tous les joueurs de la partie
                socket.to(gameId).emit('playerJoined', { userId });
                socket.emit('gameJoined', { gameId });
            } catch (error) {
                console.error('Erreur joinGame:', error);
                socket.emit('error', { message: 'Erreur lors de la connexion à la partie' });
            }
        });

        // Écoute les actions du jeu
        socket.on('gameAction', (data) => {
            const { gameId, userId, action } = data;
            const game = this.games.get(gameId);
            
            if (!game) {
                socket.emit('error', { message: 'Partie non trouvée' });
                return;
            }

            if (game.state !== 'playing') {
                socket.emit('error', { message: 'La partie n\'est pas en cours' });
                return;
            }

            if (game.currentTurn !== userId) {
                socket.emit('error', { message: 'Ce n\'est pas votre tour' });
                return;
            }

            // Envoyer l'action à l'autre joueur
            const nextTurn = userId === game.creator ? game.player2 : game.creator;
            game.currentTurn = nextTurn;

            socket.to(gameId).emit('opponentAction', { action });
            socket.emit('actionConfirmed', { nextTurn });
        });

        // Gérer la déconnexion
        socket.on('disconnect', () => {
            console.log(`Client déconnecté: ${socket.id}`);
            // Nettoyer les parties abandonnées...
        });
    }
}

export default GameWebSocket;