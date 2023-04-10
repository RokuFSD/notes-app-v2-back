import { Application } from 'express';
import health from './health';

export default (app: Application) => {
  console.log('Registering routes...');
  app.use('/health', health);
};
