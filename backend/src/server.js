import chalk from "chalk";
import fastify from "fastify";
import fastifyBcrypt from "fastify-bcrypt";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJWT from "@fastify/jwt";
import fastifyWebsocket from "@fastify/websocket";
import socketioServer from "fastify-socket.io";
import { usersRoutes } from "./routes/users.js";
import { gamesRoutes } from "./routes/games.js";
import { sequelize } from "./bdd.js";
import GameWebSocket from "./websocket/GameWebSocket.js";

// Test de la connexion à la base de données
try {
    await sequelize.authenticate();
    console.log(chalk.grey("Connecté à la base de données MySQL!"));
} catch (error) {
    console.error("Impossible de se connecter, erreur suivante :", error);
}

const app = fastify();

await app.register(cors, {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});

await app.register(fastifyWebsocket);

const gameWebSocket = new GameWebSocket();

// Route WebSocket
app.get('/ws/game', { websocket: true }, (connection, req) => {
    console.log("Nouvelle connexion WebSocket");
    gameWebSocket.handleConnection(connection.socket);
});

await app.register(fastifyBcrypt, {
    saltWorkFactor: 12,
})
.register(fastifySwagger, {
    openapi: {
        openapi: "3.0.0",
        info: {
            title: "Documentation de l'API JDR LOTR",
            description: "API développée pour un exercice avec React avec Fastify et Sequelize",
            version: "0.1.0",
        },
    },
})
.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
    theme: {
        title: "Docs - JDR LOTR API",
    },
    uiConfig: {
        docExpansion: "list",
        deepLinking: false,
    },
    uiHooks: {
        onRequest: function (request, reply, next) { next(); },
        preHandler: function (request, reply, next) { next(); },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
    },
    transformSpecificationClone: true,
})
.register(fastifyJWT, {
    secret: "unanneaupourlesgouvernertous",
});

let blacklistedTokens = [];

// Routes
app.get("/", (request, reply) => {
    reply.send({ documentationURL: "http://localhost:3000/documentation" });
});

// Fonction pour décoder et vérifier le token
app.decorate("authenticate", async (request, reply) => {
    try {
        const token = request.headers["authorization"].split(" ")[1];
        if (blacklistedTokens.includes(token)) {
            return reply.status(401).send({ error: "Token invalide ou expiré" });
        }
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});

// Gestion des utilisateurs et des jeux
usersRoutes(app, blacklistedTokens);
gamesRoutes(app);

// Démarrage du serveur
const start = async () => {
    try {
        await sequelize.sync({ alter: true })
            .then(() => {
                console.log(chalk.green("Base de données synchronisée."));
            })
            .catch((error) => {
                console.error("Erreur de synchronisation de la base de données :", error);
            });

        await app.listen({ port: 3000, host: "0.0.0.0" });
        console.log("Serveur Fastify lancé sur " + chalk.blue("http://localhost:3000"));
        console.log(chalk.bgYellow("Accéder à la documentation sur http://localhost:3000/documentation"));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();