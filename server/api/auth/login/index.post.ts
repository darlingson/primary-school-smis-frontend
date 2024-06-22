//the route will receive email and password via request body
//the route will check if user exists in database
//if user exists, it hash recieved passsword and compare it with hashed password in database
//if passwords match, it will generate jwt token
//the route will return jwt token
import User from "~/model/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { defineEventHandler } from 'h3';
import { useRuntimeConfig } from '#imports';
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const user = await User.findOne({ email: body.email });
    if (!user) {
        return {
            success: false,
            message: 'User not found'
        }
    }
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
        return {
            success: false,
            message: 'Incorrect password'
        }
    }
    const token = jwt.sign({ _id: user._id }, useRuntimeConfig().jwtSecret, { expiresIn: '7d' });
    return {
        success: true,
        message: 'Login successful',
        token,
        email: user.email,
        role: user.role,
        school: user.school
    }
    
});
