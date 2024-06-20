// middleware/auth.js
import { useRuntimeConfig } from '#imports';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const token = event.req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Authentication token missing' }));
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        event.context.auth = { userId: decoded._id };
    } catch (error) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Invalid token' }));
    }
});
