let config = {
  development: {
    db: {
      name: 'coins_db',
      host: 'localhost',
      port: '3306',
      user: 'root',
      pass: 'DodgerJuno21',
    },
    api: {
      url: 'http://localhost:5000/graphql',
    },
  },
  // production: {
  //   url: 'http://www.mycoin.store',
  //   db: {
  //     host:   'localhost',
  //     port:   '3306',
  //     user:     'root',
  //     pass:     'Dalekini21'
  //   },
  //   api: {
  //     url: 'http://api.mycoin.store/graphql',
  //   }
  // }
};

module.exports = config;