import jwt from 'jsonwebtoken';
import { config } from '../../config/env.js';

if (!config.jwtSecret || config.jwtSecret.length < 16) {
  if (config.nodeEnv === 'production') {
    throw new Error('FATAL: JWT_SECRET environment variable is missing or shorter than 16 characters in production.');
  }
}

export const accessTokenSecret = config.jwtSecret || 'dev_secret_only_never_use_in_production_32chars';
export const accessTokenExpiry = '7d';

export const generateAccessToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role || 'admin',
    },
    accessTokenSecret,
    { expiresIn: accessTokenExpiry }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, accessTokenSecret);
};
