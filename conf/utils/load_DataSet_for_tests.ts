import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';

export let myUsers: string;
export let myEnvs: string;

export function getValueForUser(
  records: JSON[],
  theRefKey: string,
  theRefKeyValue: string,
  theRealKey: string,
) {
  records.forEach((obj: JSON) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (key == theRefKey && value == theRefKeyValue) {
        console.log(`${key} => ${value}`);
        Object.entries(obj).forEach(([subKey, subValue]) => {
          if (subKey == theRealKey) {
            myUsers = subValue;
          }
        });
      }
    });
  });
  return myUsers;
}

export function getValueForEnv(
  records: JSON[],
  theRefKey: string,
  theRefKeyValue: string,
  theRealKey: string,
) {
  records.forEach((obj: JSON) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (key == theRefKey && value == theRefKeyValue) {
        console.log(`${key} => ${value}`);
        Object.entries(obj).forEach(([subKey, subValue]) => {
          if (subKey == theRealKey) {
            myEnvs = subValue;
          }
        });
      }
    });
  });
  return myEnvs;
}

export function loadUser(file: string) {
  const csvFilePath = path.resolve(__dirname, file);
  const headers = ['userProfil', 'login', 'password'];
  if (fs.existsSync(csvFilePath)) {
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    const records = parse(fileContent, {
      delimiter: ';',
      columns: headers,
      skip_empty_lines: true,
    });
    return records;
  } else {
    console.error('File ' + file + ' does not exit');
    return undefined;
  }
}

export function loadEnv(file: string) {
  const csvFilePath = path.resolve(__dirname, file);
  const headers = ['ui-name', 'ui-url'];
  if (fs.existsSync(csvFilePath)) {
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    const records = parse(fileContent, {
      delimiter: ';',
      columns: headers,
      skip_empty_lines: true,
    });
    return records;
  } else {
    console.error('File ' + file + ' does not exit');
    return undefined;
  }
}

export const get_datas_for_test = function name(userProfil: string, ui: string): Array<any> {
  const users = loadUser('../../test_resources/test_datas/user-profil.csv');
  const envs = loadEnv('../../test_resources/test_datas/env-profil.csv');
  const login = getValueForUser(users, 'userProfil', userProfil, 'login');
  console.log(login);
  const keyPWD = 'PWD_' + userProfil.toUpperCase();
  const password = process.env[keyPWD] || 'undef';
  const url = getValueForEnv(envs, 'ui-name', ui, 'ui-url');
  return [url, login, password];
};
