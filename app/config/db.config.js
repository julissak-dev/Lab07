import { URL } from 'url';

const parseDatabaseUrl = (urlString) => {
  try {
    const url = new URL(urlString);

    return {
      HOST: url.hostname,
      PORT: url.port,
      USER: url.username,
      PASSWORD: decodeURIComponent(url.password),
      DB: url.pathname ? url.pathname.replace(/^\//, '') : '',
      dialect: url.protocol
        ? url.protocol.replace(':', '')
        : 'mysql'
    };

  } catch (err) {
    console.error("DATABASE_URL inválida:", err);
    return null;
  }
};

const fromEnv = process.env.DATABASE_URL
  ? parseDatabaseUrl(process.env.DATABASE_URL)
  : null;

export default {
  HOST: (fromEnv && fromEnv.HOST) || process.env.DB_HOST || "localhost",

  PORT: (fromEnv && fromEnv.PORT) || process.env.DB_PORT || "3306",

  USER: (fromEnv && fromEnv.USER) || process.env.DB_USER || "root",

  PASSWORD:
    (fromEnv && fromEnv.PASSWORD) ||
    process.env.DB_PASSWORD ||
    "",

  DB: (fromEnv && fromEnv.DB) || process.env.DB_NAME || "jwt_db",

  dialect:
    process.env.DB_DIALECT ||
    (fromEnv && fromEnv.dialect) ||
    "mysql",

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};