import { Router } from 'express'
import {
  getAccessToken,
  getRefreshToken,
  verifyRefreshToken,
} from '../utility/jwtToken'

const router = Router()

let refreshTokens: string[] = []

//login and get the access token
router.post('/login', (req, res) => {
  const { username } = req.body
  if (!username)
    return res.status(400).json({ message: 'Username is required' })

  //add login check process

  const accessToken = getAccessToken(username)
  const refreshToken = getRefreshToken(username)

  refreshTokens.push(refreshToken)
  res.json({ accessToken, refreshToken })
})

// silent renewal process
router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken || !refreshTokens.includes(refreshToken))
    return res.status(403).json({ message: 'forbidden' })

  try {
    const decoded = verifyRefreshToken(refreshToken) as any
    console.log('Decoded', decoded)
    const accessToken = getAccessToken(decoded.userId)
    res.json({ accessToken })
  } catch {
    res.status(403).json({ message: 'Unauthorized' })
  }
})

export default router
