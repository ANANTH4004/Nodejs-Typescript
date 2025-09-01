import jwt from 'jsonwebtoken'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'accessTokenSecret'
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || 'refreshAccessToken'

export const getAccessToken = (userId: string) => {
  return jwt.sign({ userId }, accessTokenSecret, { expiresIn: '15m' })
}

export const getRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' })
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessTokenSecret)
}

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshTokenSecret)
}
