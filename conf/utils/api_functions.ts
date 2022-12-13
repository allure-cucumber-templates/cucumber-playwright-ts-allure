import { request, APIResponse } from '@playwright/test';
import console from 'console';

let response: APIResponse;

export async function sendRequest(
  method: string,
  url: string,
  header?: { [key: string]: string },
  bodyRequest?: object,
) {
  const context = await request.newContext();
  console.log(
    '\n******INPUTS OF API REQUEST******',
    '\n* URL : ',
    url,
    '\n* method: ',
    method,
    '\n* body Request: ',
    bodyRequest,
    '\n* header:\n********************************',
    header,
    '\n',
  );
  console.log('///////////////////////////////////////////////////////////////////////');

  switch (method) {
    case 'get':
      response = await context.get(url, { headers: header });
      break;
    case 'post':
      response = await context.post(url, { headers: header, data: bodyRequest });
      break;
    case 'put':
      response = await context.put(url, { headers: header, data: bodyRequest });
      break;
    case 'delete':
      response = await context.delete(url, { headers: header });
      break;
    default:
      console.log('No requests');
      break;
  }
  if (response.url()) {
    response.body().then((loadResp: any) => {
      const bodyResponse = loadResp.toString();
      console.log(
        '\n******OUTPUTS OF API REQUEST******',
        '\n * Response code ==> ',
        response.status(),
        '\n * Body Response ==>',
        bodyResponse,
        '\n**********************************\n',
      );
    });
  }
  return response;
}
