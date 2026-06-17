export const configuration = () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),

  // Configuracion de database
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'joyeria',
    password: process.env.DB_PASSWORD || 'joyeria_secreto',
    database: process.env.DB_DATABASE || 'joyeria_dev',
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // ← AÑADI
  },
  // Configuracion de jwt
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secreto',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  // Configuracipon de cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apikey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  // Configuracion de redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
  // Configuracion de Stripe
  stripe: {
    apiKey: process.env.STRIPE_API_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  },
});
