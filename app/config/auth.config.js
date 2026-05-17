export default {
  secret: process.env.AUTH_SECRET || "secret-key",
  jwtExpiration: Number(process.env.JWT_EXPIRATION) || 86400
};
