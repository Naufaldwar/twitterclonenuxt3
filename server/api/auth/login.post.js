import { getUserByUsername } from "~~/server/db/users.js"
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "~~/server/utils/jwt"
import { createRefreshToken } from "~~/server/db/refreshTokens"
import { userTransformer } from "~~/server/transformers/user.js"
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username, password } = body

    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid Params'
        }))
    }

    //Is the user register
    const user = await getUserByUsername(username)

    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }


    // Compare Password
    const doesThePasswordMatch = await bcrypt.compare(password, user.password)

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    // Generate Tokens
    // Access token
    // Refresh token
    const { accessToken, refreshToken } = generateTokens(user)

    //save it inside db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    //add http only cookie
    sendRefreshToken(event, refreshToken)

    return {

        access_token: accessToken,
        user: userTransformer(user)
    }
})