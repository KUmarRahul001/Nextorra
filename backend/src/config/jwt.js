import jwt from 'jsonwebtoken';
import { config } from '../../config/env.js';

export const accessTokenSecret = config.jwtSecret || 'rahnoxa_secure_jwt_secret_token_2026';
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
