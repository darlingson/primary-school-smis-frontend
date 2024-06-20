import { useRuntimeConfig } from '#imports';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { defineEventHandler, sendError, createError } from 'h3'; // Assuming these are imports from your framework

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const token = event.req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Authentication token missing' }));
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
        
        if (!decoded || typeof decoded !== 'object' || !decoded._id) {
            return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid token' }));
        }

        event.context.auth = { userId: decoded._id };
    } catch (error) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid token' }));
    }
});