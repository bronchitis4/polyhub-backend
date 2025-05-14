import jwt from 'jsonwebtoken';
import { addDays } from 'date-fns'; 

export class GenerateTokenModule {
    generateAccessToken = (user) => {
        console.log("USER: " + user.role);
        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                role_name: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRATION_ACCES_TOKEN
            }
        );
    };
    
    generateRefreshToken = (user) => {
        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                role_name: user.role
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION_FRESH_TOKEN }
        );
    };
 
    generateTokens = (user) => {
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);

        const expiresIn = addDays(new Date(), 30);
        return {accessToken, refreshToken, expiresIn};
    }
} 

