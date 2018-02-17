// SEQUELIZE
const Sequelize = require('sequelize');
let env = process.env.NODE_ENV || 'development';
let config = require('../../config')[env];

let { db: { name, user, pass, host, port }} = config;

const connection = new Sequelize(
  name, user, pass, {host, port }
);

const User = connection.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  password: Sequelize.STRING,
});

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

const UserCoin = connection.define("usercoins", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  coinId: Sequelize.STRING,
  userId: Sequelize.STRING,
  issueId: Sequelize.STRING,
  quality: Sequelize.STRING,
}, {
  timestamps: false
});

const Wishes = connection.define("wishes", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userId: Sequelize.STRING,
  coinId: Sequelize.STRING,
}, {
  timestamps: false
});

const CoinImage = connection.define("coinimages", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  userId: Sequelize.STRING,
  coinId: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
}, {
  timestamps: false
});

export {
  Coin,
  Issue,
  Denomination,
  UserCoin,
  User,
  Wishes,
  CoinImage,
}