const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv')
 
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const doc = {
  info: {
    title: 'MyData API',
    version: '1.0.0',
    description: 'API documentation for MyData application',
  },
  host: process.env.API_URL || 'localhost:3000',
 
  schemes: ['https'],

};

const outputFile = './src/swagger_output.json';
const endpointsFiles = ['./src/app.ts']; 


swaggerAutogen(outputFile, endpointsFiles,doc).then(() => {
  console.log("Swagger documentation generated!");
});