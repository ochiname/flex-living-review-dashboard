import dotenv from 'dotenv';
import e from 'express';
import { error } from 'node:console';

dotenv.config();

interface DBConfig {
  account_id: string;
  port: string;
  hostaway_api_key: string;
  environmentStage: 'development' | 'production' | 'staging' | undefined;
}


function getEnvironmentStage(env: string | undefined): 'development' | 'production' | 'staging' | undefined {
  if (env === 'development' || env === 'production' || env === 'staging') {
    return env;
  }
  error('Invalid environment stage');
  return undefined;
}
// Optional: Validate that required variables are defined
const requiredEnvVars = [
  'PORT',
  'HOSTAWAY_API_KEY',
  'ACCOUNT_ID',
];

requiredEnvVars.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is not set`);
  }
});

const dbConfig: DBConfig = {
  port: process.env.PORT!,
  environmentStage: getEnvironmentStage(process.env.NODE_ENV),
  account_id: process.env.ACCOUNT_ID!,
  hostaway_api_key: process.env.HOSTAWAY_API_KEY!,
};

export default dbConfig;
