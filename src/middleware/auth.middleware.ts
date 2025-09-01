import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET ?? ''

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers['authorization']
  const token = authToken && authToken.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'forbidden' })

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) return res.status(403).json({ message: 'unauthorized' })
    ;(req as any).user = user
    console.log('refresh token user', user)
    next()
  })
}
