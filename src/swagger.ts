// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

type SwaggerOptions = {
  definition: {
    openapi: string;
    info: {
      title: string;
      version: string;
      description?: string;
    };
    servers?: {
      url: string;
      description?: string;
    }[];
  };
  apis: string[];
};

const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flex Living Reviews API',
      version: '1.0.0',
      description: 'API documentation for the Flex Living Reviews Dashboard project',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Local server' },
      // You can add production server here if needed
    ],
  },
  // Path to the files containing Swagger comments
  apis: ['./src/modules/reviews/*.ts', "./src/modules/googleAPI/*.ts" ], 
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
