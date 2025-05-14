import Sequelize from 'sequelize';

const sequelize = new Sequelize('PolyHub', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5001'
});

export default sequelize;   