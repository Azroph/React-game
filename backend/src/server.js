import chalk from "chalk";
import fastify from "fastify";
import fastifyBcrypt from "fastify-bcrypt";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJWT from "@fastify/jwt";
import fastifyWebsocket from "@fastify/websocket";
// Supprimez la ligne suivante car nous n'utiliserons pas socket.io
// import socketioServer from "@fastify/socket.io";
import { usersRoutes } from "./routes/users.js";
import { gamesRoutes } from "./routes/games.js";
import { sequelize } from "./bdd.js";
import { SocketManager } from "./websocket/socket.js"; // Assurez-vous que ce chemin est correct

// Test de la connexion à la base de données
try {
    await sequelize.authenticate();
    console.log(chalk.grey("Connecté à la base de données MySQL!"));
} catch (error) {
    console.error("Impossible de se connecter, erreur suivante :", error);
}

let blacklistedTokens = [];
const app = fastify();

// Ajout des plugins Fastify
await app
    .register(fastifyBcrypt, {
        saltWorkFactor: 12,
    })
    .register(cors, {
        origin: "*",
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
    })
    .register(fastifyWebsocket); // Ajout du plugin WebSocket

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

// Configuration WebSocket
const socketManager = new SocketManager();
app.get('/ws', { websocket: true }, (connection, req) => {
    socketManager.handleConnection(connection.socket);
});

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

        await app.listen({ port: 3000 });
        console.log("Serveur Fastify lancé sur " + chalk.blue("http://localhost:3000"));
        console.log(chalk.bgYellow("Accéder à la documentation sur http://localhost:3000/documentation"));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();