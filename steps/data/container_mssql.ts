import { ICustomWorld } from '../../conf/support/custom-world';
import { Given, Then, When } from '@cucumber/cucumber';
import { StartedTestContainer, GenericContainer, Wait } from 'testcontainers';
import { expect } from '@playwright/test';
import { containerLogs } from 'testcontainers/dist/docker/functions/container/container-logs';
import { Connection } from 'tedious';

let container: StartedTestContainer;

Given('I use a MSSQL container', async function (this: ICustomWorld) {
  container = await new GenericContainer('mcr.microsoft.com/mssql/server:2022-latest')
    .withEnv('SA_PASSWORD', '1StrongPwd!!')
    .withEnv('ACCEPT_EULA', 'Y')
    .withWaitStrategy(Wait.forLogMessage('Recovery is complete.'))
    .withExposedPorts({
      container: 1433,
      host: 1433,
    })
    //.withNetworkMode('host')
    .start();

  console.log('Starting container with ID: ' + container.getId());
  console.log(container.logs().then((logs) => console.log(logs)));
});

When('I connect the MSSQL instance', async function (this: ICustomWorld) {
  const config = {
    server: '0.0.0.0',
    debug: true,
    authentication: {
      type: 'default',
      options: {
        userName: 'sa',
        password: '1StrongPwd!!',
      },
    },
    options: {
      encrypt: false,
      trustServerCertificate: true,
      port: 1433,
    },
  };
  console.log(config);
  const connection = new Connection(config);
  connection.connect((err) => {
    if (err) {
      console.log('Connection Failed');
      throw err;
    } else {
      console.log('Connected sucessfully to Microsoft SQL Server container');
      container.stop();
    }
  });
});
