import { sendRequest } from '../../../conf/utils/api_functions';
import { APIResponse, expect } from '@playwright/test';
import { Dictionary } from 'lodash';
import { type } from 'os';

const BASE_URL = 'https://petstore.swagger.io/v2';

type bodyFormat = {
  id: number;
  category: { id: 10; name: 'shb' };
  name: string;
  photoUrls: ['STG'];
  tags: [{ id: 0; name: 'ingm' }];
  status: 'sold';
};

var response_body: bodyFormat;
var response_temp: APIResponse;
var response_status_code: number;

export async function getPet(petID: string) {
  let url = BASE_URL + '/pet/' + petID;
  let method = 'get';
  let header = {
    Accept: 'application/json',
  };
  response_temp = await sendRequest(method, url, header);
  console.log(response_temp);
  response_status_code = response_temp.status();
  await response_temp.body().then((loadResp) => {
    response_body = JSON.parse(loadResp.toString()) as bodyFormat;
  });
  console.log(response_body);
}

export async function deletePet(petID: string) {
  let url = BASE_URL + '/pet/' + petID;
  let method = 'delete';
  let header = {
    Accept: 'application/json',
  };
  response_temp = await sendRequest(method, url, header);
  console.log(response_temp);
  response_status_code = response_temp.status();
  await response_temp.body().then((loadResp) => {
    response_body = JSON.parse(loadResp.toString());
  });
  console.log(response_body);
}

export async function addPet(petID: string) {
  let url = BASE_URL + '/pet';
  let method = 'post';
  let header = {
    Accept: 'application/json',
  };
  let body = {
    id: parseInt(petID),
    category: { id: 10, name: 'inu' },
    name: 'dog',
    photoUrls: ['string'],
    tags: [{ id: 0, name: 'krn' }],
    status: 'available',
  };
  response_temp = await sendRequest(method, url, header, body);
  console.log(response_temp);
  response_status_code = response_temp.status();
  await response_temp.body().then((loadResp) => {
    response_body = JSON.parse(loadResp.toString());
  });
  console.log(response_body);
}

export async function updatePet(petID: string, petName: string) {
  let url = BASE_URL + '/pet';
  let method = 'put';
  let header = {
    Accept: 'application/json',
  };
  let body = {
    id: parseInt(petID),
    category: { id: 10, name: 'shb' },
    name: petName,
    photoUrls: ['STG'],
    tags: [{ id: 0, name: 'ingm' }],
    status: 'sold',
  };
  response_temp = await sendRequest(method, url, header, body);
  console.log(response_temp);
  response_status_code = response_temp.status();
  await response_temp.body().then((loadResp) => {
    response_body = JSON.parse(loadResp.toString());
    console.log(response_body);
  });
}

export async function checkResponsePetId(petID: string) {
  expect(response_body.id).toEqual(parseInt(petID));
}

export async function checkResponsePetName(petName: string) {
  expect(response_body.name).toEqual(petName);
}

export async function checkResponseStatus(statusCode: number) {
  expect(response_status_code).toBe(statusCode);
}
