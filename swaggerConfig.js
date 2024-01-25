import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'Your API Title',
    version: '1.0.0',
    description: 'API description',
  },
  basePath: '/',
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Point to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec