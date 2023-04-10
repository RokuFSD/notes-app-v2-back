export default {
  port: process.env.PORT || 8173,
  postgresUSER: process.env.POSTGRES_USER,
  postgresPASSWORD: process.env.POSTGRES_PASSWORD,
  postgresDB: process.env.POSTGRES_DB,
  postgresHOST: process.env.POSTGRES_HOST,
  postgresPORT: Number(process.env.POSTGRES_PORT),
};
