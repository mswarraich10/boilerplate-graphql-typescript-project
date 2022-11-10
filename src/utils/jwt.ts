import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 *
 * @param token
 * @returns true or flase
 */
export function verifyJWT(token: string): any {
  return jwt.verify(token, process.env.JWT_KEY ?? '');
}

/**
 *
 * @param data : to store in tokken
 * @returns jwt tokken
 */
export function createJWt(data: any): string {
  console.log(process.env.JWT_KEY, data);
  return jwt.sign({}, process.env.JWT_KEY ?? '');
}
