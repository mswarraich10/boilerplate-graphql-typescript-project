import { DataSource } from 'typeorm';
import ormconfig from '../../ormconfig';

class DbManager {
  public datasource: DataSource;

  constructor() {
    this.datasource = new DataSource({
      ...ormconfig,
      type: 'postgres',
      logger: 'simple-console',
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async init() {
    await this.datasource
      .initialize()
      .then(() => console.log('Database connected'))
      .catch((error) =>
        console.log('Something went wrong while connecting database', error)
      );
  }
}

export default new DbManager();
