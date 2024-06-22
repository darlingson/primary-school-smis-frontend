import User from '~/model/User';
import bcrypt from 'bcrypt';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return {
                success: false,
                message: 'User already exists'
            };
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = new User({
            email: body.email,
            password: hashedPassword,
            name: body.name,
            role:body.role
        });
        await user.save();

        return {
            success: true,
            message: 'Signup successful'
        };
    } catch (error) {
        let errorMessage = 'An error occurred during signup';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            success: false,
            message: errorMessage || 'An error occurred during signup'
        };
    }
});
