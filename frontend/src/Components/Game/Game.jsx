import React, { useEffect } from 'react';

const Game = () => {
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3000/ws/game');
        
        ws.onopen = () => {
            console.log('Connecté!');
            ws.send(JSON.stringify({type: 'test'}));
        };
        
        ws.onmessage = (evt) => {
            console.log('Message reçu:', evt.data);
        };
        
        ws.onerror = (err) => {
            console.error('Erreur WebSocket:', err);
        };

        return () => ws.close();
    }, []);

    return <div>Test WebSocket</div>;
};

export default Game;