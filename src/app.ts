import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./router/mother_router";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app = express();

// Middleware
app.use(cors({
  origin: 'https://flex-reviewdashboard.netlify.app'
}));
app.use(express.json());
app.use(helmet({contentSecurityPolicy: {
      useDefaults: true, // ensures proper fallbacks (no warning)
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "https:", "https://cdn.jsdelivr.net", "https://unpkg.com", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'", // needed for Swagger inline scripts
          "'unsafe-eval'",   // some Swagger bundles require this
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
          "https://unpkg.com",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'", // Swagger UI injects inline CSS
          "https://fonts.googleapis.com",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
          "https://unpkg.com",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "same-origin" },
    referrerPolicy: { policy: "no-referrer" },
    hsts: { maxAge: 31536000, includeSubDomains: true },
    frameguard: { action: "sameorigin" },
    dnsPrefetchControl: { allow: false },
    xssFilter: false,
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello, the Flex.");
});



// Main API router
app.use("/api", router);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Route not found",
  });
});

// Global Error Handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

export default app;
