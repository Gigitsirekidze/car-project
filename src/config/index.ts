import db from './db';

export default () => {
  return {
    db: db(),
    secretKey: process.env.SECRET_KEY,
  };
};
