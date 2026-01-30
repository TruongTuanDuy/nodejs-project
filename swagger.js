const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My Express API",
            version: "1.0.0",
            description: "API documentation using Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
        ],
    },
    apis: ["./src/routes/*.js"], // nơi viết comment swagger
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;