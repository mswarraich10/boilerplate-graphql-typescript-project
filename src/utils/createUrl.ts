import { v4 } from 'uuid'
import { redis } from '../redis'

export async function createUrl(userId: number): Promise<string> {
  const token = v4()
  await redis.set(token, userId, 'EX', 60 * 60 * 24)
  return `http://localhost:4000/user/confirm/${token}`
}
