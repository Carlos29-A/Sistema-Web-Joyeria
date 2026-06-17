import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3001),

  // Validacion de database
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  // Validacion de jwt
  JWT_SECRET: Joi.string().required().min(32),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_SECRET: Joi.string().required().min(32),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

  // Validación de cloudinary
  CLOUDINARY_CLOUD_NAME: Joi.string().optional(),
  CLOUDINARY_API_KEY: Joi.string().optional(),
  CLOUDINARY_API_SECRET: Joi.string().optional(),

  // Validacipon de redis
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),

  // Validacion de stripe
  STRIPE_API_KEY: Joi.string().optional().allow(''),
  STRIPE_WEBHOOK_SECRET: Joi.string().optional().allow(''),

  // Validacion de resend
  RESEND_API_KEY: Joi.string().optional().allow(''),
});
