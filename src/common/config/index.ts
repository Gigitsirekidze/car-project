import db from './db';

export default () => {
  return {
    db: db(),
  };
};
