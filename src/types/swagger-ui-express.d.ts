declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';

  export const serve: RequestHandler;
  export function setup(swaggerDoc: any, options?: any, customCss?: string): RequestHandler;

  const swaggerUi: {
    serve: RequestHandler;
    setup: typeof setup;
  };

  export default swaggerUi;
}
