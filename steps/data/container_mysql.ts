import { ICustomWorld } from '../../conf/support/custom-world';
import { Given, Then, When } from '@cucumber/cucumber';
import { MySqlContainer, StartedMySqlContainer } from 'testcontainers';
import { Connection, createConnection } from 'mysql2/promise';
import { expect } from '@playwright/test';

let container: StartedMySqlContainer;
let client: Connection;

Given(
  'I use a MySQL container with database name as helloworld',
  async function (this: ICustomWorld) {
    container = await new MySqlContainer().withDatabase('helloworld').start();
    console.log(container.logs());
  },
);

When('I connect the MySQL instance', async function (this: ICustomWorld) {
  client = await createConnection({
    host: container.getHost(),
    port: container.getPort(),
    database: container.getDatabase(),
    user: container.getUsername(),
    password: container.getUserPassword(),
  });
});

Then(
  'I should get the name of the MySQL database as helloworld',
  async function (this: ICustomWorld) {
    const page = this.page!;
    const [rows] = await client.execute('SELECT DATABASE() as res');
    expect(rows).toEqual([{ res: 'helloworld' }]);
    await client.end();
    await container.stop();
  },
);
