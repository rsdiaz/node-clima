// clientrequest.ts
import fetch from 'node-fetch';

export class ClientRequest {
  makeRequest (url: string) {
    if (typeof url !== 'string') throw new Error();

    return fetch(url)
      .then(res => res.json())
      .catch((error) => {
        return error;
      });
  }
}
