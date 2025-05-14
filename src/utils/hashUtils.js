import bcrypt from 'bcrypt';

class hashModule {
    async hashPassword(password) {
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);
        return password_hash;
    }
    
    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}

export default hashModule;
