// SEQUELIZE
const Sequelize = require('sequelize');
let env = process.env.NODE_ENV || 'development';
let config = require('../../config')[env];

let { db: { name, user, pass, host, port }} = config;

const connection = new Sequelize(
  name, user, pass, {host, port }
);

const Coin = connection.define("coin", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  year: Sequelize.STRING,
  issueId: Sequelize.STRING,
  mint: Sequelize.STRING,
  mintage: Sequelize.STRING,
  description: Sequelize.STRING,
}, {
  timestamps: false
});

const Issue = connection.define('issue', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  denomination_id: Sequelize.STRING,
  variety_name: Sequelize.STRING,
  from_year: Sequelize.STRING,
  to_year: Sequelize.STRING,
  composition: Sequelize.STRING,
  mass: Sequelize.STRING,
  diameter: Sequelize.STRING,
}, {
  timestamps: false
});

const Denomination = connection.define("denomination", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  kind: Sequelize.STRING,
  val: Sequelize.FLOAT,
}, {
  timestamps: false
});

export {
  Coin,
  Issue,
  Denomination,
}