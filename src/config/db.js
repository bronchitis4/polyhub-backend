import Sequelize from 'sequelize';

// const sequelize = new Sequelize('PolyHub', 'postgres', '1234', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: '5001'
// });


const sequelize = new Sequelize('polyhub', 'polyhub_user', 'c3qMwuNHcR471FpysFQJGJpmKkwUQvhY', {
  host: 'dpg-d0i45556ubrc73d5ce30-a.frankfurt-postgres.render.com',
  dialect: 'postgres',
  port: 5432,
  logging: false, // або true, якщо хочеш логи
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false // якщо Render вимагає SSL
    }
  }
});

export default sequelize;   
