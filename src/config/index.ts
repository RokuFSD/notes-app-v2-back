import dotenv from 'dotenv';

const envFound = dotenv.config();

if (!envFound) {
  throw new Error('Couldn\'t find .env file');
}

export default {
  port: process.env.PORT || 8173,
  postgresUSER: process.env.POSTGRES_USER,
  postgresPASSWORD: process.env.POSTGRES_PASSWORD,
  postgresDB: process.env.POSTGRES_DB,
  postgresHOST: process.env.POSTGRES_HOST,
  postgresPORT: 5432,
  projectID: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY,
};
