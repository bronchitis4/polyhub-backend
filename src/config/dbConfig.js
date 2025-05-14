import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    password: "1234",
    host: 'localhost',
    port: '5001',
    database: 'PolyHub'
})

export default pool;