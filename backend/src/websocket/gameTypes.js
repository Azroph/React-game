// Types de messages WebSocket
export const WS_TYPES = {
    // Messages du client
    CREATE_GAME: 'createGame',
    JOIN_GAME: 'joinGame',
    LEAVE_GAME: 'leaveGame',

    // Messages du serveur
    GAME_CREATED: 'gameCreated',
    GAME_JOINED: 'gameJoined',
    GAME_STARTED: 'gameStarted',
    PLAYER_LEFT: 'playerLeft',
    ERROR: 'error'
};

// États possibles d'une partie
export const GAME_STATES = {
    WAITING: 'waiting',
    PLAYING: 'playing',
    FINISHED: 'finished'
};

// Messages d'erreur
export const ERROR_MESSAGES = {
    GAME_NOT_FOUND: 'Partie non trouvée',
    GAME_FULL: 'La partie est complète',
    INVALID_ACTION: 'Action non valide',
    SELF_JOIN: 'Vous ne pouvez pas rejoindre votre propre partie'
};