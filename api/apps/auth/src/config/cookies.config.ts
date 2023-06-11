import { CookieOptions } from 'express';

export const cookiesConfig: CookieOptions = {
  maxAge: 1000 * 60 * 60, // 1h
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'strict',
};
