import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return  res.status(401).json({
            statusCode: 401,
            error: null,         
            message: "Користувач не авторизований!",   
            successful: false
        });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Недійсний токен' });
    }
};

export const checkRole = (requiredRole) => (req, res, next) => {
    if (!req.user || !req.user.role_name) {
        return res.status(403).json({
            statusCode: 403,
            message: 'Роль користувача не визначена!',
            successful: false
        });
    }
    console.log("Роль: " + req.user.role_name)
    if (req.user.role_name !== requiredRole) {
        return res.status(403).json({
            statusCode: 403,
            message: `Доступ заборонений: потрібна роль ${requiredRole}!`,
            successful: false
        });
    }

    next();
};